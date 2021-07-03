import { makeAutoObservable } from 'mobx';
import { TokenState, LPTokenState } from './TokenState';
import { PoolState } from './PoolState';
import { ContractState, AeolusContractState } from './ContractState';
import { NetworkState } from './NetworkState';
import { BigNumberState } from '../type';
import { rootStore } from '../index';
import { _ } from '../../lib/lodash';

export class ChainState {
  name: string;
  network: NetworkState;
  chainId: number;
  rpcUrl: string;
  explorerURL: string;
  explorerName: string;
  swapName: string;
  swapURL: string;
  APIURL: string;
  relayer: string;
  pools: {
    [key: string]: PoolState;
  };
  metas: {
    rewardPerBlock?: number;
    [key: string]: any;
  } = {};
  Aeolus: AeolusContractState;
  AeolusV2: AeolusContractState;
  UniswapV2CycloneRouter: ContractState;
  MultiCall: ContractState;
  LPToken: LPTokenState;
  LPTokenV2: LPTokenState;
  CYCToken: TokenState;
  Coin: TokenState;
  analyicsClient: any;
  sort = {
    apy: 'desc',
    tvl: null
  };

  constructor(args: Partial<ChainState>) {
    Object.assign(this, args);
    makeAutoObservable(this, { network: false });
  }

  get poolList() {
    let pools = Object.values(this.pools).filter((i) => {
      return i.version > 1;
    });

    _.each(this.sort, (v, k) => {
      if (!v) return;
      if (k === 'apy') {
        pools = pools.sort((a, b) => (v == 'desc' ? Number(b.apy) - Number(a.apy) : Number(a.apy) - Number(b.apy)));
      }
      if (k == 'tvl') {
        pools = pools.sort((a, b) => (v == 'desc' ? Number(b.tvl) - Number(a.tvl) : Number(a.tvl) - Number(b.tvl)));
      }
    });

    return pools;
  }

  get poolListFitlerDev() {
    return this.poolList.filter((i) => (rootStore.dev.devPool ? true : !i.dev));
  }

  getPool(key: string): PoolState {
    return this.pools[key];
  }

  setSort(key: string) {
    const _val = this.sort[key];
    //@ts-ignore
    this.sort = {};
    this.sort[key] = _val == 'desc' ? 'asc' : 'desc';
  }
}
