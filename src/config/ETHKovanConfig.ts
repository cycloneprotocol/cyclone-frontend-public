import { TokenState, LPTokenState } from '../store/lib/TokenState';
import { ContractState, AeolusContractState } from '../store/lib/ContractState';
import AeolusV2ABI from '../../public/contracts/AeolusV2.json';
import PancakePairABI from '../../public/contracts/pancakePair.json';
import XRC20ABI from '../../public/contracts/XRC20.json';
import CYCLONEV2Dot2ABI from '../../public/contracts/CycloneV2dot2.json';
import UniswapV2CycloneRouterABI from '../../public/contracts/UniswapV2CycloneRouter.json';
import { PoolState } from '../store/lib/PoolState';
import { ChainState } from '../store/lib/ChainState';
import Config from '../Config';

export const ETHKovanCongfig = new ChainState({
  name: 'ETH Kovan Network',
  chainId: 42,
  rpcUrl: `https://kovan.infura.io/v3/${Config.infuraId}`,
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  swapName: 'UniSwap',
  swapURL: 'https://app.uniswap.org/#/swap/?inputCurrency=ETH&outputCurrency=0x1479c4b60997629DCC615DdD99B8d29dC1E03bE3',
  APIURL: 'https://analytics-test.cyclone.xyz/query',
  relayer: 'https://kovan-replayer.cyclone.xyz',
  metas: {
    rewardPerBlock: 13
  },
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  Aeolus: new AeolusContractState({
    addLiquidity: 'https://app.uniswap.org/#/add/ETH/${token} ',
    address: '0xab3cb085f6b9d23f84ba212511fd5c60ce26404d',
    abi: AeolusV2ABI
  }),
  LPToken: new LPTokenState({
    address: '0xf956806A84748100413f211a2eD0c355efF32140',
    abi: PancakePairABI,
    decimals: 18
  }),
  CYCToken: new TokenState({
    address: '0x1479c4b60997629DCC615DdD99B8d29dC1E03bE3',
    abi: XRC20ABI,
    decimals: 18,
    symbol: 'CYC'
  }),
  MultiCall: new ContractState({
    address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a'
  }),
  UniswapV2CycloneRouter: new ContractState({
    address: '0xf12e50e546ed86523e796aa05c7270a5ec2c15ee',
    abi: UniswapV2CycloneRouterABI
  }),
  pools: {
    '103': new PoolState({
      id: 103,
      version: 2.2,
      set: 'XRC-Test',
      address: '0x4A53112a921A8B5B70049E9c166Ea6dC5f34321B',
      abi: CYCLONEV2Dot2ABI,
      symbol: 'BUSD',
      decimals: 18,
      rawRelayerFee: '100000000000000000',
      XRCToken: new TokenState({
        address: '0xcB94cdDB420BdD3c8016b912C74176DE1f3E641E',
        abi: XRC20ABI,
        decimals: 18,
        symbol: 'BUSD'
      })
    })
  }
});
