import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { HomePage } from '.';
import { Provider } from '@iotexproject/ethers-multicall';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../lib/web3-react-bsc';
import { EthConnectWallet } from '../../components/EthConnectWallet';
import { Web3Provider } from '@ethersproject/providers';
import { eventBus } from '../../lib/event';
import { ETHMainnetConfig } from '../../config/ETHMainConfig';

export const Eth = observer(() => {
  const { god, base, lang } = useStore();
  const { chainId, account, activate, active, library, deactivate } = useWeb3React<Web3Provider>();

  const store = useLocalStore(() => ({
    get defaultChain() {
      return ETHMainnetConfig;
    },
    logout() {
      deactivate();
      god.eth.connector.latestProvider.clear();
    },
    wrongNetwork() {
      base.setModal({
        title: lang.t('wrong.network'),
        msg: lang.t('wrong.network.tips')
      });
    }
  }));
  useEffect(() => {
    god.currentNetworkName = 'eth';
    console.log({ chainId });
    if (chainId) {
      if (chainId == store.defaultChain.chainId) {
        god.currentNetwork.chainId = chainId;
      } else {
        console.log(1);
        store.wrongNetwork();
      }
    } else {
      console.log(2);
      god.currentNetwork.chainId = store.defaultChain.chainId;
      // store.wrongNetwork();
    }

    god.currentNetwork.account = account;
    //@ts-ignore
    god.eth.ethers = library ? library : god.eth.defaultEthers;
    god.eth.signer = library ? library.getSigner() : null;
    //@ts-ignore
    god.eth.multiCall = new Provider(god.eth.ethers);
    //@ts-ignore
    if (!god.eth.multiCall._multicallAddress) {
      //@ts-ignore
      god.eth.multiCall._multicallAddress = god.Multicall.address;
    }

    god.loadPublichData();
    if (account) {
      god.setShowConnecter(false);
      god.loadBalance();
      god.loadPrivateData();
    }
  }, [god, library, chainId, account, active]);

  useEffect(() => {
    if (account) {
      god.loadBalance();
      god.loadPrivateData();
    }
  }, [base.refetchTimer]);

  useEffect(() => {
    if (activate && god.eth.connector.latestProvider.value) {
      if (god.eth.connector.latestProvider.value == 'inject') {
        activate(injectedConnector);
      }
    }
  }, [activate, god.eth.connector.latestProvider.value]);

  useEffect(() => {
    eventBus.addListener('wallet.logout', store.logout);
    return () => eventBus.removeListener('wallet.logout', store.logout);
  }, []);

  return (
    <div>
      <EthConnectWallet />
      <HomePage />
    </div>
  );
});
