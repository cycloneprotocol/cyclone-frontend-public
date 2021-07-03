import { makeAutoObservable, toJS } from 'mobx';
import { ChainState } from './ChainState';
import { GodStore } from '../god';
import { providers as EthersProviders, ethers, Contract, Signer } from 'ethers';
import { JsonRpcProvider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { analyticsBscClient, createAnalyticsEthCilent } from '../../lib/analytics-bsc-gql';
import { _ } from '../../lib/lodash';
import { Contract as MuticallContract, Provider } from '@iotexproject/ethers-multicall';
import { PoolState } from './PoolState';
import { StorageState, MulticallParams } from '../type';

export interface NetworkState {
  god: GodStore;
  chainId: number;
  defaultChainId: number;
  allowChains: number[];
  chains: {
    [key: string]: ChainState;
  };
  currentChain: ChainState;
  metas: {
    [key: string]: any;
  };
  account: string;
  apyMap: Record<string, { apy: string; adderss: string }>;
  poolTvl: Record<string, { apy: string; adderss: string }>;

  connector: { latestProvider: StorageState<string>; showConnector: boolean };
  walletInfo: { visible: boolean };

  findLogs: (args: {
    contractAddress: string;
    first?: number;
  }) => Promise<{
    totalCount: number;
    deposits: Partial<{
      commitment: any;
      leafIndex: any;
      timestamp: any;
      tokenDenomination: any;
      coinDenomination: any;
      cycDenomination: any;
    }>[];
  }>;
  loadPoolLog: (pool: PoolState, params?: { force?: boolean; first?: number }) => Promise<PoolState['logs']>;
  loadBalance: Function;
  loadAnalyticsData: Function;
  multicall(calls: Partial<MulticallParams>[]): Promise<any[]>;
  multicallV2?(calls: Partial<MulticallParams>[]): Promise<any[]>;
  execContract(call: MulticallParams): Promise<Partial<TransactionResponse>>;
  isAddressaVailable(address: string): boolean;
  test: Function;
}

export class ETHNetworkState implements NetworkState {
  constructor(args: Partial<ETHNetworkState>) {
    Object.assign(this, args);
    this.chainId = args.defaultChainId;
    Object.values(this.chains).forEach((chain) => {
      // setup network
      chain.network = this;
      chain.Coin.network = this;
      chain.LPToken.network = this;
      chain.CYCToken.network = this;
      if (chain.LPTokenV2) {
        chain.LPTokenV2.network = this;
      }

      //setup aeolus
      chain.Aeolus.network = this;
      chain.Aeolus.LpToken = chain.LPToken;
      if (chain.AeolusV2) {
        chain.AeolusV2.network = this;
        chain.AeolusV2.LpToken = chain.LPTokenV2;
      }

      Object.values(chain.pools).forEach((pool) => {
        pool.network = this;
        pool.chain = chain;
      });
    });
    makeAutoObservable(this, {
      god: false
    });
  }
  ethers: Web3Provider;
  multiCall: Provider;
  signer: Signer;
  god: GodStore;
  chainId: number;
  defaultChainId: number;
  chianId: number;
  allowChains: number[];
  chains: {
    [key: string]: ChainState;
  };
  metas: {
    [key: string]: any;
  } = {};
  account: string;
  // ui
  connector = {
    latestProvider: new StorageState({ key: 'latestEthProvider' }),
    showConnector: false
  };
  walletInfo = {
    visible: false
  };
  apyMap = {};
  poolTvl = {};
  get defaultEthers() {
    const provider = new JsonRpcProvider(this.currentChain.rpcUrl);
    return provider;
  }
  get currentChain() {
    return this.chains[this.chainId];
  }

  get analyticsClient(): ReturnType<typeof createAnalyticsEthCilent> {
    if (!this.currentChain.analyicsClient) {
      this.currentChain.analyicsClient = createAnalyticsEthCilent({ APIURL: this.currentChain.APIURL });
    }
    return this.currentChain.analyicsClient;
  }

  async findLogs({ contractAddress, first = 0 }: { contractAddress: string; first: number }) {
    const res = await this.analyticsClient.query({
      deposits: [
        {
          //@ts-ignore
          sort: 'timestamp',
          //@ts-ignore
          orderDirection: 'desc',
          first,
          where: { contract: contractAddress }
        },
        {
          totalCount: 1,
          deposits: {
            commitment: 1,
            leafIndex: 1,
            timestamp: 1,
            tokenDenomination: 1,
            coinDenomination: 1,
            cycDenomination: 1
          }
        }
      ]
    });
    res.data.deposits.deposits.sort((a, b) => a.leafIndex - b.leafIndex);
    res.data.deposits.deposits.forEach((i) => {
      i.commitment = `0x${i.commitment}`;
    });
    return res.data.deposits;
  }

  async loadPoolLog(pool: PoolState, { force = false, first = 30 }: { force?: boolean; first?: number } = {}) {
    if (!force && pool.logs.deposits.length) {
      return pool.logs;
    }
    const res = await this.findLogs({ contractAddress: pool.address, first });
    if (res) {
      pool.logs.totalCount = res.totalCount;
      pool.logs.deposits = res.deposits.sort((a, b) => a.leafIndex - b.leafIndex);
    }
    return pool.logs;
  }

  async loadBalance() {
    if (!this.ethers || !this.account) return;
    const balance = await this.ethers.getBalance(this.account);
    this.currentChain.Coin.balance.setValue(new BigNumber(balance.toString()));
  }
  async loadAnalyticsData() {
    const res = await this.analyticsClient.query({
      apy: {
        address: 1,
        apy: 1
      },
      total: {
        lpLocked: 1,
        lpOldLocked: 1
      },
      tokensInPoolPerDay: [
        { count: 1 },
        {
          address: 1,
          values: {
            value: 1
          }
        }
      ]
    });
    if (res.data) {
      this.apyMap = _.keyBy(
        res.data.apy.map((i) => {
          //@ts-ignore
          i.apy = new BigNumber(i.apy).multipliedBy(100 * 365).toFixed(2);
          i.address = i.address.toLowerCase();
          return i;
        }),
        'address'
      );
      this.poolTvl = _.keyBy(
        res.data.tokensInPoolPerDay.map((i) => ({ address: i.address.toLowerCase(), value: i.values[0].value })),
        'address'
      );

      if (res.data.total.lpOldLocked) {
        this.currentChain.AeolusV2.lpLocked = res.data.total.lpLocked;
        this.currentChain.Aeolus.lpLocked = res.data.total.lpOldLocked;
      } else {
        this.currentChain.Aeolus.lpLocked = res.data.total.lpLocked;
      }
    }
    return;
  }

  readMultiContract({ address, abi, method, params = [] }: MulticallParams) {
    const contract = new MuticallContract(address, abi);
    return contract[method](...params);
  }
  execContract({ address, abi, method, params = [], options = {} }: MulticallParams): Promise<Partial<TransactionResponse>> {
    const contract = new Contract(address, abi, this.signer || this.ethers);
    return contract[method](...params, options);
  }
  async multicall(calls: MulticallParams[]): Promise<any[]> {
    //@ts-ignore
    return this.multiCall.all(calls.map((i) => this.readMultiContract(i)));
  }

  async multicallV2(calls: MulticallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.all(calls.map((i) => this.readMultiContract(i)));
    res.forEach((v, i) => {
      const callback = calls[i].handler;
      if (typeof callback == 'function') {
        //@ts-ignore
        callback(v);
      } else {
        if (callback.setValue) {
          callback.setValue(new BigNumber(v.toString()));
        }
      }
    });
    return res;
  }

  isAddressaVailable(address: string): boolean {
    return ethers.utils.isAddress(address);
  }

  async test() {}
}
