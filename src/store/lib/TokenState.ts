import { makeObservable, observable } from 'mobx';
import { NetworkState } from './NetworkState';
import BigNumber from 'bignumber.js';
import { BigNumberState, MulticallParams } from '../type';

export class TokenState {
  address: string;
  abi: any;
  decimals: number;
  symbol: string;
  allownaceForRouter = new BigNumberState({ loading: true });
  network: NetworkState;
  balance: BigNumberState;
  metas: {
    isApprovingAllowance?: boolean;
    [key: string]: any;
  } = {};
  constructor(args: Partial<TokenState>) {
    Object.assign(this, args);
    this.balance = new BigNumberState({ decimals: this.decimals, loading: true });
    makeObservable(this, {
      metas: observable
    });
  }

  parseValue({ value, fixed = 6 }: { value: any; fixed?: number }) {
    return new BigNumber(value).dividedBy(10 ** this.decimals).toFixed(fixed, 1);
  }

  preMulticall(args: Partial<MulticallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}

export class LPTokenState extends TokenState {
  allowanceForAeolus = new BigNumberState({ loading: true });
  constructor(args: Partial<LPTokenState>) {
    super(args);
  }
}
