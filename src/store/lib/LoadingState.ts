import { makeAutoObservable } from 'mobx';

export class LoadingState {
  value = 0;
  loading: boolean = false;
  constructor(args: Partial<LoadingState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  get format() {
    if (this.loading) return '...';
    return this.value;
  }
  setValue(value: any) {
    this.value = value;
    this.loading = false;
  }
  setLoading(val) {
    this.loading = val;
  }
}
