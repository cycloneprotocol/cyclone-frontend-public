import { TokenState, LPTokenState } from '../store/lib/TokenState';
import { ContractState, AeolusContractState } from '../store/lib/ContractState';
import AeolusV2ABI from '../../public/contracts/AeolusV2.json';
import PancakePairABI from '../../public/contracts/pancakePair.json';
import CYCLONEV2Dot2ABI from '../../public/contracts/CycloneV2dot2.json';
import XRC20ABI from '../../public/contracts/XRC20.json';

import UniswapV2CycloneRouterABI from '../../public/contracts/UniswapV2CycloneRouter.json';
import { PoolState } from '../store/lib/PoolState';
import { ChainState } from '../store/lib/ChainState';
import Config from '../Config';

export const ETHMainnetConfig = new ChainState({
  name: 'ETH Mainnet',
  chainId: 1,
  rpcUrl: `https://mainnet.infura.io/v3/${Config.infuraId}`,
  explorerURL: 'https://etherscan.io',
  explorerName: 'EtherScan',
  swapName: 'UniSwap',
  swapURL: 'https://app.uniswap.org/#/swap/?inputCurrency=ETH&outputCurrency=0x8861cfF2366C1128fd699B68304aD99a0764Ef9a',
  APIURL: 'https://analytics-eth.cyclone.xyz/query',
  relayer: 'https://eth-relayer.cyclone.xyz',
  metas: {
    rewardPerBlock: 13
  },
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  Aeolus: new AeolusContractState({
    addLiquidity: 'https://app.uniswap.org/#/add/ETH/${token}',
    address: '0xdc71bc29d12960a3ee5452fac6f033a1b8e756fb',
    abi: AeolusV2ABI
  }),
  LPToken: new LPTokenState({
    address: '0x37d9c7f451e5c619a7d4ca01e06761eb7dae6f89',
    abi: PancakePairABI,
    decimals: 18
  }),
  CYCToken: new TokenState({
    address: '0x8861cff2366c1128fd699b68304ad99a0764ef9a',
    abi: XRC20ABI,
    decimals: 18,
    symbol: 'CYC'
  }),
  MultiCall: new ContractState({
    address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  }),
  UniswapV2CycloneRouter: new ContractState({
    address: '0x602b40bf327c10370483ae5ecde15a7bb480dcca',
    abi: UniswapV2CycloneRouterABI
  }),
  pools: {
    '12': new PoolState({
      id: 12,
      version: 2.2,
      set: 'Latte Pool - 100 ETH',
      address: '0xd619c8da0a58b63be7fa69b4cc648916fe95fa1b',
      abi: CYCLONEV2Dot2ABI,
      symbol: 'ETH',
      decimals: 18,
      rawRelayerFee: '100000000000000000'
    }),
    '13': new PoolState({
      id: 13,
      version: 2.3,
      set: 'Expresso Pool - 100,000 USDT',
      address: '0xa38b6742cef9573f7f97c387278fa31482539c3d',
      abi: CYCLONEV2Dot2ABI,
      symbol: 'USDT',
      decimals: 6,
      XRCToken: new TokenState({
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        abi: XRC20ABI,
        decimals: 6,
        symbol: 'USDT'
      }),
      rawRelayerFee: '100000000000000000'
    }),
    '14': new PoolState({
      id: 14,
      version: 2.3,
      set: 'Test - 10 USDT',
      address: '0xbb95a50eab815edb4f7a7bf94c540caced34f194',
      abi: CYCLONEV2Dot2ABI,
      symbol: 'USDT',
      decimals: 6,
      dev: true,
      XRCToken: new TokenState({
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        abi: XRC20ABI,
        decimals: 6,
        symbol: 'USDT'
      }),
      rawRelayerFee: '10000000000000000'
    }),
    '15': new PoolState({
      id: 15,
      version: 2.3,
      set: ' Cold Brew - 100 TORN',
      address: '0x09f03488291063a8f3c67d2aab7002419d11c113',
      abi: CYCLONEV2Dot2ABI,
      symbol: 'TORN',
      decimals: 18,
      XRCToken: new TokenState({
        address: '0x77777feddddffc19ff86db637967013e6c6a116c',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'TORN'
      }),
      rawRelayerFee: '100000000000000000'
    })
  }
});
