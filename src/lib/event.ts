import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';
import Web3 from 'web3';

interface MessageEvents {
  'web3.onConnect': (web3: Web3) => void;
  'web3.onAccount': (web3: string) => void;
  'amount.refetch': () => void;
  'loading.confirm': () => void;
  'loading.cancel': () => void;
  'wallet.logout': () => void;
  'pendingPool.confirm': () => void;
  'pendingPool.cacel': () => void;
  'modal.confirm': () => void;
  'modal.cancel': () => void;
}

export const eventBus = new EventEmitter() as TypedEmitter<MessageEvents>;
