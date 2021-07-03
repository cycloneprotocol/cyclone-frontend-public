import { useWeb3React } from '@web3-react/core';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { bscConnector, injectedConnector, walletconnectConnector } from '../lib/web3-react-bsc';
import { css } from '../modules';
import { useStore } from '../store';
import Button from './Button';

export const ConnectorSelector = observer(props => {
  const { lang, bsc: pageStore } = useStore();
  const { activate, error, deactivate } = useWeb3React();
  const store = useLocalStore(() => ({
    connectMetamask() {
      activate(injectedConnector);
      pageStore.latestEthProvider.save('inject');
    },
    connectWalletConnect() {
      activate(walletconnectConnector);
    },
    connectBsc() {
      activate(bscConnector);
    },
    close() {
      props.onClickCloseButton();
    }
  }));
  return (
    <div className="borderedView">
      <div className="checkNoteView">
        <div className="titleOfView">
          <span>{props.title}</span>
          <img onClick={store.close} src="/images/closeicon.png" alt="Remove Button" style={{ cursor: 'pointer' }} />
        </div>
        <div className="bodyOfView">
          <p>{props.text}</p>
          {error && <p style={{ color: 'red' }}>{lang.t('wrong_netwokr_bsc')}</p>}

          <div className={styles.btnList.className}>
            <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectMetamask}
              label={
                <div className={styles.IconButton.className}>
                  <img className={styles.icon.className} src={'/images/metamask.svg'} />
                  <text>{lang.t('Metamask')}</text>
                </div>
              }
            />
            {/* <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectWalletConnect}
              label={
                <div className={styles.IconButton}>
                  <img className={styles.icon} src={'/images/walletConnect.svg'} />
                  <text>{lang.t('WalletConnect')}</text>
                </div>
              }
            /> */}
            <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectBsc}
              label={
                <div className={styles.IconButton.className}>
                  <img className={styles.icon} src={'/images/binance.svg'} />
                  <text style={{ flex: 1 }}>{lang.t('Bsc')}</text>
                </div>
              }
            />
          </div>
          <div className={styles.btnList.className}>
            <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectMetamask}
              label={
                <div className={styles.IconButton.className}>
                  <img className={styles.icon} src={'/images/trustwallet.svg'} />
                  <text>TrustWallet</text>
                </div>
              }
            />
            <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectMetamask}
              label={
                <div className={styles.IconButton.className}>
                  <img className={styles.icon.className} src={'/images/mathwallet.svg'} />
                  <text>MathWallet</text>
                </div>
              }
            />
            <Button
              fullWidth={false}
              avaliable={true}
              onClick={store.connectMetamask}
              label={
                <div className={styles.IconButton.className}>
                  <img className={styles.icon.className} src={'/images/tokenpocket.svg'} />
                  <text>TokenPocket</text>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const styles = {
  IconButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  icon: css({
    width: '24px',
    height: '24px',
    margin: '0 4px'
  }),
  btnList: css({
    marginTop: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '.button': {
      marginBottom: '1rem'
    },
    '@md': {
      flexDirection: 'row',
      columnGap: '1rem',
      '.button': {
        marginBottom: '0'
      }
    }
  })
};

export default ConnectorSelector;
