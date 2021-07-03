import { BscConnector } from '@binance-chain/bsc-connector';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { providers as EthersProviders, ethers } from 'ethers';
import { EthereumConfigV2 } from '../config/NetowkConfig';

export function getLibrary(provider: any): Web3Provider {
  const library = new EthersProviders.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const bscConnector = new BscConnector({
  supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
});

export const injectedConnector = new InjectedConnector({ supportedChainIds: EthereumConfigV2.allowChains });

export const walletconnectConnector = new WalletConnectConnector({
  rpc: {
    // 1: `https://mainnet.infura.io/v3/${EthereumConfig.infuraId}`,
    56: 'https://bsc-dataseed1.ninicoin.io'
    // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 12000
});
