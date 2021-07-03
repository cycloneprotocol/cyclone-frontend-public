import EthereumConfig from './EthereumConfig';
import God from './God';

class TransactionObject {
  constructor(timestamp, amount, txHash, indexOfTokens, indexOfSet, commitment, abi, note, isDeposit) {
    this.isDeposit = isDeposit;
    this.createTime = timestamp;
    this.amount = amount;
    this.txHash = txHash;
    this.note = note;
    this.indexOfTokens = indexOfTokens;
    this.indexOfSet = indexOfSet;
    this.commitment = commitment;
    this.abi = abi;
    this.contractAddress = '';
    this.noteLeafIndex = null;
    this.apy = null;
    // this.currentRootIndex = null
    this.subsequent = -1;
    this.currency = this.getCurrency(note);

    // 0: waiting for receipt
    // 1: deposited
    // 2: sending
    // 3: spent
    this.status = 1;
  }

  setCoin(value) {
    this.coin = value;
  }

  setApy(value) {
    this.apy = value;
  }

  setAmountCYC(value) {
    this.amountCYC = value;
  }

  setPoolName(value) {
    this.poolName = value;
  }

  getCurrency(note) {
    if (!note || note === '') {
      return '';
    }

    const noteRegex = /cyclone-(?<currency>\w+)-/;
    const match = noteRegex.exec(note);
    if (match) {
      return Number(match.groups.currency);
    } else {
      return EthereumConfig.defaultChainID;
    }
  }

  getActions(callback) {
    God.getActions(this.txHash, res => {
      if (!res || !res.actionInfo || !res.actionInfo[0]) {
        return callback(null);
      }

      const resObject = res.actionInfo[0];
      this.createTime = parseInt(resObject.timestamp * 1000);
      // this.amount = resObject.action.core.execution.amount
      this.contractAddress = resObject.action.core.execution.contract;

      if (callback) {
        return callback(res);
      }
    });
  }

  getTransactionOnEthereum(callback) {
    God.getTransactionByHash(this.txHash, async transaction => {
      this.contractAddress = transaction.to;

      const block = await God.asyncGetBlockByNumber(transaction.blockNumber);
      if (block) {
        this.createTime = parseInt(block.timestamp * 1000);
      }

      if (callback) {
        return callback(transaction);
      }
    });
  }

  async getSubsequent(callback) {
    const logs = await God.getLogs(this.contractAddress);
    if (logs && logs.length > 0) {
      this.subsequent = logs.filter(e => parseInt(e.timestamp) > parseInt(this.createTime)).length;

      return callback();
    }
  }

  getReceipt(callback) {
    God.getReceipt(this.txHash, res => {
      if (res === -1) {
        return callback(-1);
      }

      if (res > 0) {
        this.status = 1;

        if (callback) {
          return callback();
        }
      }
    });
  }
}

export default TransactionObject;
