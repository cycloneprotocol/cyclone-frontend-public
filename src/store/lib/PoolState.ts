import { makeAutoObservable, toJS } from 'mobx';
import { TokenState } from './TokenState';
import { NetworkState } from './NetworkState';
import { LoadingState } from './LoadingState';
import { _ } from '../../lib/lodash';
import { BigNumberState, MulticallParams } from '../type';
import { ChainState } from './ChainState';
import { rootStore } from '../index';
import BigNumber from 'bignumber.js';
import { DepositCYCAmountState } from './DepositCYCAmountState';

export enum PoolStateStatus {
  init = 'init',
  onDeposit = 'onDeposit'
}

export class PoolState {
  constructor(args: Partial<PoolState>) {
    Object.assign(this, args);
    if (this.XRCToken) {
      this.tokenDenomination.decimals = this.XRCToken.decimals;
    }
    makeAutoObservable(this, { network: false, chain: false });
  }
  // data
  version = 2;
  network: NetworkState;
  chain: ChainState;
  id: number;
  set: string;
  address: string;
  abi: any;
  symbol: string;
  decimals: number;
  deployedBlock: number;
  XRCToken?: TokenState;
  dev?: boolean;
  rawRelayerFee = '50';

  BNBtoBuyCYC = new BigNumberState({ loading: true, fixed: 8 });
  allowBuyCYC: Boolean = false;
  reward = new LoadingState({ loading: true });

  // v2 for rate
  // v2.2 for amount
  anonymityPoolFee = new BigNumberState({ loading: true });
  coinDenomination = new BigNumberState({ loading: true });
  cycDenomination = new BigNumberState({ loading: true });
  depositCYCAmount = new DepositCYCAmountState({ mf: new BigNumber(1.1) });
  tokenDenomination = new BigNumberState({ loading: true });

  logs: {
    viewAll: boolean;
    totalCount: number;
    deposits: Partial<{
      commitment: any;
      leafIndex: any;
      timestamp: any;
      // v1
      denomination: any;
      // v2
      tokenDenomination: any;
      coinDenomination: any;
      cycDenomination: any;
    }>[];
  } = {
    viewAll: false,
    totalCount: 0,
    deposits: []
  };

  numOfShare = 0;

  // ui
  status: PoolStateStatus = PoolStateStatus.init;
  isShow = false;

  get relayerFee() {
    return new BigNumberState({ value: new BigNumber(this.rawRelayerFee) });
  }

  get LatestDeposits() {
    if (this.logs.deposits.length) {
      return this.logs.deposits[this.logs.deposits.length - 1];
    }
    return null;
  }

  get icon() {
    return this.symbol.toLowerCase();
  }

  get anonymityRateMethod() {
    return this.version == 2 ? 'anonymityRate' : 'anonymityFee';
  }

  get xrcStatus() {
    if (!this.XRCToken || this.XRCToken?.balance.loading) {
      return { showApprove: false, required: false };
    }
    const required = this.tokenDenomination.value.comparedTo(0) > 0;
    const showApprove = this.network.account;
    const approved = this.XRCToken.allownaceForRouter.value.comparedTo(this.tokenDenomination.value) >= 0;
    const enough = this.XRCToken.balance.value.comparedTo(this.tokenDenomination.value) >= 0;

    return {
      showApprove,
      required,
      approved,
      enough,
      valid: required ? enough && approved : true,
      isApproving: approved ? false : this.XRCToken?.metas.isApprovingAllowance
    };
  }

  get cycStatus() {
    const required = this.depositCYCAmount.value.comparedTo(0) > 0;
    const showApprove = this.network.account;
    const approved = this.chain.CYCToken.allownaceForRouter.value.comparedTo(this.depositCYCAmount.value) >= 0;
    const enough = this.chain.CYCToken.balance.value.comparedTo(this.depositCYCAmount.value) >= 0;

    return {
      showApprove,
      required,
      approved,
      enough,
      valid: required ? enough && approved : true,
      isApproving: approved ? false : this.chain.CYCToken.metas.isApprovingAllowance
    };
  }

