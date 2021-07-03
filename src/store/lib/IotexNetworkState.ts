import { makeAutoObservable } from 'mobx';
import { ChainState } from './ChainState';
import { GodStore } from '../god';
import { JsonRpcProvider, Resolver, TransactionResponse } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { createAnalyticsEthCilent } from '../../lib/analytics-bsc-gql';
import { _ } from '../../lib/lodash';
import { PoolState } from './PoolState';
import { StorageState, MulticallParams } from '../type';
import { NetworkState } from './NetworkState';
import Antenna from 'iotex-antenna';
import { WsSignerPlugin } from 'iotex-antenna/lib/plugin/ws';
import { JsBridgeSignerMobile } from '../../js-plugin';
import { IotexMulticall } from '../../lib/multicall';
import { validateAddress } from 'iotex-antenna/lib/account/utils';
import { Contract } from 'iotex-antenna/lib/contract/contract';
import { createAnalyticsIotexCilent } from '../../lib/analytics-gql';
import { backendApi } from '../../lib/backend';
import retry from 'promise-retry';
import Utility from '../../Utility';

export enum IotexConnector {
  IopayDesktop = 'iopay-desktop',
  IopayExtension = 'iopay-extension'
}

export class IotexNetworkState implements NetworkState {
  constructor(args: Partial<IotexNetworkState>) {
    Object.assign(this, args);
    this.chainId = args.defaultChainId;
    Object.values(this.chains).forEach((chain) => {
      chain.network = this;
      chain.Coin.network = this;
      chain.Aeolus.network = this;
      chain.LPToken.network = this;
      chain.CYCToken.network = this;
      Object.values(chain.pools).forEach((pool) => {
        pool.network = this;
        pool.chain = chain;
      });
    });
    makeAutoObservable(this, {
      god: false
    });
  }
  multiCall: IotexMulticall;
  antenna: Antenna;
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
  connector = {
    latestProvider: new StorageState({ key: 'latestIotexProvider' }),
    showConnector: false
  };
  walletInfo = {
    visible: false
  };
  apyMap = {};
  poolTvl = {};
  get defaultEthers() {
    return new JsonRpcProvider(this.currentChain.rpcUrl);
  }
  get currentChain() {
    return this.chains[this.chainId];
  }

  get analyticsClient(): ReturnType<typeof createAnalyticsIotexCilent> {
    if (!this.currentChain.analyicsClient) {
      this.currentChain.analyicsClient = createAnalyticsIotexCilent({ APIURL: this.currentChain.APIURL });
    }
    return this.currentChain.analyicsClient;
  }

  async findLogs({ contractAddress, first = 0 }: { contractAddress: string; first: number }) {
    // const res = await this.analyticsClient.query({
    //   deposits: [
    //     {
    //       //@ts-ignore
    //       // sort: 'timestamp',
    //       //@ts-ignore
    //       orderDirection: 'desc',
    //       first,
    //       where: { contract: contractAddress },
    //     },
    //     {
    //       totalCount: 1,
    //       deposits: {
    //         commitment: 1,
    //         leafIndex: 1,
    //         timestamp: 1,
    //         denomination: 1,
    //       },
    //     },
    //   ],
    // });
    // res.data.deposits.deposits.sort((a, b) => a.leafIndex - b.leafIndex);
    // res.data.deposits.deposits.forEach((i) => {
    //   i.commitment = `0x${i.commitment}`;
    // });
    // console.log(res.data.deposits.deposits);
    // return res.data.deposits;

    const res = await backendApi.request({
      url: `/iotex/getDepositLogs`,
      params: { contractAddress, fromBlock: 9100001 }
    });
    const deposits = res.data.sort((a, b) => a.leafIndex - b.leafIndex);
    return {
      totalCount: res.data.length,
      deposits
    };
  }

