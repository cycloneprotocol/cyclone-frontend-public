import { makeAutoObservable } from 'mobx';
import { TransactionState } from './lib/TransactionState';
import { rootStore } from './index';

const transactionsKey = 'transactions';

export class TransactionStore {
  transactions: TransactionState[] = [];
  constructor() {
    makeAutoObservable(this);
    const transaction = localStorage.getItem(transactionsKey);
    if (transaction) {
      this.transactions = JSON.parse(transaction).map((i) => new TransactionState(i));
    }
  }

  get currentTransactions() {
    return this.transactions.filter((i) => i.chainId == rootStore.god.currentChain.chainId);
  }

  addTransaction(transaciton: TransactionState) {
    this.transactions.push(transaciton);
    this.save();
  }
  removeTransaction(transaciton: TransactionState) {
    this.transactions = this.transactions.filter((i) => i.txHash !== transaciton.txHash);
    this.save();
  }

  save() {
    localStorage.setItem(transactionsKey, JSON.stringify(this.transactions));
  }
}
