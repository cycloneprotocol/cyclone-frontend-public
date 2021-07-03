import { makeAutoObservable } from 'mobx';

export class DevStore {
  constructor() {
    makeAutoObservable(this);
    const params = new URLSearchParams(window.location.search);
    this.dev = !!params.get('dev');
    this.devUI = !!params.get('devui');
    this.devPool = !!params.get('devpool');
  }
  dev = false;
  devUI = false;
  devPool = false;
}
