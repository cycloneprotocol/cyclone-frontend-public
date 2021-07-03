import { makeAutoObservable } from 'mobx';
import { rootStore } from '../index';
import { Network } from '../god';

export class TransactionState {
  createTime: number;
  amountToken: string;
  amountCYC: string;
  amountCoin: string;
  txHash: string;
  note: string;
  commitment: string;
  // 0: waiting for receipt
  // 1: deposited
  // 2: sending
  // 3: spent
  status = 1;
  network: Network;
  chainId: number;
  poolId: number;
  constructor(args: Partial<TransactionState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get txUrl() {
    if (this.network == 'iotex') {
      return this.chain.explorerURL + '/action/' + this.txHash;
    } else {
      return this.chain.explorerURL + '/tx/' + this.txHash;
    }
  }

  get chain() {
    const { network, chainId, poolId } = this;
    return rootStore.god.getChain({ network, chainId });
  }

  get pool() {
    const { network, chainId, poolId } = this;
    return rootStore.god.getPool({ network, chainId, poolId });
  }

  get statusLabel() {
    switch (this.status) {
      case 0:
        return rootStore.lang.t('waiting.for.receipt');

      case 1:
        return rootStore.lang.t('Deposited');

      case 2:
        return rootStore.lang.t('Sending');

      case 3:
        return rootStore.lang.t('Spent');
    }
  }
}
