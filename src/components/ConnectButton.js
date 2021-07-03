import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { css } from '../modules/index';
import { useStore } from '../store';

export const ConnectButton = observer((props) => {
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
  return (
    <div
      className={styles.connectButtonText.className}
      onMouseOver={store.mouseOver}
      onMouseOut={store.mouseOut}
      onClick={props.onClick}
    >
      <div className={lang.lang === 'ru' ? 'minNav' : ''}>{props.isConnect ? lang.t('logout') : lang.t('connect')}</div>
    </div>
  );
});

const styles = {
  connectButtonText: css({
    fontSize: '1rem',
    textAlign: 'center',
    border: '0.06rem solid #45BCB8',
    padding: '0.3rem 0',
    marginTop: '1.5rem',
    cursor: 'pointer',
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
    xl: {
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
};

export default ConnectButton;
