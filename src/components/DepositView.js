import React, { useEffect, useMemo } from 'react';
import Config from '../Config';
import Button from './Button';
import { css } from '../modules/index';
import { useStore } from '../store';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import ReadBeforeDeposit from './ReadBeforeDeposit';
import { useWeb3React } from '@web3-react/core';

export const DepositView = observer(props => {
  const { lang, iotex: pageStore } = useStore();
  const store = useLocalStore(() => ({
    get indexOfToken() {
      return pageStore.currentSelectedToken;
    },
    get indexOfPool() {
      return pageStore.currentSelectedPool;
    },
    get currentDenomination() {
      return pageStore.currentDenomination;
    },
    get poolSize() {
      return pageStore.currentPoolSize;
    },
    visible: false,

    get isAvaliable() {
      console.log(pageStore.isConnect, pageStore.CurrentPool.address !== '', !pageStore.CurrentPool.deprecated);
      return pageStore.isConnect && pageStore.CurrentPool.address !== '' && !pageStore.CurrentPool.deprecated;
    },

    onSelectToken(event) {
      const idx = event.target.value;
      pageStore.setCurrentSelectedToken(idx);
    },

    onSelectPool(index) {
      pageStore.setCurrentSelectedPool(index);
      pageStore.fetchData();
    },

    onConnect() {
      props.onConnect();
    },

    async deposit() {
      let set = pageStore.CurrentPool;
      if (set.address && store.currentDenomination) {
        if (pageStore.CurrentToken.name === 'IOTX') {
          props.onDeposit(set.address, store.currentDenomination, true);
        } else {
          props.onDeposit(set.address, store.currentDenomination, false);
        }
      }
    },
  }));

  const ActionButton = useObserver(() => {
    if (!pageStore.isConnect) {
      return <Button avaliable={true} label={lang.t('connect')} onClick={store.onConnect} />;
    }
    return (
      <Button
        label={lang.t('Deposit')}
        avaliable={store.isAvaliable}
        onClick={() => {
          store.visible = true;
        }}
      />
    );
  });

  useEffect(() => {
    setTimeout(() => {
      pageStore.fetchData();
    }, 3000);
  }, []);

  return (
    <div className={styles.depositView.className}>
      <div className={styles.token.className}>
        <div className="header">
          {lang.t('Pool')}
          <span className="tooltip" data-tip="pool-tips" data-for="pool-tips">
            i
          </span>
        </div>
        <ReactTooltip place="right" type="warning" id="pool-tips" effect="solid" backgroundColor="#45bcb8">
          <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>{lang.t('Pool.tips')}</div>
        </ReactTooltip>
        <div className={styles.poolAudio.className}>
          <ul>
            {pageStore.CurrentToken.amountSteps.map((item, index) => (
              <li
                key={index}
                data={index}
                className={store.indexOfPool === index ? 'active' : ''}
                onClick={() => store.onSelectPool(index)}
              >
                {item.set}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.poolInfos.className}>
          <div className="address">
            {lang.t('version')}:{' '}
            <a href="https://github.com/cycloneprotocol/cyclone-contracts/tree/v1.0" target="_blank">
              1.0
            </a>
          </div>
          <div className="address">
            {lang.t('Address')}: {pageStore.CurrentPool['address']}
          </div>
          <div className="perShare">
            {lang.t('Denomination')}: {pageStore.currentDenominationFormat} IOTX
          </div>
          <div className="perShare">
            {lang.t('pool.size')}: {pageStore.currentPoolSizeFormat} IOTX
          </div>
          <div className="perShare">
            {lang.t('pool.numberofshare')}: {pageStore.currentNumberOfShare}
          </div>
          {pageStore.CurrentPool.deprecated && <div className="deprecated">{lang.t('pool.deprecated')}</div>}
        </div>
      </div>
      <div className={styles.buttonPanel.className}>{ActionButton}</div>
      {store.visible && (
        <ReadBeforeDeposit
          onClick={() => {
            store.visible = false;
            store.deposit();
          }}
          close={() => (store.visible = false)}
        />
      )}
    </div>
  );
});

const styles = {
  depositView: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '530',
    '@md': {
      minHeight: '390px'
    },
    a: {
      color: '$textPrimary',
    }
  }),
  token: css({
    marginTop: '1.2rem',
    marginLeft: '9vw',
    '@xs': {
      marginTop: '25px',
      marginLeft: '40px'
    },
    '.select': {
      border: '1px solid #45BCB8',
      color: 'white',
      background: 'transparent',
      height: '40px',
      width: '95%',
      appearance: 'none',
      fontSize: '18px',
      fontFamily: "'IBM Plex Mono', monospace",
      paddingLeft: '0.5rem'
    }
  }),
  amount: css({
    width: '95%',
    overflow: 'hidden',
    marginTop: '2rem',
    marginLeft: '7vw',
    marginBottom: '2rem',
    '@xs': {
      width: '94%',
      overflow: 'auto',
      marginLeft: '40px',
      paddingRight: '40px'
    },
    '.stepperTrack': {
      width: '100%',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#45bcb8',
      marginTop: '20px'
    }
  }),
  buttonPanel: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.8rem',
    marginTop: '2rem',
    paddingLeft: '8%',
    boxSizing: 'border-box',
    '.button': {
      width: '50%',
      height: '40px',
      lineHeight: '40px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#45BCB8',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#24928E'
      }
    }
  }),
  bottomTips: css({
    marginLeft: '10%',
    marginRight: '4vw',
    fontSize: '12px',
    padding: '0 0 0.3rem 3rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '@md': {
      marginLeft: '64px',
      marginRight: '28px',
      fontSize: '12px',
      paddingLeft: '40px',
      paddingBottom: '0.35rem',
      whiteSpace: 'nowrap'
    }
  }),
  poolInfos: css({
    '.address, .perShare, .deprecated': {
      wordBreak: 'break-all',
      width: '95%',
      marginTop: '0.7rem',
      fontSize: '12px',
      marginBottom: 0
    },
    '.perShare': {
      marginTop: '0.3rem'
    },
    '.deprecated': {
      color: 'red'
    }
  }),
  poolAudio: css({
    paddingRight: '5%',
    ul: {
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      padding: 0,
      margin: 0,
      li: {
        width: '100%',
        padding: '4px 0',
        border: '1px solid #45BCB8',
        textAlign: 'left',
        marginBottom: '8px',
        paddingLeft: '4px',
        fontSize: '0.875rem',
        cursor: 'pointer',
        '@md': {
          width: '48%'
        },
        '&:hover': {
          background: 'rgba(69, 188, 184, 0.35)'
        }
      },
      '.active': {
        fontWeight: 'bold',
        color: '#38DCD5',
        borderColor: '#45BCB8',
        background: 'rgba(69, 188, 184, 0.35)'
      }
    }
  }),
  logo: css({
    width: '24px',
    height: '24px'
  }),
};

export default DepositView;
