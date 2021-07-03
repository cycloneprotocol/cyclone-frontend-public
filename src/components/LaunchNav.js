import React from 'react';
import TextButton from './TextButton';
import { css } from '../modules/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

export const LaunchNav = observer((props) => {
  const { lang } = useStore();

  const menus = (
    <ul>
      <li>
        <a href="https://t.me/cycloneprotocol">{lang.t('Community')}</a>
      </li>
      <li>
        <a href="https://github.com/cycloneprotocol/cyclone-contracts">{lang.t('Github')}</a>
      </li>
      <li>
        <a href="https://docs.cyclone.xyz">{lang.t('Docs')}</a>
      </li>
      <li>
        <a href="https://snapshot.org/#/realcycloneprotocol.eth">{lang.t("DAO")}</a>
      </li>
      <li>
        <Link to="/analytics">{lang.t('StatsNav')}</Link>
      </li>
    </ul>
  )

  return (
    <div className={styles.launchNav.className}>
      <div className={styles.launchNavLeft.className}>
        <div className={styles.launchTop.className}>
          <img src="/images/home/logo.png" className="logo" alt="" />
        </div>
        <div className={styles.menuBig.className}>
          {menus}
        </div>
      </div>
      <article className={styles.mobileNav.className}>
        <div className={styles.mobileNavBox.className}>
          <img className="cityIcon" src="images/mobile_nav.png" alt="" />
          <div className={styles.mobileNavList.className}>
            {menus}
          </div>
        </div>
      </article>
    </div>
  );
});
const styles = {
  launchNav: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }),
  launchNavLeft: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@md': {
      justifyContent: 'flex-start'
    },
    '.logo': {
      height: '2.56rem',
      '@md': {
        height: '2.5rem',
        marginRight: '5rem',
      },
    },
  }),
  menuBig: css({
    display: 'none',
    '@md': {
      display: 'block'
    },
    ul: {
      width: '100vw',
      display: 'flex',
      listStyleType: 'none',
      alignItems: 'center',
      margin: '0 -1rem',
      padding: '0 0 10px 1.2rem',
      borderBottom: '1px solid #45BCB8',
      '@md': {
        width: 'max-content',
        margin: 0,
        padding: 0,
        borderBottom: 0
      },
      li: {
        cursor: 'pointer',
        paddingRight: '10%',
        '@md': {
          width: 'max-content',
          marginRight: '2rem',
          paddingRight: 0,
        },
        '@lg': {
          marginRight: '2rem',
        },
        '@xl': {
          marginRight: '3rem',
        },
        '@xxl': {
          marginRight: '4rem',
        },

        a: {
          cursor: 'pointer',
          width: '100%',
          marginRight: 0,
          textAlign: 'center',
          fontFamily: 'Montserrat',
          color: '#fff',
          fontWeight: 600,
          '&:hover': {
            color: '$brandCD5',
          },
          '@md': {
            width: 'max-content',
            display: 'block',
            fontSize: '0.875rem',
          },
          '@lg': {
            fontSize: '0.9rem',
          },
          '@xl': {
            fontSize: '1.125rem',
          },
        },
      },

    },

  }),
  mobileNav: css({
    display: 'block',
    '@md': {
      display: 'none',
    },
  }),
  menuMobileIcon: css({
    width: '1.8rem',
  }),
  launchTop: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  launchBtnMobile: css({
    display: 'block',
    width: "100px",
    height: '1.8rem',
    lineHeight: '1.8rem',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    a: {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: '#45BCB8',
      "&:hover": {
        color: '#ffff !important',
        backgroundColor: '#24928E',
      }
    },
    '@md': {
      display: 'none'
    }
  }),
  mobileNavBox: css({
    position: 'relative',
    '.cityIcon': {
      width: '28px',
      height: '20px',
      cursor: 'pointer'
    },
    ul: {
      listStyleType: 'none',
      border: '1px solid #45BCB8',
      width: '100px',
      textAlign: 'left',
      padding: 0,
      margin: 0,
      backgroundColor: '#000',
      display: 'none',
      li: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '6px 10px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#fff',
        a: {
          color: '#fff !important',
          display: 'block',
          width: '100%',
          height: '100%',
          fontSize: '12px',
        },
        '&:hover': {
          backgroundColor: 'rgb(56, 220, 213)',
          color: '#000'
        }
      },
      '.active': {
        background: 'rgb(56, 220, 213)',
        color: '#000'
      }
    }
  }),
  mobileNavList: css({
    position: 'absolute',
    top: '0',
    right: '0',
    paddingTop: '30px',
    width: '100px',
    height: '1.5rem',
    '&:hover': {
      height: 140,
      top: '0',
      ul: {
        display: 'block',
        backgroundColor: '#000'
      }
    }
  })
};

export default LaunchNav;
