import React, { useEffect } from "react";
import { useStore } from '../store';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { css } from '../modules/index'



export const Chain = observer(() => {
  const { lang } = useStore();
  const history = useHistory()
  const store = useLocalStore(() => ({
    chains: [
      {
        name: 'IoTeX',
        logo: '/images/iotex-logo.svg',
        path: '/iotx-v1'
      },
      {
        name: 'Binance Smart Chain',
        logo: '/images/binance-logo.svg',
        path: '/bsc'
      }
    ],
  }))
  return (
    <div className={styles.token.className}>
      <div className="header">{lang.t('chain')}</div>
      <div className={styles.poolAudio.className}>
        <ul>
          {store.chains &&
            store.chains.map((item, index) => (
              <li
                key={index}
                data={index}
                className={history.location.pathname === item.path ? 'active' : ''}
                style={{ fontSize: '12px' }}
              >
                <Link to={item.path}>
                  <img src={item.logo} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
})

const styles = {
  token: css({
    marginTop: '1.2rem',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: '459px',
    '@xs': {
      marginTop: '25px',
      marginBottom: '25px'
    },
    '@md': {
      width: '45%',
    }
  }),
  poolAudio: css({
    '@md': {
      paddingRight: '2%'
    },
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
        marginBottom: '1rem',
        paddingLeft: '4px',
        fontSize: '0.875rem',
        cursor: 'pointer',
        '@md': {
          width: '48%',
          marginBottom: 0
        },
        '&:hover': {
          background: 'rgba(69, 188, 184, 0.35)'
        },
        a: {
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
          img: {
            marginRight: '10px'
          }
        },
      },
      '.active': {
        fontWeight: 'bold',
        color: '#38DCD5',
        borderColor: '#45BCB8',
        background: 'rgba(69, 188, 184, 0.35)'
      }
    }
  }),
}