import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { css } from '../modules/index';
import { useStore } from '../store';
import { ModalView } from './ModalView';
import Button from './Button';

export const ReadBeforeDeposit = observer(props => {
  const { lang, iotex: pageStore } = useStore();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    pageStore.loadMintValue();
  }, []);

  return (
    <ModalView>
      <div className={styles.readBeforeDeposit.className}>
        <div className="header">
          <span>{lang.t('rbd.title')}</span>
          <img src="images/close_analysis.png" alt="" onClick={props.close} />
        </div>
        <section className="content">
          <ul>
            <li>{lang.t('rbd.deposit')}</li>
            <li>{lang.t('rbd.deposit.tips2', { amount: pageStore.currentDenominationFormat })}</li>
            <li>
              {lang.t('rbd.deposit.tips3', {
                amount: pageStore.currentMintCycValue,
                buybackRate: pageStore.currentBuyBackRate / 2
              })}
            </li>
            <li>{lang.t('rbd.deposit.tips4')}</li>
          </ul>
          <ul className="middle">
            <li>{lang.t('rbd.pool')}</li>
            <li>{lang.t('rbd.pool.tips1')}</li>
            <li>{lang.t('rbd.pool.tips2')}</li>
            <li>{lang.t('rbd.pool.tips3')}</li>
          </ul>
          <ul>
            <li>{lang.t('rbd.withdraw')}</li>
            <li>{lang.t('rbd.withdraw.tips1')}</li>
            <li>{lang.t('rbd.withdraw.tips2')}</li>
            <li>{lang.t('rbd.withdraw.tips3')}</li>
          </ul>
        </section>
        <div className="learnMore">
          {lang.t('rbd.learn.more')} <a href="https://docs.cyclone.xyz/cyc-token">{lang.t('rbd.learn.more.herf')}</a>
        </div>
        <div className="checkGroup">
          <img onClick={() => setStatus(!status)} src={status ? 'images/check.png' : 'images/uncheck.png'} alt="" />
          <span>{lang.t('rbd.check.txt')}</span>
        </div>
        <Button label={lang.t('Continue')} avaliable={status} onClick={props.onClick} />
      </div>
    </ModalView>
  );
});

const styles = {
  readBeforeDeposit: css({
    width: '100%',
    border: '1px solid #38DCD5',
    paddingBottom: '2rem',
    backgroundColor: '#000',
    '@md': {
      width: '80%'
    },
    '.header': {
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '1rem',
      paddingRight: '0.9rem',
      borderBottom: '1px solid #38DCD5',
      fontSize: '1rem',
      color: '#38DCD5',
      '@md': {
        fontSize: '1.125rem'
      },
      img: {
        width: 16,
        height: 16
      }
    },
    '.content': {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      padding: '0.8rem 1rem',
      flexDirection: 'column',
      '@md': {
        marginBottom: '2rem',
        flexDirection: 'row',
        padding: '24px 2rem'
      },
      ul: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        maxWidth: '90%',
        '@md': {
          maxWidth: '28%'
        },
        li: {
          fontSize: '0.8rem',
          marginBottom: '1rem',
          '@md': {
            fontSize: '1rem'
          },
          '&:last-child': {
            marginBottom: 0
          },
          '&:first-child': {
            fontWeight: 'bold',
            fontSize: '0.9rem',
            lineHeight: '22px',
            marginBottom: '1rem',
            '@md': {
              fontSize: '1.12rem'
            }
          }
        }
      },
      '.middle': {
        flex: 1,
        minWidth: '40%',
        padding: '1rem 0',
        margin: '1rem 0',
        boxSizing: 'border-box',
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '1px solid #38DCD5',
        borderTop: '1px solid #38DCD5',
        '@md': {
          padding: '0 2rem',
          margin: 0,
          borderTop: 0,
          borderBottom: 0,
          borderLeft: '1px solid #38DCD5',
          borderRight: '1px solid #38DCD5'
        }
      }
    },
    '.learnMore': {
      textAlign: 'center',
      fontSize: '0.875rem',
      marginBottom: '1.5rem',
      padding: '0 1rem',
      '@md': {
        fontSize: '1rem',
        marginBottom: '2rem'
      },
      a: {
        color: '#45BCB8 !important',
        textDecoration: 'underline'
      }
    },
    '.checkGroup': {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem',
      justifyContent: 'center',
      img: {
        width: 24,
        height: 24,
        marginRight: 11,
        cursor: 'pointer'
      }
    },
    '.button': {
      margin: 'auto'
    }
  })
};

export default ReadBeforeDeposit;