  get coinStatus() {
    const required = this.coinDenomination.value.comparedTo(0) > 0;
    if (this.chain.Coin.balance.loading) {
      return { required, enough: true };
    }
    const enough = this.chain.Coin.balance.value.comparedTo(this.coinDenomination.value) > 0;
    const enoughForBuyCyc = this.chain.Coin.balance.value.comparedTo(this.coinDenomination.value.plus(this.BNBtoBuyCYC.value)) > 0;
    return {
      required,
      enoughForBuyCyc,
      enough: this.allowBuyCYC ? enoughForBuyCyc : enough,
      valid: required ? enough : true
    };
  }

  get depositStatus() {
    if (!this.network.account) {
      return { needConnectWallet: true, valid: true, msg: rootStore.lang.t('connect') };
    }
    if (this.status == PoolStateStatus.onDeposit) {
      return { valid: false };
    }
    if (this.XRCToken && !this.xrcStatus.valid) {
      if (!this.xrcStatus.enough) {
        return { valid: false, msg: rootStore.lang.t('insufficient.balance.token', { token: this.XRCToken.symbol }) };
      } else if (!this.xrcStatus.approved) {
        return { valid: false, msg: rootStore.lang.t('approve.please', { token: this.XRCToken.symbol }) };
      }
    }
    if (!this.coinStatus.valid) {
      return { valid: false, msg: rootStore.lang.t('insufficient.balance.token', { token: this.chain.Coin.symbol }) };
    }
    if (this.cycStatus.required) {
      if (this.allowBuyCYC && !this.coinStatus.enough) {
        return { valid: false, msg: rootStore.lang.t('insufficient.balance.token', { token: this.chain.Coin.symbol }) };
      }
      if (!this.allowBuyCYC && !this.cycStatus.valid) {
        if (!this.cycStatus.enough) {
          return { valid: false, msg: rootStore.lang.t('insufficient.balance.token', { token: this.chain.CYCToken.symbol }) };
        } else if (!this.cycStatus.approved) {
          return { valid: false, msg: rootStore.lang.t('approve.please', { token: this.chain.CYCToken.symbol }) };
        }
      }
    }
    return { valid: true };
  }

  get denominationFormat() {
    if (this.tokenDenomination.value.comparedTo(0) > 0 || this.tokenDenomination.loading) {
      return `${this.tokenDenomination.format} ${this.symbol}`;
    }
    if (this.cycDenomination.value.comparedTo(this.coinDenomination.value) > 0) {
      return `${this.cycDenomination.format} CYC`;
    } else {
      return `${this.coinDenomination.format} ${this.network.currentChain.Coin.symbol}`;
    }
  }

  get apy() {
    return _.get(this.network.apyMap, `${this.address}.apy`, '...');
  }

  get tvl() {
    return _.get(this.network.poolTvl, `${this.address}.value`, null);
  }

  get dailyApy() {
    //@ts-ignore
    return new BigNumber(this.apy).comparedTo(0) > 0 ? new BigNumber(this.apy).dividedBy(365).toFixed(2) : '...';
  }

  get poolAddressLink() {
    return this.chain.explorerURL + '/address/' + this.address;
  }

  preMulticall(args: Partial<MulticallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }

  loadPoolLog() {
    this.network.loadPoolLog(this);
  }

  setAllowBuyCYC(val: boolean) {
    this.allowBuyCYC = val;
  }
  setStatus(status: PoolStateStatus) {
    this.status = status;
  }
  setShow(value) {
    if (value) {
      this.loadPoolLog();
    }
    this.chain.poolList.forEach((i) => {
      i.isShow = false;
      i.logs.viewAll = false;
    });
    this.isShow = value;
  }
}
