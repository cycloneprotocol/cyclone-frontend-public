import { makeAutoObservable } from 'mobx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import zh from 'javascript-time-ago/locale/zh';
import ru from 'javascript-time-ago/locale/ru';
import { rootStore } from './index';
import Config from '../Config';
import { analyticsBscClient, analyticsETHClient } from '../lib/analytics-bsc-gql';
import { eventBus } from '../lib/event';
import { analyticsClient } from '../lib/analytics-gql';
import { marketUtils } from '../utils/market';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
TimeAgo.addLocale(zh);

export class BaseStore {
  constructor() {
    makeAutoObservable(this);
    this.startRefetch();
  }

  timer: any;
  startRefetch() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      eventBus.emit('amount.refetch');
      this.refetchTimer += 1;
    }, 15000);
  }

  startRefetchForce() {
    eventBus.emit('amount.refetch');
    this.refetchTimer += 1;
    this.startRefetch();
  }

  tempIndex = Number(window.localStorage.getItem('tempIndex'));
  timeAgos = {
    en: new TimeAgo('en-US'),
    ru: new TimeAgo('ru-RU'),
    zh_CN: new TimeAgo('zh-CN')
  };
  get timeAgo() {
    const timeAgo = this.timeAgos[rootStore.lang.lang];
    return timeAgo || this.timeAgos.en;
  }
  ip = '';
  geo = '';
  apy = 0;
  refetchTimer = 0;
  cycPrice = 0;
  tvl = 0;

  loading = {
    visible: false,
    msg: '',
    showConfirm: true,
    showCancel: false,
    showLoading: false,
    confirmText: ''
  };

  pendingPool = {
    visible: false,
    note: null
  };

  modal = {
    visible: false,
    title: '',
    msg: ''
  };
  setModal(args: Partial<BaseStore['modal']>) {
    Object.assign(this.modal, { visible: true }, args);
  }
  closeModal() {
    this.modal = {
      visible: false,
      title: '',
      msg: ''
    };
  }

  setPendingPool(args: Partial<BaseStore['pendingPool']>) {
    Object.assign(this.pendingPool, { visible: true }, args);
  }
  closePendingPool() {
    this.pendingPool = {
      visible: false,
      note: null
    };
  }

  closeLoading() {
    this.loading = {
      visible: false,
      msg: '',
      showConfirm: true,
      showCancel: false,
      showLoading: false,
      confirmText: ''
    };
  }

  setLoading(args: Partial<BaseStore['loading']>) {
    Object.assign(this.loading, { visible: true, showLoading: false, showConfirm: true }, args);
  }

  async getCycPrice() {
    const price = await analyticsBscClient.chain.query.price({ symbol: 'CYC' }).execute({ usd: 1 });
    this.cycPrice = price.usd;
  }

  async getTVL() {
    this.tvl = await marketUtils.getTVL();
  }

  init() {
    this.getCycPrice();
    this.getTVL();

    eventBus.on('amount.refetch', () => {
      this.getCycPrice();
    });
  }
}
