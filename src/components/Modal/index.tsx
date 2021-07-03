import React from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox, Button } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { IotexConnector } from '../../store/lib/IotexNetworkState';
import { eventBus } from '../../lib/event';

const WalletBox = styled('div', {
  padding: '1.5rem 0 0.5rem 0',
  borderTop: '1px solid $borderPrimary'
});

export const Modal = observer(() => {
  const { base, lang } = useStore();

  const store = useLocalStore(() => ({
    get visible() {
      return base.modal.visible;
    },
    get title() {
      return base.modal.title;
    },
    get content() {
      return base.modal.msg;
    },
    close() {
      base.closeModal();
      eventBus.emit('modal.cancel');
    },
    ok() {
      eventBus.emit('modal.confirm');
    }
  }));

  const content = (
    <WalletBox>
      <Text size="md" color="white" css={{ mb: '1.5rem' }}>
        {store.content}
      </Text>
      <FlexBox justify="center">
        <Button size="small" color="primary" onClick={store.close} responsive="lg">
          {lang.t('Okay')}
        </Button>
      </FlexBox>
    </WalletBox>
  );
  return <DialogWrapper title={store.title} size="base" content={content} visible={store.visible} close={store.close} />;
});
