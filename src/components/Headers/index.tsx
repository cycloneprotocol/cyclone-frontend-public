import React from 'react';
import { css, global } from '../../modules/index';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';
import { Icon, Text, Section } from '../../modules/globalStyle';
import { Menu, Dropdown } from 'antd';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import { helper } from '../../utils/helper';
import { ChainNav } from '../ChainNav/index';

export const Headers = observer((props) => {
  const { lang, god } = useStore();
  const store = useLocalStore(() => ({
    isMouseOver: false,
    showConnecter() {
      god.setShowConnecter(true);
    },
    mouseOver(event) {
      this.isMouseOver = true;
    },
    mouseOut(event) {
      this.isMouseOver = false;
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
  }));

  const menus = (
    <Menu>
      <Menu.Item>
        <a href="https://docs.cyclone.xyz">{lang.t('Docs')}</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://github.com/cycloneprotocol/cyclone-contracts">Github</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://snapshot.org/#/realcycloneprotocol.eth">{lang.t('DAO')}</a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/analytics">{lang.t('StatsNav')}</Link>
      </Menu.Item>
      <Menu.Item>
        <Text size="small" color="yellow" weight="bold" family="Montserrat" cursor="pointer" onClick={store.showConnecter}>
          {lang.t('connect.wallet')}
        </Text>
      </Menu.Item>
    </Menu>
  );
  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return (
        <Text size="small" color="yellow" weight="bold" family="Montserrat" cursor="pointer" onClick={store.showConnecter}>
          {lang.t('connect.wallet')}
        </Text>
      );
    }
    return (
      <Text size="small" color="yellow" weight="bold" family="Montserrat" cursor="pointer" onClick={store.showWalletInfo}>
        {helper.string.truncate(god.currentNetwork.account, 12, "...")}
      </Text>
    );
  });

  return (
    <>
      <div className={styles.cycHeader.className}>
        <div className="cycHeader_l">
          <Link to="/">
            <img src="/images/home/logo.png" className="logo" alt="" />
          </Link>
          <ul>
            <li>
              <a href="https://docs.cyclone.xyz">{lang.t('Docs')}</a>
            </li>
            <li>
              <a href="https://github.com/cycloneprotocol/cyclone-contracts">Github</a>
            </li>
            <li>
              <a href="https://snapshot.org/#/realcycloneprotocol.eth">{lang.t('DAO')}</a>
            </li>
            <li>
              <Link to="/analytics">{lang.t('StatsNav')}</Link>
            </li>
          </ul>
        </div>
        <div className="cycHeader_r">
          {/* <Icon src="/images/home/icon_light.png" alt="" className="light"  /> */}
          <ChainNav />
          {accountView}
        </div>
        <div className={styles.menuMobile.className}>
          <Dropdown className="" overlay={menus} placement="bottomRight">
            <Icon src="/images/home/menu_icon.png" css={{ width: '1.4em', height: '1.3rem', padding: 0 }} alt=""></Icon>
          </Dropdown>
        </div>
      </div>
      <Section css={{ dispaly: 'block', '@md': { display: 'none' } }}>
        <ChainNav />
      </Section>
    </>
  );
});

const styles = {
  cycHeader: css({
    flexBetweenCenter: 'row',
    marginBottom: '2.5rem',
    fontFamily: 'Montserrat',
    '.ant-dropdown-menu': {
      backgroundColor: '$bg5 !important',
    },
    '.cycHeader_l': {
      display: 'flex',
      alignItems: 'center',

      '.logo': {
        height: '2.5rem',
        marginRight: '5rem',
      },
      ul: {
        display: 'none',
        '@md': {
          display: 'flex',
          alignItems: 'center',
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        },
        li: {
          display: 'flex',
          alignItems: 'center',
          marginRight: '2.375rem',
          a: {
            color: '$textPrimary',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              color: '$primary',
            },
          },
        },
      },
    },
    '.cycHeader_r': {
      display: 'none',
      '@md': {
        display: 'flex',
        alignItems: 'center',
        '.light': {
          width: '1.6rem',
          height: '1.6rem',
          marginRight: '2.5rem',
        },
      },
    },
  }),
  menuMobile: css({
    display: 'block',
    '@md': {
      display: 'none',
    },
    '.ant-dropdown-trigger': {
      px: 0,
    },
  }),
};

export default Headers;
