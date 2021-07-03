import { ETHNetworkState } from '../store/lib/NetworkState';
import { BSCMainnetConfig } from './BSCMainnetConfig';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import { IotexNetworkState } from '../store/lib/IotexNetworkState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { ETHKovanCongfig } from './ETHKovanConfig';
import { ETHMainnetConfig } from './ETHMainConfig';

// latest poolId: 15

export const EthereumConfigV2 = new ETHNetworkState({
  defaultChainId: BSCMainnetConfig.chainId,
  allowChains: [BSCMainnetConfig.chainId, BSCTestnetConfig.chainId, ETHMainnetConfig.chainId, ETHKovanCongfig.chainId],
  chains: {
    [BSCMainnetConfig.chainId]: BSCMainnetConfig,
    [BSCTestnetConfig.chainId]: BSCTestnetConfig,
    [ETHMainnetConfig.chainId]: ETHMainnetConfig,
    [ETHKovanCongfig.chainId]: ETHKovanCongfig
  }
});

export const IotexConfigV2 = new IotexNetworkState({
  defaultChainId: IotexMainnetConfig.chainId,
  allowChains: [IotexMainnetConfig.chainId],
  chains: {
    [IotexMainnetConfig.chainId]: IotexMainnetConfig
  }
});
