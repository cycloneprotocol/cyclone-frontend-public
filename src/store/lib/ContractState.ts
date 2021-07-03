import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { NetworkState } from './NetworkState';
import { BigNumberState, MulticallParams } from '../type';
import { _ } from '../../lib/lodash';
import BigNumber from 'bignumber.js';
import { LPTokenState } from './TokenState';
import { helper } from '../../utils/helper';
import { rootStore } from '../index';

export class ContractState {
  address: string;
  abi: any;
  network: NetworkState;

  constructor(args: Partial<ContractState>) {
    Object.assign(this, args);
  }

  preMulticall(args: Partial<MulticallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}

export class AeolusContractState implements ContractState {
  address: string;
  name: string;
  abi: any;
  deprecated: boolean;
  rewardPerBlock = new BigNumberState({
    loading: true,
    fixed: 0
  });
  staked = new BigNumberState({ loading: true });
  cycEarn = new BigNumberState({ loading: true });
  lpLocked = null;
  network: NetworkState;
  LpToken: LPTokenState;
  addLiquidity: string;
  removeLiquidity: string;

  constructor(args: Partial<AeolusContractState>) {
    Object.assign(this, args);
    makeAutoObservable(this, {
      network: false
    });
  }

  get liquidityText() {
    return this.deprecated ? rootStore.lang.t('remove.liquidity') : rootStore.lang.t('add.liquidity');
  }

  get LiquidityURL() {
    return this.deprecated
      ? helper.string.parseTemplate(this.removeLiquidity, { token: this.network.currentChain.CYCToken.address })
      : helper.string.parseTemplate(this.addLiquidity, { token: this.network.currentChain.CYCToken.address });
  }

  get title() {
    if (this.name) return this.name;
    return `CYC-${this.network.currentChain.Coin.symbol.toUpperCase()} LP`;
  }

  get liquidityApy() {
    return _.get(this.network.apyMap, `${this.address}.apy`, '0') as string;
  }

  get liquidityApyDaily() {
    return new BigNumber(this.liquidityApy).comparedTo(0) > 0 ? new BigNumber(this.liquidityApy).dividedBy(365).toFixed(2) : '0';
  }

  get rewardDaily() {
    const rewardPerBlock = this.rewardPerBlock;
    if (rewardPerBlock.loading) return '...';
    return rewardPerBlock.value
      .multipliedBy(86400 / this.network.currentChain.metas.rewardPerBlock)
      .dividedBy(10 ** rewardPerBlock.decimals)
      .toFixed(rewardPerBlock.fixed);
  }

  preMulticall(args: Partial<MulticallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
