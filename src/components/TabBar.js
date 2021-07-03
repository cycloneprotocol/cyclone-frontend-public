import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { css } from '../modules/index';
import { useStore } from '../store';

export const TabBar = observer((props) => {
  const { lang, base } = useStore();
  const store = useLocalStore(() => ({
    tabs: ['Deposit', 'Withdraw'],
    selected: base.tempIndex !== undefined ? base.tempIndex : 0,

    onClickTabItem(event) {
      const tempIndex = parseInt(event.target.id);
      window.localStorage.setItem('tempIndex', tempIndex);
      store.selected = tempIndex;
      props.onChange(tempIndex);
    },
  }));
  return (
    <div className={styles.tabBarItems.className}>
      {store.tabs.map((item, index) => (
        <div className={styles.tabBarItem.className} key={index}>
          {store.selected === index && store.selected === 0 && <div className="tabBarItemLeft"></div>}

          {store.selected === index && store.selected === 1 && (
            <div
              style={{
                position: 'relative',
                right: '5%',
              }}
            >
              <div className="tabBarItemRight"></div>
            </div>
          )}

          <div
            id={index}
            onClick={store.onClickTabItem}
            className={styles.tabBarItemLabel.className}
            style={{ fontWeight: store.selected === index ? 700 : 'normal' }}
          >
            {lang.t(item)}
          </div>
        </div>
      ))}
    </div>
  );
});

const styles = {
  tabBarItems: css({
    display: 'flex',
    width: '100%',
    height: '40px',
    borderBottom: '2px solid #45BCB8',
    cursor: 'pointer',
    position: 'relative',
  }),
  tabBarItem: css({
    position: 'relative',
    width: '50%',
    '.tabBarItemLeft': {
      width: '105%',
      height: '40px',
      backgroundImage: "url('/images/rectangle_l.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      "&:hover": {
        backgroundImage: "url('/images/rectangle_l_hover.png')",
      },
      '@md': {
        height: '40px',
      },
    },
    '.tabBarItemRight': {
      width: '105%',
      height: '40px',
      backgroundImage: "url('/images/rectangle_r.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      "&:hover": {
        backgroundImage: "url('/images/rectangle_r_hover.png')",
      },
      '@md': {
        height: '40px',
      },
    },
  }),
  tabBarItemLabel: css({
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '40px',
    lineHeight: '40px',
    fontSize: '1.1rem',
    textAlign: 'center',
    '@md': {
      height: '40px',
      lineHeight: '40px',
    },
  }),
};

export default TabBar;
