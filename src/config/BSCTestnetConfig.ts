import { LPTokenState, TokenState } from '../store/lib/TokenState';
import { ContractState, AeolusContractState } from '../store/lib/ContractState';
import MimoExchangeABI from '../../public/contracts/MimoExchange.json';
import AeolusV2ABI from '../../public/contracts/AeolusV2.json';
import PancakePairABI from '../../public/contracts/pancakePair.json';
import XRC20ABI from '../../public/contracts/XRC20.json';
import CYCLONEV2ABI from '../../public/contracts/CycloneV2.json';
import UniswapV2CycloneRouterABI from '../../public/contracts/UniswapV2CycloneRouter.json';
import { PoolState } from '../store/lib/PoolState';
import { ChainState } from '../store/lib/ChainState';

export const BSCTestnetConfig = new ChainState({
  name: 'Binance Smart Chain Testnet',
  chainId: 97,
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  explorerURL: 'https://testnet.bscscan.com',
  explorerName: 'BscScan',
  swapName: 'PancakeSwap',
  swapURL: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x810ee35443639348adbbc467b33310d2ab43c168',
  APIURL: 'https://analytics-testnet.cyclone.xyz/query',
  relayer: 'https://minttoken.herokuapp.com',
  metas: {
    rewardPerBlock: 3
  },
  Coin: new TokenState({
    symbol: 'BNB',
    decimals: 18
  }),
  Aeolus: new AeolusContractState({
    addLiquidity: 'https://exchange.pancakeswap.finance/#/add/BNB/${token}',
    address: '0x01b364494c49ec9d5095b6331255a93f505876c7',
    abi: AeolusV2ABI
  }),
  MultiCall: new ContractState({
    address: '0xe348b292e8eA5FAB54340656f3D374b259D658b8'
  }),
  LPToken: new LPTokenState({
    address: '0x0A3D64E93C2aE3AC4166B5d0C054D2E3B71aD926',
    abi: PancakePairABI,
    decimals: 18
  }),
  CYCToken: new TokenState({
    address: '0x451A0fcD5615E54d27780757FB1F5006df346e60',
    abi: XRC20ABI,
    decimals: 18,
    symbol: 'CYC'
  }),
  UniswapV2CycloneRouter: new ContractState({
    address: '0xfe77057dc9c89e553ddeafa1bd2ca35e18712c96',
    abi: UniswapV2CycloneRouterABI
  }),
  pools: {
    '100': new PoolState({
      id: 100,
      set: 'Pool 1 - BUSD',
      address: '0x36b078405bD821392fb2A7008b582f3DBE82e139',
      abi: CYCLONEV2ABI,
      deployedBlock: 0,
      symbol: 'BUSD',
      decimals: 18,
      rawRelayerFee: '50',
      XRCToken: new TokenState({
        address: '0x96F15F0C24167015f3A87314b92e11F77b48179B',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'BUSD'
      })
    }),
    '101': new PoolState({
      id: 101,
      set: 'Pool 2 - BNB',
      address: '0x0B3e3884235E6Dc21AD430320515ca63869877Af',
      abi: CYCLONEV2ABI,
      symbol: 'BNB',
      decimals: 18,
      deployedBlock: 0,
      rawRelayerFee: '50'
    }),
    '102': new PoolState({
      id: 102,
      set: 'Pool 3 - CYC',
      address: '0x7C994FB3a8C208C1750Df937d473040c604292D6',
      abi: CYCLONEV2ABI,
      symbol: 'CYC',
      decimals: 18,
      deployedBlock: 0,
      rawRelayerFee: '30'
    })
  }
});
