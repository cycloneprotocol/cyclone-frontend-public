import React from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { IotexConnector } from '../../store/lib/IotexNetworkState';
const WalletBox = styled('div', {
  padding: '1.5rem 0 0.5rem 0',
  borderTop: '1px solid $borderPrimary',
  borderBottom: '1px solid $borderPrimary',
});

const WalletItem = styled('div', {
  backgroundColor: '$bg1',
  p: '1rem',
  mb: '1rem',
});

export const IotexConnectWallet = observer(() => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
    get visible() {
      return god.iotex.connector.showConnector;
    },
    close() {
      god.iotex.connector.showConnector = false;
    },
    connect(connector: IotexConnector) {
      god.iotex.connector.latestProvider.save(connector);
      god.iotex.activeConnector(connector);
    },
  }));

  const content = (
    <WalletBox>
      <WalletItem css={{ cursor: 'pointer' }}>
        <FlexBox
          justify="between"
          css={{ cursor: 'pointer' }}
          onClick={(e) => store.connect(IotexConnector.IopayDesktop)}
        >
          <Text size="small" weight="semibold" color="white">
            {lang.t("iopay")}
          </Text>
        </FlexBox>
      </WalletItem>
    </WalletBox>
  );
  return (
    <DialogWrapper
      title="Connect to a wallet"
      size="base"
      content={content}
      visible={store.visible}
      close={store.close}
    />
  );
});
