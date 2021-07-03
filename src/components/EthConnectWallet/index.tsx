import React from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { injectedConnector, bscConnector } from '../../lib/web3-react-bsc';
import { useWeb3React } from '@web3-react/core';

const WalletBox = styled('div', {
  padding: '1.5rem 0 0.5rem 0',
  borderTop: '1px solid $borderPrimary',
  borderBottom: '1px solid $borderPrimary'
});

const WalletItem = styled('div', {
  backgroundColor: '$bg1',
  p: '1rem',
  mb: '1rem'
});

export const EthConnectWallet = observer(() => {
  const { god, lang } = useStore();
  const { activate, error, deactivate } = useWeb3React();

  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    connectInejct() {
      activate(injectedConnector);
      god.eth.connector.latestProvider.save('inject');
    },
    connectBsc() {
      activate(bscConnector);
    }
  }));

  const content = (
    <WalletBox>
      <WalletItem onClick={store.connectInejct} css={{ cursor: 'pointer' }} >
        <FlexBox justify="between" >
          <Text size="small" weight="semibold" color="white" css={{ cursor: 'pointer' }}>
            {lang.t('metamask')}
          </Text>
          <Icon src="/images/metamask.svg"></Icon>
        </FlexBox>
      </WalletItem>
      <WalletItem onClick={store.connectBsc} css={{ cursor: 'pointer' }}  >
        <FlexBox justify="between" >
          <Text size="small" weight="semibold" color="white" css={{ cursor: 'pointer' }}>
            {lang.t('Bsc')}
          </Text>
          <Icon src="/images/binance.svg"></Icon>
        </FlexBox>
      </WalletItem>
      <WalletItem onClick={store.connectInejct} css={{ cursor: 'pointer' }} >
        <FlexBox justify="between" >
          <Text size="small" weight="semibold" color="white" css={{ cursor: 'pointer' }}>
            {lang.t('trustWallet')}
          </Text>
          <Icon src="/images/trustwallet.svg"></Icon>
        </FlexBox>
      </WalletItem>
      <WalletItem onClick={store.connectInejct} css={{ cursor: 'pointer' }} >
        <FlexBox justify="between" >
          <Text size="small" weight="semibold" color="white" css={{ cursor: 'pointer' }}>
            {lang.t('mathWallet')}
          </Text>
          <Icon src="/images/mathwallet.svg"></Icon>
        </FlexBox>
      </WalletItem>
      <WalletItem onClick={store.connectInejct} css={{ cursor: 'pointer' }} >
        <FlexBox justify="between" >
          <Text size="small" weight="semibold" color="white" css={{ cursor: 'pointer' }}>
            {lang.t('tokenPocket')}
          </Text>
          <Icon src="/images/tokenpocket.svg"></Icon>
        </FlexBox>
      </WalletItem>
    </WalletBox>
  );
  return <DialogWrapper title="Connect to a wallet" size="base" content={content} visible={store.visible} close={store.close} />;
});
