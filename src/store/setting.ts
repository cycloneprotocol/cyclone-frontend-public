import { makeAutoObservable } from 'mobx';
import { StorageState } from './type';

export class SettingStore {
  constructor() {
    makeAutoObservable(this);
  }
  approveMax = new StorageState({ key: 'approveMax', default: true });
}
