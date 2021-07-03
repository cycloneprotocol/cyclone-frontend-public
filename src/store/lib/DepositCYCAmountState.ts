import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { helper } from '../../utils/helper';

export class DepositCYCAmountState {
  _status = 0;
  _value = new BigNumber(0);
  mf = new BigNumber(1);
  fee = new BigNumber(0);
  decimals = 18;
  fixed = 6;
  formatter?: Function;
  constructor(args: Partial<DepositCYCAmountState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get loading() {
    return this._status !== 3;
  }

  get value() {
    return this._value.multipliedBy(this.mf).plus(this.fee);
  }

  get format() {
    return this.getFormat();
  }

  getFormat({ decimals = this.decimals, fixed = this.fixed }: { decimals?: number; fixed?: number } = {}) {
    if (this.loading) return '...';
    if (this.formatter) return this.formatter(this);
    return helper.number.toPrecisionFloor(new BigNumber(this.value).dividedBy(10 ** decimals).toFixed(), {
      decimals: fixed
    });
  }
  setValue(value: BigNumber) {
    this._value = value;
    this._status |= 1;
  }
  setMagnificationFactor(mf: BigNumber) {
    this.mf = mf;
  }
  setFee(val: BigNumber) {
    this.fee = val;
    this._status |= 2;
  }
}
