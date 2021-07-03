import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { HomePage } from '.';
import { useStore } from '../../store/index';
import { IotexConnectWallet } from '../../components/IotexConnectWallet/index';
import { IotexMulticall } from '../../lib/multicall';
import { Contract } from 'iotex-antenna/lib/contract/contract';
import multicallABI from '../../../public/contracts/IotexMulticall.json';

export const Iotex = observer(() => {
  const { god } = useStore();
  useEffect(() => {
    god.currentNetworkName = 'iotex';
    const antenna = god.iotex.getAntenna();
    god.iotex.multiCall = new IotexMulticall({
      contract: new Contract(multicallABI, god.Multicall.address, { provider: antenna.iotx }),
    });

    // god.loadPublichData();
    if (god.iotex.account) {
      // god.loadPrivateData();
      god.setShowConnecter(false);
    }
  }, [god.iotex.account]);

  useEffect(() => {
    if (god.iotex.connector.latestProvider.value) {
      god.iotex.activeConnector(god.iotex.connector.latestProvider.value);
    }
  }, [god.iotex.connector.latestProvider.value]);

  return (
    <div>
      <IotexConnectWallet />
      <HomePage />;
    </div>
  );
});
