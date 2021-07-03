import React, { useEffect } from 'react';
import Config from '../Config';
import { css } from '../modules/index';
import CN from '../../public/images/CN.png';
import RU from '../../public/images/RU.png';
import EN from '../../public/images/EN.png';
import { useStore } from '../store';
import { Link, useHistory } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import God from '../God';
import CountUp from 'react-countup';
import {metamaskUtils} from '../utils/metamaskUtils';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

const langGroups = {
  en: { name: 'EN', src: EN, text: 'en' },
  ru: { name: 'RU', src: RU, text: 'ru' },
  zh_CN: { name: 'CN', src: CN, text: 'zh_CN' }
};

let clipboardy = null;

export const Footer = observer(props => {
  const history = useHistory()
  const { lang, iotex: pageStore, base: baseStore } = useStore();
  const store = useLocalStore(() => ({
    get curLang() {
      if (!langGroups[lang.lang]) return langGroups.en;
      return langGroups[lang.lang];
    },
    onClickCopyButton() {
      // clipboardy = history.location.pathname === '/bsc' ? Config.CYCToken.bsc_address : Config.CYCToken.address
      if (clipboardy) {
        clipboardy.focus();
        clipboardy.select();
        const result = document.execCommand('copy');
        if (result === 'unsuccessful') {
          clipboardy.blur();
        } else {
          clipboardy.blur();
          toast.dark(lang.t('address.copied'), {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          });
        }
      }
    },
  }));

  useEffect(() => {
    God.getAntena();
    // pageStore.loadCycPrice();
  }, [pageStore.isConnect]);

  return (
    <div
      className={`${styles.footer.className} cyclone-footer`}
      style={{ justifyContent: props.hide ? 'flex-end' : 'space-between' }}
    >
      <ul className="icon-list">
        <li>
          <Link to="/analytics">
            <img src="images/analysis.png" className="logo" alt="" />
          </Link>
        </li>
        <li>
          <a href="https://twitter.com/cycloneprotocol" target="_blank" rel="noopener noreferrer">
            <img src="images/twitter.png" className="logo" alt="" />
          </a>
        </li>
        <li>
          <a href="https://t.me/cycloneprotocol" target="_blank" rel="noopener noreferrer">
            <img src="images/tele.png" className="logo" alt="" />
          </a>
        </li>
        <li>
          <a href="https://github.com/cycloneprotocol" target="_blank" rel="noopener noreferrer">
            <img src="images/github.png" className="logo" alt="" />
          </a>
        </li>
        <li>
          <div className="line"></div>
        </li>
        <li>
          <div className={styles.langSelect.className}>
            <div className={styles.langList.className}>
              <ul>
                {Object.values(langGroups).map(item => {
                  return (
                    <li
                      className={item.text === lang.lang ? 'active' : ''}
                      key={item.name}
                      onClick={() => lang.setLang(item.text)}
                    >
                      <img src={item.src} alt="" />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <img className="cityIcon" src={store.curLang.src} alt="" />
          </div>
        </li>
      </ul>
      {!props.hide && (
        <div className={styles.infos.className}>
          <input
            ref={node => (clipboardy = node)}
            style={{
              width: '1px',
              height: '1px',
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              fontSize: '3px'
            }}
            defaultValue={history.location.pathname === '/bsc' ? Config.CYCToken.bsc_address : Config.CYCToken.address}
          />
          <div>
            {lang.t('cyc.token.contract')}:
            {history.location.pathname === '/bsc' ? <>
              <a target="_blank" href={'https://bscscan.com/address/' + Config.CYCToken.bsc_address}>
                {Config.CYCToken.bsc_address}
              </a>
              <img style={{ width: 18, marginLeft: '10px', cursor: 'pointer' }} onClick={store.onClickCopyButton} src="images/copyicon.png" alt="" />
              <a onClick={() => metamaskUtils.registerToken(
                Config.CYCToken.bsc_address,
                Config.CYCToken.tokenName,
                Config.CYCToken.decimals,
                Config.baseURL + '/images/logo.svg')}>
                <img style={{ width: 20, height: 20, marginLeft: '10px' }} src="images/metastack_icon.png" data-tip="metamask-tip" data-for="metamask-tip" alt="add-to-metamask" />
              </a>
              <ReactTooltip id="metamask-tip" place="top" type="warning" effect="solid" backgroundColor="#45bcb8">
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {lang.t('add.to.metamask')}
                </div>
              </ReactTooltip>

            </> : <>
              <a target="_blank" href={'https://iotexscan.io/token/' + Config.CYCToken.address}>
                {Config.CYCToken.address}
              </a>
              <img style={{ width: 18, marginLeft: '10px', cursor: 'pointer' }} onClick={store.onClickCopyButton} src="images/copyicon.png" alt="" />
            </>
            }
          </div>
          <div>
            {lang.t('token.price')}:{' '}
            <a target="_blank" href={history.location.pathname === '/bsc' ? 'https://www.coingecko.com/en/coins/cyclone-protocol' : 'https://info.mimo.exchange/'}>
              $<CountUp end={baseStore.cycPrice} duration={3} decimals={6} preserveValue />
            </a>
            {history.location.pathname === '/bsc' &&
              <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x810ee35443639348adbbc467b33310d2ab43c168" target="_blank">
                <img style={{ width: 20, height: 20, marginLeft: '10px' }} src="images/pancake.png" data-tip="pancake-tip" data-for="pancake-tip" alt="add-to-pancake" />
              </a>}
          </div>
          <ReactTooltip id="pancake-tip" place="top" type="warning" effect="solid" backgroundColor="#45bcb8">
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {lang.t('add.to.pancake')}
            </div>
          </ReactTooltip>
        </div>
      )}
    </div>
  );
});

const styles = {
  footer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    '@md': {
      width: '100%',
      margin: '4rem auto 0',
      flexDirection: 'row',
      paddingBottom: '5vh'
    },
    '.icon-list': {
      display: 'flex',
      alignItems: 'flex-end',
      listStyleType: 'none',
      padding: 0,
      margin: '0 0 1rem 0',
      '@md': {
        marginBottom: 0
      },
      li: {
        marginRight: 8,
        cursor: 'pointer',
        '&:last-child': {
          marginRight: 0
        },
        '.line': {
          height: '1.5rem',
          width: '1px',
          backgroundColor: '#45BCB8',
          marginLeft: 5,
          marginRight: 5
        },
        img: {
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '50%'
        }
      }
    }
  }),
  infos: css({
    color: '#45BCB8 !important',
    width: '100%',
    marginBottom: '2rem',
    textAlign: 'center',
    '@md': {
      width: 'max-content',
      marginBottom: '0',
      textAlign: 'right'
    },
    div: {
      a: {
        color: '#45BCB8 !important',
        paddingBottom: 2,
        textDecoration: 'underline'
      }
    }
  }),
  langSelect: css({
    position: 'relative',
    '.cityIcon': {
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '50%',
      cursor: 'pointer'
    },
    ul: {
      listStyleType: 'none',
      border: '1px solid #45BCB8',
      width: '64px',
      textAlign: 'left',
      padding: 0,
      margin: 0,
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
        img: {
          width: '22px',
          height: '22px',
          marginRight: '7px'
        },
        '&:hover': {
          backgroundColor: '#45BCB8',
          color: '#000'
        }
      },
      '.active': {
        background: '#45BCB8',
        color: '#000'
      }
    }
  }),
  langList: css({
    position: 'absolute',
    top: 0,
    right: '0',
    paddingBottom: '26px',
    width: '64px',
    height: '1.5rem',
    '&:hover': {
      height: 140,
      top: '-112px',
      ul: {
        display: 'block',
        backgroundColor: '#000'
      }
    }
  })
};

export default Footer;
