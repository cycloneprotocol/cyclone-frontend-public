import { rootStore } from '../store/index';
import Web3 from 'web3';
import { eventBus } from './event';
import { BaseStore } from '../store/base';

export const hooks = {
  async waitWeb3() {
    return new Promise<Web3>((res, rej) => {
      //@ts-ignore
      if (rootStore.eth.web3) {
        //@ts-ignore
        res(rootStore.eth.web3);
      } else {
        eventBus.once('web3.onConnect', (web3) => {
          res(web3);
        });
      }
    });
  },
  async waitLoading(args: Partial<BaseStore['loading']>) {
    return new Promise<void>((res, rej) => {
      rootStore.base.setLoading(args);
      eventBus.once('loading.confirm', () => {
        res();
      });
      eventBus.once('loading.cancel', () => {
        rej();
      });
    });
  },
  async waitPendingPool(args: Partial<BaseStore['pendingPool']>) {
    return new Promise<void>((res, rej) => {
      rootStore.base.setPendingPool(args);
      eventBus.once('pendingPool.confirm', () => {
        res();
        rootStore.base.closePendingPool();
      });
      eventBus.once('pendingPool.cacel', () => {
        rej();
      });
    });
  },
  async waitModal(args: Partial<BaseStore['modal']>) {
    return new Promise<void>((res, rej) => {
      rootStore.base.setModal(args);
      eventBus.once('modal.confirm', () => {
        res();
        rootStore.base.closeModal();
      });
      eventBus.once('modal.cancel', () => {
        rej();
      });
    });
  }
};
