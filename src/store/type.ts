import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { helper } from '../utils/helper';

export class BigNumberState {
  value = new BigNumber(0);
  loading: boolean;
  decimals = 18;
  fixed = 6;
  formatter?: Function;
  constructor(args: Partial<BigNumberState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  get format() {
    if (this.loading) return '...';
    return this.getFormat();
  }

  getFormat({ decimals = this.decimals, fixed = this.fixed }: { decimals?: number; fixed?: number } = {}) {
    if (this.loading) return '...';
    if (this.formatter) return this.formatter(this);
    return helper.number.toPrecisionFloor(new BigNumber(this.value).dividedBy(10 ** decimals).toFixed(), {
      decimals: this.fixed
    });
  }
  setDecimals(decimals: number) {
    this.decimals = decimals;
  }
  setValue(value: BigNumber) {
    this.value = value;
    this.setLoading(false);
  }
  setLoading(val) {
    this.loading = val;
  }
}

export class StorageState<T> {
  key: string;
  value: T | any;
  default: T | any;
  constructor(args: Partial<StorageState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.load();
  }

  load() {
    const value = localStorage.getItem(this.key);
    this.value = helper.json.safeParse(value);
    if (this.value == null) {
      this.value = this.default;
    }
  }

  save(value: any) {
    this.value = value;
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

export class LazyState<T> {
  _value: T;
  defaultValue: T;
  loading = false;
  loader: Function;
  constructor(args: Partial<LazyState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get value() {
    if (!this._value) {
      this.update();
      return this.defaultValue;
    }
    return this._value;
  }
  async update() {
    if (this.loading) return;
    this.loading = true;
    const data = await this.loader();
    this.setValue(data);
    this.loading = false;
  }
  setValue(val: any) {
    this._value = val;
  }
}

export interface MulticallParams {
  address: string;
  abi: any;
  method: string;
  params?: any[];
  options?: any;
  handler?: any;
}
