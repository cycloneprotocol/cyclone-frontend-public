import { makeAutoObservable } from 'mobx';
import { NetworkState, ETHNetworkState } from './lib/NetworkState';
import { EthereumConfigV2, IotexConfigV2 } from '../config/NetowkConfig';
import BigNumber from 'bignumber.js';
import { ChainState } from './lib/ChainState';
import { PoolState, PoolStateStatus } from './lib/PoolState';
import { rootStore } from '.';
import { TokenState } from './lib/TokenState';
import { metamaskUtils } from '../utils/metamaskUtils';
import Config from '../Config';
import axios from 'axios';
import { IotexNetworkState } from './lib/IotexNetworkState';
import { publicConfig } from '../config/public';
import { _ } from '../lib/lodash';
import { AeolusContractState } from './lib/ContractState';

export type Network = 'iotex' | 'eth';

export class GodStore {
  currentNetworkName: Network = 'eth';
  iotex: IotexNetworkState = IotexConfigV2;
  eth: ETHNetworkState = EthereumConfigV2;
  ABIs = new Map();
  constructor() {
    this.eth.god = this;
    makeAutoObservable(this);
  }

  get chains() {
    return [this.iotex, this.eth];
  }

  get isConnect() {
    return !!this.currentNetwork.account;
  }

  get isETH() {
    return this.currentNetworkName == 'eth';
  }
  get isIOTX() {
    return this.currentNetworkName == 'iotex';
  }
  get currentNetwork(): NetworkState {
    return this.getNetwork(this.currentNetworkName);
  }

  get currentChain(): ChainState {
    return this.currentNetwork.currentChain;
  }

  get Coin() {
    return this.currentChain.Coin;
  }

  get CYCToken() {
    return this.currentChain.CYCToken;
  }

  get Aeolus() {
    return this.currentChain.Aeolus;
  }
  get AeolusV2() {
    return this.currentChain.AeolusV2;
  }

  get LPToken() {
    return this.currentChain.LPToken;
  }

  get UniswapV2CycloneRouter() {
    return this.currentChain.UniswapV2CycloneRouter;
  }

  get Multicall() {
    return this.currentChain.MultiCall;
  }

  getNetwork(network: string) {
    if (network == 'iotex') {
      return this.iotex;
    } else {
      return this.eth;
    }
  }

  findPool({ poolId }: { poolId: string }) {
    let pool: PoolState;
    this.chains.forEach((network) => {
      Object.values(network.chains).forEach((chain) => {
        if (chain.pools[poolId]) {
          pool = chain.pools[poolId];
        }
      });
    });
    return pool;
  }

  getPool({
    network = this.currentNetworkName,
    chainId = this.currentChain.chainId,
    poolId
  }: {
    network?: string;
    chainId?: number | string;
    poolId: number | string;
  }) {
    return this.getNetwork(network).chains[chainId].pools[poolId];
  }

  getChain({ network = this.currentNetworkName, chainId = this.currentChain.chainId }: { network?: string; chainId?: number | string }) {
    return this.getNetwork(network).chains[chainId];
  }

  async loadPublichData() {
    console.log('load public data');
    const { Aeolus, AeolusV2 } = this.currentChain;

    const aeolusList = [Aeolus, AeolusV2 || Aeolus];
    const { poolList } = this.currentChain;

    this.currentNetwork.multicallV2([
      ..._.flattenDeep(aeolusList.map((aeolus) => [aeolus.preMulticall({ method: 'rewardPerBlock', handler: aeolus.rewardPerBlock })])),
      ..._.flattenDeep(
        poolList.map((pool) => [
          pool.preMulticall({ method: 'coinDenomination', handler: pool.coinDenomination }),
          pool.preMulticall({ method: 'tokenDenomination', handler: pool.tokenDenomination }),
          pool.preMulticall({
            method: 'cycDenomination',
            handler: (v: any) => {
              const cycDeno = new BigNumber(v.toString());
              pool.cycDenomination.setValue(cycDeno);
              pool.depositCYCAmount.setValue(cycDeno);
            }
          }),
          pool.preMulticall({
            method: pool.anonymityRateMethod,
            handler: (v: any) => {
              const fee = new BigNumber(v.toString());
              pool.anonymityPoolFee.setValue(fee);

              if (pool.version == 2.2 || pool.version == 2.3) {
                pool.depositCYCAmount.setFee(fee);
              } else {
                pool.depositCYCAmount.setFee(new BigNumber(0));
              }
            }
          }),
          pool.preMulticall({
            method: 'numOfShares',
            handler: (v: any) => {
              pool.numOfShare = v.toNumber();
            }
          })
        ])
      )
    ]);

    await Promise.all([this.currentNetwork.loadAnalyticsData()]);
  }

  async loadBalance() {
    this.currentNetwork.loadBalance();
  }

