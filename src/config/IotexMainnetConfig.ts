import { LPTokenState, TokenState } from '../store/lib/TokenState';
import { ContractState, AeolusContractState } from '../store/lib/ContractState';
import AeolusV2ABI from '../../public/contracts/AeolusV2.json';
import PancakePairABI from '../../public/contracts/pancakePair.json';
import XRC20ABI from '../../public/contracts/XRC20.json';
import CYCLONEABI from '../../public/contracts/IOTXCyclone.json';
import { PoolState } from '../store/lib/PoolState';
import { ChainState } from '../store/lib/ChainState';

export const IotexMainnetConfig = new ChainState({
  name: 'Iotex Mainnet',
  chainId: 4689,
  rpcUrl: 'https://api.iotex.one:443',
  explorerURL: 'https://iotexscan.com',
  explorerName: 'IotexScan',
  swapName: 'Mimo',
  swapURL: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x810ee35443639348adbbc467b33310d2ab43c168',
  APIURL: 'https://analytics.cyclone.xyz/query',
  relayer: 'https://relayer.cyclone.xyz',
  metas: {
    rewardPerBlock: 5
  },
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  }),
  Aeolus: new AeolusContractState({
    address: 'io1j2rwjfcm7jt7cwdnlkh0203chlrtfnc59424xc',
    abi: AeolusV2ABI
  }),
  MultiCall: new ContractState({
    address: 'io14n8zjjlh6f0733wxftj9r97ns78ksspmjgzh7e'
  }),
  LPToken: new LPTokenState({
    address: 'io1z2wmt6y74ctc9l4y4ly73gkynp0p4haj2d326m',
    abi: PancakePairABI,
    decimals: 18
  }),
  CYCToken: new TokenState({
    address: 'io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh',
    abi: XRC20ABI,
    decimals: 18,
    symbol: 'CYC'
  }),
  pools: {
    '3': new PoolState({
      id: 3,
      version: 1,
      set: 'Pool 1- Squid',
      address: 'io15w9kwskwl9tn7luhcwrj0rarzjp988pafg07uf',
      abi: CYCLONEABI
    }),
    '4': new PoolState({
      id: 4,
      version: 1,
      set: 'Pool 2- Dolphin',
      address: 'io1wcd67wk36e3r8eku8scv7g7azsfnqs7z3e38xg',
      abi: CYCLONEABI
    }),
    '5': new PoolState({
      id: 5,
      version: 1,
      set: 'Pool 3- Shark',
      address: 'io1v667xgkux8uv0gell53ew5tr090c69k85deezn',
      abi: CYCLONEABI
    }),
    '6': new PoolState({
      id: 6,
      version: 1,
      set: 'Pool 4- Whale',
      address: 'io1wnaks7kectrkxk5v4d7mh97jkqjl4p0690jxfx',
      abi: CYCLONEABI
    }),
    '0': new PoolState({
      id: 0,
      version: 1,
      set: 'Early Sparrow',
      address: 'io1rqm2keejw4jypgl0w6hr96r054ns63u0hqrfuy',
      abi: CYCLONEABI
    }),
    '1': new PoolState({
      id: 1,
      version: 1,
      set: 'Early Raven',
      address: 'io1gkeeljp4grwskgq3tl2xqglqy546nhhmytnqqp',
      abi: CYCLONEABI
    }),
    '2': new PoolState({
      id: 2,
      version: 1,
      set: 'Early Eagle',
      address: 'io1mlcgsv4ma0t6gffpxg2gva3lwqnlj5msradxk6',
      abi: CYCLONEABI
    })
  }
});
