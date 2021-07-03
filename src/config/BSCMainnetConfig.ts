import { TokenState, LPTokenState } from '../store/lib/TokenState';
import { ContractState, AeolusContractState } from '../store/lib/ContractState';
import AeolusV2ABI from '../../public/contracts/AeolusV2.json';
import PancakePairABI from '../../public/contracts/pancakePair.json';
import XRC20ABI from '../../public/contracts/XRC20.json';
import CYCLONEV2ABI from '../../public/contracts/CycloneV2.json';
import UniswapV2CycloneRouterABI from '../../public/contracts/UniswapV2CycloneRouter.json';
import { PoolState } from '../store/lib/PoolState';
import { ChainState } from '../store/lib/ChainState';

export const BSCMainnetConfig = new ChainState({
  name: 'Binance Smart chain Mainnet',
  chainId: 56,
  rpcUrl: 'https://bsc-dataseed.binance.org',
  explorerURL: 'https://bscscan.com',
  explorerName: 'BscScan',
  swapName: 'PancakeSwap',
  swapURL: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x810ee35443639348adbbc467b33310d2ab43c168',
  APIURL: 'https://analytics-bsc.cyclone.xyz/query',
  relayer: 'https://bsc-relayer1.cyclone.xyz',
  metas: {
    rewardPerBlock: 3
  },
  Coin: new TokenState({
    symbol: 'BNB',
    decimals: 18
  }),
  Aeolus: new AeolusContractState({
    deprecated: true,
    removeLiquidity: 'https://v1exchange.pancakeswap.finance/#/remove/BNB/${token}',
    name: 'CYC-BNB LP V1 (Inactive)',
    address: '0x567da514637cfd7f9e1f185ae4aa163b3ebb5363',
    abi: AeolusV2ABI
  }),
  AeolusV2: new AeolusContractState({
    name: 'CYC-BNB LP V2',
    addLiquidity: 'https://exchange.pancakeswap.finance/#/add/BNB/${token}',
    address: '0x92a737097d711bec4c31351997254e98e5f0d430',
    abi: AeolusV2ABI
  }),
  LPToken: new LPTokenState({
    address: '0x9634cfd96f1499990695ebbc081b4ee8d63d2e12',
    abi: PancakePairABI,
    decimals: 18
  }),
  LPTokenV2: new LPTokenState({
    address: '0xecf30fbecfa642012f54212a3be92eef1e48edac',
    abi: PancakePairABI,
    decimals: 18
  }),
  CYCToken: new TokenState({
    address: '0x810ee35443639348adbbc467b33310d2ab43c168',
    abi: XRC20ABI,
    decimals: 18,
    symbol: 'CYC'
  }),
  MultiCall: new ContractState({
    address: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb'
  }),
  UniswapV2CycloneRouter: new ContractState({
    address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
    abi: UniswapV2CycloneRouterABI
  }),
  pools: {
    '7': new PoolState({
      id: 7,
      set: 'Arduino - BUSD',
      address: '0x56b94edf88baf45248cc103881b3d1a977d664d4',
      abi: CYCLONEV2ABI,
      symbol: 'BUSD',
      decimals: 18,
      dev: true,
      XRCToken: new TokenState({
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'BUSD'
      })
    }),
    '8': new PoolState({
      id: 8,
      set: 'R2D2 - 10,000 BUSD',
      address: '0xbe19d541389c9d3e03efc08f3d5008e8c9cc42a5',
      abi: CYCLONEV2ABI,
      deployedBlock: 0,
      symbol: 'BUSD',
      decimals: 18,
      XRCToken: new TokenState({
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'BUSD'
      })
    }),
    '9': new PoolState({
      id: 9,
      set: 'BB8 - 25,000 IOTX',
      address: '0x79459751f6882868d1299bfa412428488b434541',
      abi: CYCLONEV2ABI,
      deployedBlock: 0,
      symbol: 'IOTX',
      decimals: 18,
      XRCToken: new TokenState({
        address: '0x9678e42cebeb63f23197d726b29b1cb20d0064e5',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'IOTX'
      })
    }),
    '10': new PoolState({
      id: 10,
      set: 'C3PO - 100 BNB',
      address: '0x66b5e322dc31f8c7a33ffd23975163795f8d16c7',
      abi: CYCLONEV2ABI,
      deployedBlock: 0,
      symbol: 'BNB',
      decimals: 18
    }),
    '11': new PoolState({
      id: 11,
      set: 'Johnny5 - 3 CYC',
      address: '0xd90a6bf8439ef7214cf00da83e926068b6a507ec',
      abi: CYCLONEV2ABI,
      deployedBlock: 0,
      symbol: 'CYC',
      decimals: 18,
      rawRelayerFee: '30'
    })
  }
});
