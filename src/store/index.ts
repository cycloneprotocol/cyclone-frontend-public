import React from 'react';
import { LangStore } from './lang';
import { GodStore } from './god';
import { DevStore } from './dev';
import { TransactionStore } from './transaction';
import { SettingStore } from './setting';
import { BaseStore } from './base';

export const rootStore = {
  base: new BaseStore(),
  lang: new LangStore(),
  god: new GodStore(),
  dev: new DevStore(),
  transaction: new TransactionStore(),
  setting: new SettingStore()
};

const StoresContext = React.createContext(rootStore);

export const useStore = () => React.useContext(StoresContext);

//@ts-ignore
window._store = rootStore;
