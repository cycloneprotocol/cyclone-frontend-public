import React from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox, Button, Section } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { message } from 'antd';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';

export const WalletInfo = observer(() => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
    get visible() {
      return god.currentNetwork.walletInfo.visible;
    },
    close() {
      god.currentNetwork.walletInfo.visible = false;
    },
    copy() {
      copy(god.currentNetwork.account);
      message.success(lang.t('address.copied'));
    },
    logout() {
      eventBus.emit('wallet.logout');
      store.close();
    }
  }));

  const content = (
    <Section>
      <Text size="small" color="white" css={{ padding: '1.125rem 1rem', backgroundColor: '$bg3', wordBreak: 'break-all' }}>
        {' '}
        {god.currentNetwork.account}{' '}
      </Text>
      <FlexBox css={{ mt: '1.125rem', mb: '3rem' }}>
        <Icon src="/images/home/icon_bscscan.png" alt="" css={{ width: '0.875rem', mr: '0.6rem', '@md': { width: '1.5rem' } }}></Icon>
        <a href={god.currentChain.explorerURL + '/address/' + god.currentNetwork.account} target="_blank">
          <Text size="small" color="primary" cursor="pointer" css={{ textDecoration: 'underline' }} responsive="md">
            {lang.t('view.on')} {god.currentChain.explorerName}
          </Text>
        </a>
        <Icon src="/images/home/icon_copy_bold.png" alt="" css={{ width: '0.875rem', ml: '2rem', mr: '0.6rem', '@md': { width: '1.5rem' } }}></Icon>
        <Text size="small" color="primary" cursor="pointer" onClick={store.copy} css={{ textDecoration: 'underline' }} responsive="md">
          {lang.t('copy.address')}
        </Text>
      </FlexBox>
      <FlexBox justify="center">
        <Button size="small" color="primary" onClick={store.logout} responsive="lg">
          {lang.t('LOGOUT')}
        </Button>
      </FlexBox>
    </Section>
  );
  return <DialogWrapper title="Your wallet" size="md" content={content} visible={store.visible} close={store.close} />;
});
