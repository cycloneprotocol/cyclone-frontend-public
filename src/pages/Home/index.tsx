import React, { useEffect, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Badge, Popover } from 'antd';
import { Wrapper, Button, FlexBox, Text, antdPopoverStyle, Icon } from '../../modules/globalStyle';
import { css } from '../../modules/index';
import { HomeTop } from './Top/index';
import { Deposit } from './Deposit/index';
import { CycFooter } from '../../components/CycFooter';
import { OnLoading } from '../../components/OnLoading/index';
import { useStore } from '../../store';
import { eventBus } from '../../lib/event';
import { WalletInfo } from '../../components/WalletInfo';
import { CheckNote } from '../../components/CheckNote';

export const HomePage = observer(() => {
  antdPopoverStyle();
  const { lang, base, transaction } = useStore();
  const [tabKey, setTabKey] = useState(1);

  const store = useLocalStore(() => ({
    get tabConfig() {
      return [
        { name: lang.t('Deposit'), id: 1 },
        { name: lang.t('Withdraw'), id: 2 },
        { name: lang.t('note'), id: 3, count: transaction.currentTransactions.length }
      ];
    }
  }));

  return (
    <div
      className={styles.home.className}
      style={{ overflow: base.pendingPool.visible ? 'hidden' : 'auto', height: base.pendingPool.visible ? '100vh' : 'auto' }}
    >
      {/* top header content */}
      <HomeTop />

      <article className={styles.homeContent.className} style={{ flex: 1 }}>
        {/* Deposit  Withdraw  Note*/}
        {/* <Wrapper css={{ mt: '2.5rem', mb: '3.75rem', '@md': { mb: '4rem' } }}>
          <FlexBox justify="between" responsive="rc" css={{ alignItems: 'stretch', '@md': { alignItems: 'center' } }}>
            <FlexBox css={{ mb: '2.5rem', '@md': { mb: 0 } }}>
              {store.tabConfig.map((item) => {
                return (
                  <Button
                    key={item.name}
                    size="medium"
                    responsive="medium"
                    color={tabKey == item.id ? 'active' : 'normal'}
                    onClick={() => setTabKey(item.id)}
                  >
                    <span>{item.name} </span>
                    {item.count > 0 && <span>({item.count})</span>}
                  </Button>
                );
              })}
            </FlexBox>
            <FlexBox items="start" css={{ justifyContent: 'flex-end', '@md': { justifyContent: 'flex-start' } }}>
              <Text size="small" color="primary" cursor="none" align="right">
                {lang.t('yourIp')}: {base.ip} <br /> {base.geo}
              </Text>
              <Popover
                placement="top"
                trigger="hover"
                content={
                  <Text size="md" color="white" css={{ width: 200 }}>
                    {lang.t('yout.ip.tips')}
                  </Text>
                }
              >
                <Icon src="/images/home/info_icon.png" css={{ ml: '0.8rem' }} />
              </Popover>
            </FlexBox>
          </FlexBox>
        </Wrapper> */}

        {/* chain tab */}
        {/* <ChainNav /> */}

        <Deposit />

        {/* onLoading */}
        <OnLoading
          visible={base.loading.visible}
          confirmText={base.loading.confirmText}
          showLoading={base.loading.showLoading}
          showConfirm={base.loading.showConfirm}
          text={base.loading.msg}
          showCancel={base.loading.showCancel}
          close={() => base.closeLoading()}
          onConfirm={() => eventBus.emit('loading.confirm')}
          onCancel={() => eventBus.emit('loading.cancel')}
        />
        {base.pendingPool.visible && (
          <CheckNote
            visible={base.pendingPool.visible}
            note={base.pendingPool.note}
            close={() => base.closePendingPool()}
            onConfirm={() => eventBus.emit('pendingPool.confirm')}
            onCancel={() => eventBus.emit('pendingPool.cacel')}
          />
        )}
        {/* WaleltInfo */}
        <WalletInfo />
      </article>
      <CycFooter />
    </div>
  );
});

const styles = {
  home: css({
    minHeight: '100vh',
    backgroundColor: '$bg',
    fontFamily: 'IBM Plex Sans',
    display: 'flex',
    flexDirection: 'column'
  }),
  homeContent: css({
    padding: '0 0 10rem 0'
  })
};