  async loadPrivateData() {
    console.log('load prviate data');

    const { CYCToken, Aeolus, AeolusV2, UniswapV2CycloneRouter } = this.currentChain;

    const aeolusList = [Aeolus, AeolusV2 || Aeolus];
    const xrcList = this.currentChain.poolList.filter((i) => i.XRCToken);
    const poolList = this.currentChain.poolList.filter((i) => i.address !== '0x7C994FB3a8C208C1750Df937d473040c604292D6');

    await this.currentNetwork.multicallV2([
      CYCToken.preMulticall({
        method: 'allowance',
        params: [this.currentNetwork.account, UniswapV2CycloneRouter.address],
        handler: CYCToken.allownaceForRouter
      }),
      CYCToken.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: CYCToken.balance }),
      ..._.flattenDeep(
        aeolusList.map((aeolus) => [
          aeolus.LpToken.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: aeolus.LpToken.balance }),
          aeolus.LpToken.preMulticall({
            method: 'allowance',
            params: [this.currentNetwork.account, aeolus.address],
            handler: aeolus.LpToken.allowanceForAeolus
          }),
          aeolus.preMulticall({ method: 'pendingReward', params: [this.currentNetwork.account], handler: aeolus.cycEarn }),
          aeolus.preMulticall({
            method: 'userInfo',
            params: [this.currentNetwork.account],
            handler: (v: any) => {
              if (v) {
                return aeolus.staked.setValue(new BigNumber(String(v[0])));
              }
            }
          })
        ])
      ),
      ..._.flattenDeep(
        xrcList.map((pool) => [
          pool.XRCToken.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: pool.XRCToken.balance }),
          pool.XRCToken.preMulticall({
            method: 'allowance',
            params: [this.currentNetwork.account, UniswapV2CycloneRouter.address],
            handler: pool.XRCToken.allownaceForRouter
          })
        ])
      ),
      ..._.flattenDeep(
        poolList.map((pool) => [UniswapV2CycloneRouter.preMulticall({ method: 'purchaseCost', params: [pool.address], handler: pool.BNBtoBuyCYC })])
      )
    ]);
  }

  async approve({ token, spender, value }: { token: TokenState; spender: string; value: string }) {
    token.metas.isApprovingAllowance = true;
    const { approveMax } = rootStore.setting;
    const approveValue = approveMax.value ? publicConfig.maxApprove : value;
    try {
      const res = await this.currentNetwork.execContract({
        address: token.address,
        abi: token.abi,
        method: 'approve',
        params: [spender, approveValue]
      });
      const receipt = await res.wait();
      if (receipt.status) {
        token.metas.isApprovingAllowance = false;
        token.allownaceForRouter.setValue(new BigNumber(value));
      }
    } catch (error) {
      token.metas.isApprovingAllowance = false;
    }
  }

  async CliamToken({ aeolus }: { aeolus: AeolusContractState }) {
    await this.currentNetwork.execContract({
      address: aeolus.address,
      abi: aeolus.abi,
      method: 'deposit',
      params: [0]
    });
  }
  async ApproveLP({ amount, aeolus }: { amount: string; aeolus: AeolusContractState }) {
    const { LpToken } = aeolus;
    LpToken.metas.isApprovingAllowance = true;
    try {
      const res = await this.currentNetwork.execContract({
        address: LpToken.address,
        abi: LpToken.abi,
        method: 'approve',
        params: [aeolus.address, amount]
      });
      const receipt = await res.wait();
      if (receipt.status) {
        LpToken.metas.isApprovingAllowance = false;
        LpToken.allowanceForAeolus.setValue(new BigNumber(amount));
      }
    } catch (error) {
      LpToken.metas.isApprovingAllowance = false;
    }
  }
  async StakeLP({ amount, aeolus }: { amount: string; aeolus: AeolusContractState }) {
    console.log(aeolus);
    const res = await this.currentNetwork.execContract({
      address: aeolus.address,
      abi: aeolus.abi,
      method: 'deposit',
      params: [amount]
    });
    const receipt = await res.wait();
    if (receipt.status) {
      rootStore.base.startRefetchForce();
    }
  }
  async UnStakeLP({ amount, aeolus }: { amount: string; aeolus: AeolusContractState }) {
    const res = await this.currentNetwork.execContract({
      address: aeolus.address,
      abi: aeolus.abi,
      method: 'withdraw',
      params: [amount]
    });
    const receipt = await res.wait();
    if (receipt.status) {
      rootStore.base.startRefetchForce();
    }
  }

  setShowConnecter(value) {
    this.currentNetwork.connector.showConnector = value;
  }

  async addCYCToMetamask() {
    metamaskUtils.registerToken(this.CYCToken.address, this.CYCToken.symbol, this.CYCToken.decimals, Config.baseURL + '/images/logo.svg');
  }

  async getRelayer() {
    const res = await axios.get(this.currentChain.relayer + '/status/');
    return res.data ? res.data.relayerAddress : null;
  }
}