  async loadPoolLog(pool: PoolState, { force = false, first = 30 }: { force?: boolean; first?: number } = {}) {
    if (!force && pool.logs.deposits.length) {
      return pool.logs;
    }
    const res = await this.findLogs({ contractAddress: pool.address, first });
    if (res) {
      pool.logs.totalCount = res.totalCount;
      pool.logs.deposits = res.deposits;
    }
    return pool.logs;
  }

  async loadBalance() {
    const { accountMeta } = await this.antenna.iotx.getAccount({ address: this.account });
    this.currentChain.Coin.balance.setValue(new BigNumber(accountMeta.balance.toString()));
  }
  async loadAnalyticsData() {
    return;
    // const res = await this.analyticsClient.query({
    //   apy: {
    //     address: 1,
    //     apy: 1,
    //   },
    //   total: {
    //     pool: 1,
    //   },
    //   tokensInPoolPerDay: [
    //     { count: 1 },
    //     {
    //       address: 1,
    //       values: {
    //         value: 1,
    //       },
    //     },
    //   ],
    // });
    // if (res.data) {
    //   this.apyMap = _.keyBy(
    //     res.data.apy.map((i) => {
    //       //@ts-ignore
    //       i.apy = new BigNumber(i.apy).multipliedBy(100 * 365).toFixed(2);
    //       return i;
    //     }),
    //     'address'
    //   );
    //   this.poolTvl = _.keyBy(
    //     res.data.tokensInPoolPerDay.map((i) => ({ address: i.address, value: i.values[0].value })),
    //     'address'
    //   );
    //   console.log({ poolTvl: this.poolTvl });
    //   this.tvl = res.data.total.pool;
    // }
    // return;
  }

  activeConnector(connector: IotexConnector) {
    if (this.antenna) {
      delete this.antenna;
    }
    this.initAntenna();
  }

  async initAntenna() {
    if (!this.getAntenna().iotx.accounts?.length) {
      return setTimeout(() => {
        this.initAntenna();
      }, 500);
    }
    this.account = this.getAntenna().iotx.accounts[0].address;
  }

  getAntenna() {
    if (this.antenna) {
      return this.antenna;
    }
    let signer;
    if (this.connector.latestProvider.value == IotexConnector.IopayExtension) {
      //@ts-ignore
      signer = window.antennaSigner;
    } else if (this.connector.latestProvider.value == IotexConnector.IopayDesktop) {
      signer = new WsSignerPlugin();
    } else if (Utility.isMobile) {
      signer = new JsBridgeSignerMobile();
    }

    const antenna = signer ? new Antenna(this.currentChain.rpcUrl, { signer }) : new Antenna(this.currentChain.rpcUrl);
    this.antenna = antenna;
    return antenna;
  }

  async execContract({
    address,
    abi,
    method,
    params = [],
    options = {}
  }: {
    address: string;
    abi: any;
    method: string;
    params?: any[];
    options?: any;
  }): Promise<Partial<TransactionResponse>> {
    const contract = new Contract(abi, address, { provider: this.antenna.iotx, signer: this.antenna.iotx.signer });
    const hash = await contract.methods[method](...params, Object.assign({ gasLimit: '2000000', gasPrice: '1000000000000' }, options));
    const wait = () =>
      new Promise((resolve, reject) => {
        retry(
          //@ts-ignore
          (retry) => {
            return this.antenna.iotx.getReceiptByAction({ actionHash: hash }).catch(retry);
          },
          { minTimeout: 5000, maxTimeout: 5000 }
        ).then(
          (res: any) => {
            res.status = res.receiptInfo.receipt.status;
            resolve(res);
          },
          () => {
            reject();
          }
        );
      });
    //@ts-ignore
    return { hash, wait };
  }
  async multicall(calls: { address: string; abi: any; method: string; params?: any[] }[]): Promise<any[]> {
    return this.multiCall.batch(calls);
  }

  async multicallV2(calls: MulticallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.batch(
      calls.map((i) => {
        const { abi, address, method, params } = i;
        return { abi, address, method, params };
      })
    );
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
    return validateAddress(address);
  }

  async test() {}
}
