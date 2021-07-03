import React from 'react';
import TextButton from './TextButton';
import { Menu, Dropdown, Button } from 'antd';
import { css } from '../modules/index';
import { FlexBox } from '../modules/globalStyle';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

export const NavigatorBar = observer((props) => {
  const { lang } = useStore();
  const store = useLocalStore(() => ({
    isMouseOver: false,
    mouseOver(event) {
      this.isMouseOver = true;
    },
    mouseOut(event) {
      this.isMouseOver = false;
    },
  }));

  const menu = (
    <Menu>
      <Menu.Item>
        <TextButton onClick={props.navigateToLiquidty} text={lang.t('Mining')} />
      </Menu.Item>
      <Menu.Item>
        <TextButton text={lang.t('Docs')} url="https://docs.cyclone.xyz" />
      </Menu.Item>
      <Menu.Item>
        <TextButton text={lang.t("DAO")} url="https://snapshot.org/#/realcycloneprotocol.eth" />
      </Menu.Item>
      <Menu.Item>
        <TextButton text="Github" url="https://github.com/cycloneprotocol/cyclone-contracts" />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navigatorBar.className}>
      <FlexBox justify="between" css={{ mb: '2rem', '@md': { mb: 0 } }}>
        <Link to="/">
          <img src="images/logo.png" className="logo" alt="" />
        </Link>
        <div className={styles.menuMobile.className}>
          <Dropdown className="" overlay={menu} placement="bottomLeft">
            <Button
              type="text"
              icon={<img src={'/images/menu_icon.png'} className={styles.menuMobileIcon.className} alt="Drop Icon" />}
            ></Button>
          </Dropdown>
        </div>
      </FlexBox>
      <div className={styles.menuBig.className}>
        <ul>
          <li className={lang.lang === 'ru' ? 'minDocs' : ''}>
            <div className={styles.apy.className}>APY:{props.apy}%</div>
            <TextButton onClick={props.navigateToLiquidty} text={lang.t('Mining')} />
          </li>
          <li className={lang.lang === 'ru' ? 'minDocs' : ''}>
            <TextButton text={lang.t('Docs')} url="https://docs.cyclone.xyz" />
          </li>
          <li>
            <TextButton text="Github" url="https://github.com/cycloneprotocol/cyclone-contracts" />
          </li>
          <li>
            <TextButton text={lang.t("DAO")} url="https://snapshot.org/#/realcycloneprotocol.eth" />
          </li>
          <li>
            <Link to="/analytics">{lang.t('StatsNav')}</Link>
          </li>
        </ul>
      </div>

    </div>
  );
});
const styles = {
  navigatorBar: css({
    width: '100%',
    '@md': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'max-content',
      flex: '1',
      justifyContent: 'space-around',
    },
    '.logo': {
      width: '8rem',
      '@md': {
        width: '5rem',
      },
      '@lg': {
        width: '6rem',
      },
      '@xl': {
        width: '8rem',
      },
    },
  }),
  menuBig: css({
    ul: {
      display: 'flex',
      listStyleType: 'none',
      alignItems: 'center',
      margin: '0 -1rem',
      padding: '0 0 10px 0',
      borderBottom: '1px solid #45BCB8',
      '@md': {
        margin: 0,
        padding: 0,
        marginLeft: '0.6rem',
        borderBottom: 0
      },
      '@xl': {
        marginLeft: '0.9rem',
      },
      '@xxl': {
        marginLeft: '1.1rem',
      },
      li: {
        cursor: 'pointer',
        width: '25%',
        flex: 'none',
        textAlign: 'center',
        position: "relative",
        '@md': {
          marginRight: '1rem',
          width: 'max-content',
          marginRight: '0.7rem',
        },
        '@lg': {
          marginRight: '0.8rem',
        },
        '@xl': {
          marginRight: '0.9rem',
        },
        '@xxl': {
          marginRight: '1.1rem',
        },
        '&:hover': {
          color: '#38DCD5',
        },
      },
      ".minDocs": {
        a: {
          '@md': {
            maxWidth: "60px",
            textOverflow: "ellipsis",
            overflowX: "hidden"
          }
        }
      },
      a: {
        cursor: 'pointer',
        width: '100%',
        marginRight: 0,
        textAlign: 'center',
        color: '#fff',
        '&:hover': {
          color: '$primary'
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
          fontSize: '1.1rem',
        },
        '@xxl': {
          fontSize: '1.1rem',
        },
      },
    },

  }),
  drowMenus: css({
    height: '100%',
    fontSize: '1rem',
    '@md': {
      fontSize: '0.875rem',
    },
    '@lg': {
      fontSize: '1rem',
    },
  }),
  dropText: css({
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#fff',
    height: '100%',
  }),
  menuMobile: css({
    display: 'block',
    '@md': {
      display: 'none',
    },
  }),
  menuMobileIcon: css({
    width: '1.8rem',
  }),
  connectButtonText: css({
    fontSize: '1rem',
    textAlign: 'center',
    '@md': {
      border: 'none',
      padding: 0,
      marginTop: 0,
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      '&:hover': {
        color: '#38DCD5',
      },
    },
    '@lg': {
      fontSize: '0.9rem',
    },
    '@xl': {
      fontSize: '1.125rem',
    },
    '@xxl': {
      fontSize: '1.2rem',
    },
    ".minNav": {
      '@md': {
        maxWidth: 75,
        overflowX: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  }),
  apy: css({
    position: "absolute",
    fontSize: '12px',
    backgroundColor: 'rgba(69, 188, 184, 0.2)',
    borderRadius: '4px',
    padding: '1px 10px',
    top: '-16px',
    color: 'rgb(69, 188, 184)'
  }),
};

export default NavigatorBar;
