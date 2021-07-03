import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { HomePage } from '.';
import { Provider } from '@iotexproject/ethers-multicall';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../lib/web3-react-bsc';
import { EthConnectWallet } from '../../components/EthConnectWallet';
import { eventBus } from '../../lib/event';
import { metamaskUtils } from '../../utils/metamaskUtils';
import { Web3Provider } from '@ethersproject/providers';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';

export const Bsc = observer(() => {
  const { god, base } = useStore();
  const { chainId, account, activate, active, library, deactivate } = useWeb3React<Web3Provider>();

  const store = useLocalStore(() => ({
    logout() {
      deactivate();
      god.eth.connector.latestProvider.clear();
    }
  }));
  useEffect(() => {
    god.currentNetworkName = 'eth';
    if (chainId) {
      if (god.currentNetwork.allowChains.includes(chainId)) {
        god.currentNetwork.chainId = chainId;
      }
    } else {
      god.currentNetwork.chainId = BSCMainnetConfig.chainId;
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
    const chain = god.eth.chains[BSCMainnetConfig.chainId];
    metamaskUtils.setupNetwork({
      chainId: chain.chainId,
      blockExplorerUrls: [chain.explorerURL],
      chainName: chain.name,
      nativeCurrency: {
        decimals: chain.Coin.decimals || 18,
        name: chain.Coin.symbol,
        symbol: chain.Coin.symbol
      },
      rpcUrls: [chain.rpcUrl]
    });
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
