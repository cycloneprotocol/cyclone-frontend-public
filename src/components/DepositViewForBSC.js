import React, { useEffect, useMemo } from 'react';
import Button from './Button';
import { Popover } from 'antd';
import { css } from '../modules/index';
import { useStore } from '../store';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import God from '../God';
import BigNumber from 'bignumber.js';
import EthereumConfig from '../EthereumConfig';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { eventBus } from '../lib/event';
import { SendActionRequest } from 'iotex-antenna/lib/rpc-method/types';
import CountUp from 'react-countup';
import { useWeb3React } from '@web3-react/core';
import { BigNumberState } from '../store/type';

let clipboardy = null;

export const DepositViewForBSC = observer(props => {
  const { lang, bsc: pageStore, base: baseStore } = useStore();
  const { activate, error, deactivate } = useWeb3React();
  const store = useLocalStore(() => ({
    tokens: null,
    // indexOfToken: 0,
    // indexOfAmountSet: 0,
    indexOfPool: 0,
    currentAmount: new BigNumberState({ loading: true }),
    currentCYCDenomination: new BigNumberState({ loading: true }),
    currentCoinDenomination: new BigNumberState({ loading: true }),
    poolSize: -1,
    anonymityFee: 0,

    async getAnonymityFee() {
      this.anonymityFee = await God.asyncCallEthereumContract(
        pageStore.CurrentSet.address,
        pageStore.CurrentSet.abi,
        'anonymityRate',
        true,
        null
      );
    },

    // get currentCYCDenominationLabel() {
    //   return '...';
    // },

    get xrcApproved() {
      return new BigNumber(pageStore.XRCAllowance).comparedTo(store.currentAmount.value) > 0;
    },

    get cycApproved() {
      return (
        new BigNumber(pageStore.CYCAllowance).comparedTo(store.currentCYCDenomination.value) > 0 &&
        store.currentCYCDenomination.value.comparedTo('0') > 0
      );
    },

    init(chainID) {
      console.log('EthereumConfig.tokensOnEthereum[chainID] =', EthereumConfig.tokensOnEthereum[chainID]);

      store.tokens = EthereumConfig.tokensOnEthereum[chainID].pools;
      console.log('store.tokens =', store.tokens);

      this.indexOfPool = parseInt(Object.keys(store.tokens)[0]);
      pageStore.currentSelectedAmount = this.indexOfPool;
      console.log('this.indexOfPool =', this.indexOfPool);
      this.loadAmount();
    },

    loadAmount() {
      if (pageStore.web3) {
        store.getCurrentAmount();
        store.getPoolSize();
        store.getAnonymityFee();
        store.getCurrentCYCDenomination();
        store.getCurrentCoinDenomination();
      }
      if (pageStore.account) {
        pageStore.getBalanceOfXRC();
        pageStore.getBNBtoBuyCYC();
        pageStore.getBalanceOfCoin();
      }
    },

    onSelectAmount(id) {
      pageStore.setCurrentSelectedAmount(id);
    },

    // onSelectToken(event) {
    //   const idx = event.target.value;
    //   store.indexOfToken = idx;
    //   props.onSelectToken(idx);
    // },

    onSelectPool(index) {
      const tempInt = index;
      store.indexOfPool = tempInt;
      this.onSelectAmount(tempInt);
      pageStore.setCurrentSelectedAmount(index);
      this.loadAmount();
    },

    onConnect() {
      if (props.onConnect) {
        props.onConnect();
      }
    },

    logout() {
      deactivate();
      pageStore.isConnect = false;
      pageStore.latestEthProvider.clear();
    },

    // onSelectPool(event) {
    //   const tempInt = event.target.value;
    //   store.indexOfPool = tempInt;
    //   props.onSelectAmount(tempInt);
    // },

    async onApproveXRC() {
      props.onApproveXRC(pageStore.CurrentSet.XRCToken.address, store.currentAmount.value);
    },

    onApproveCYC() {
      props.onApproveCYC(pageStore.CurrentNetwork.CYCToken.address, store.currentCYCDenomination.value);
    },

    async deposit() {
      // let set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
      let set = pageStore.CurrentSet;

      if (store.currentAmount.value.comparedTo(0) <= 0) {
        const abi = await God.asyncGetABI(set.abi);
        store.currentAmount.setValue(new BigNumber(await God.asyncGetDepositDenomination(set.address, abi)));
      }

      if (set.address) {
        props.onDeposit(
          set.address,
          store.currentAmount.value,
          store.currentCYCDenomination.value,
          pageStore.balanceOfCYC.value,
          store.currentCoinDenomination.value,
          set.id,
          pageStore.allowBuyCYC
        );
      }
    },

    async getCurrentAmount() {
      if (!store.tokens) {
        return;
      }

      //const set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
      const set = pageStore.CurrentSet;
      const abi = await God.asyncGetABI(set.abi);
      store.currentAmount.setValue(new BigNumber(await God.asyncGetDepositDenomination(set.address, abi)));
      store.currentAmount.setLoading(false);
    },

    async getCurrentCoinDenomination() {
      if (!store.tokens) {
        return;
      }

      const abi = await God.asyncGetABI(pageStore.CurrentSet.abi);
      const value = await God.asyncCallEthereumContract(
        pageStore.CurrentSet.address,
        abi,
        'coinDenomination',
        true,
        null
      );
      if (value !== 0) {
        store.currentCoinDenomination.setValue(new BigNumber(value));
      }
      store.currentCoinDenomination.setLoading(false);
    },

    async getCurrentCYCDenomination() {
      if (!store.tokens) {
        return;
      }

      // const set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
      const set = pageStore.CurrentSet;
      const abi = await God.asyncGetABI(set.abi);
      store.currentCYCDenomination.setValue(new BigNumber(await God.asyncGetCYCDenomination(set.address, abi)));
      store.currentCYCDenomination.setLoading(false);
    },

    async getPoolSize() {
      store.poolSize = -1;
      if (store.tokens) {
        //const pool = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
        const pool = pageStore.CurrentSet;
        store.poolSize = await God.asyncGetNumOfShares({
          address: pool.address,
          abiUrl: pool.abi
        });
      }
    },

    onClickCopyButton(event) {
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

    onChangeBuyCYCCheckBox(event) {
      pageStore.allowBuyCYC = event.target.checked && !event.target.disabled;
    },

    get allowDeposit() {
      const { currentAmount, currentCYCDenomination, currentCoinDenomination } = store;
      const { balanceOfXRC, balanceOfCYC, balanceOfCoin, allowBuyCYC, BNBtoBuyCYC } = pageStore;
      // insufficient asset balance
      if (currentAmount.value.comparedTo(0) > 0 && (!this.xrcApproved || balanceOfXRC.value.comparedTo(currentAmount.value) < 0)) {
        return false;
      }
      // insufficient coin balance
      if (balanceOfCoin.value.comparedTo(currentCoinDenomination.value) < 0) {
        return false;
      }
      // insufficient cyc balance
      if (currentCYCDenomination.value.comparedTo(0) > 0) {
        if (allowBuyCYC && balanceOfCoin.value.comparedTo(currentCoinDenomination.value.plus(BNBtoBuyCYC.value)) < 0) {
          return false;
        }
        if (!allowBuyCYC && (!this.cycApproved || balanceOfCYC.value.comparedTo(currentCYCDenomination.value) < 0)) {
          return false;
        }
      }
      return true;
    }
  }));

  const ActionButton = useObserver(() => {
    if (!props.isAvaliable) {
      return <Button avaliable={true} label={lang.t('connect')} onClick={store.onConnect} />;
    }
    return <Button label={lang.t('Deposit')} avaliable={store.allowDeposit} onClick={store.deposit} />;
  });

  useEffect(() => {
    console.log('props.chainID =', props.chainID);

    store.init(props.chainID);
  }, [props.chainID, pageStore.web3, pageStore.account]);
  useEffect(() => {
    console.log('timer', baseStore.refetchTimer);
    store.loadAmount();
  }, [baseStore.refetchTimer]);

  return (
    <div className={styles.depositView}>
      <div className={styles.token}>
        <div className="header">
          {lang.t('Pool')}
          <span className="tooltip" data-tip="pool-tips" data-for="pool-tips">
            i
          </span>
        </div>
        <ReactTooltip place="right" type="warning" id="pool-tips" effect="solid" backgroundColor="#45bcb8">
          <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>{lang.t('Pool.tips')}</div>
        </ReactTooltip>
        <div className={styles.poolAudio}>
          <ul>
            {store.tokens &&
              Object.values(store.tokens).map((item, index) => (
                <li
                  key={index}
                  data={index}
                  className={store.indexOfPool === item.id ? 'active' : ''}
                  onClick={debounce(() => {
                    store.onSelectPool(item.id);
                  }, 1000)}
                >
                  {item.set}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.poolInfos}>
          <div className="address">
            {/* {lang.t('Address')}: {store.tokens && store.tokens[store.indexOfToken].amountSteps[store.indexOfPool]['address']} */}
            {lang.t('version')}:{' '}
            <a href="https://github.com/cycloneprotocol/cyclone-contracts/tree/v2.0" target="_blank">
              2.0
            </a>
          </div>

          <div className="perShare">
            {lang.t('pool.size')}: {store.poolSize > -1 ? store.poolSize : '...'}
          </div>

          <div className="perShare">
            {lang.t('pool.contract')}:&nbsp;{God.shortenString(pageStore.CurrentSet.address, 8, 6)}
            <button className="imageButton" onClick={store.onClickCopyButton}>
              <img src="/images/copyicon.png" width="16px" height="16px" alt="" />
            </button>
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
              value={pageStore.CurrentSet.address}
            />
          </div>

          <div className="perShare">
            {lang.t('pool.fee')}: {store.anonymityFee / 100}% {lang.t('of.cyc.denomination')}
          </div>

          <div className="perShare">
            {lang.t('relayer.fee')}:
            {(pageStore.CurrentSet.relayerFee || EthereumConfig.relayerFee) / 100}% {lang.t('of.cyc.denomination')}
          </div>

          <div className="perShare">
            {lang.t('total.apy')}:&nbsp;
            <CountUp end={pageStore.curPoolApy} duration={2} decimals={2} preserveValue />%
          </div>

          {/* <div className="perShare">
            {lang.t('Denomination')}:{' '}
            {store.currentAmount > 0
              ? new BigNumber(store.currentAmount).dividedBy(new BigNumber(10).pow(18)).toFixed(4).toString()
              : '...'}&nbsp;{store.tokens ? store.tokens[store.indexOfToken].name : ""}
          </div>
          <div className="perShare">
            CYC Denomination:&nbsp;{store.currentCYCDenominationLabel}
          </div> */}

          <div
            style={{
              fontSize: '12px',
              marginTop: '1rem'
            }}
          >
            {store.currentAmount.value.comparedTo(0) <= 0 && (
              <>
                <div>
                  {lang.t('balance')}:&nbsp;
                  {pageStore.balanceOfCoin.getFormat({ decimals: pageStore.CurrentNetwork.coin.decimals })} BNB
                  {store.currentCoinDenomination.value.comparedTo(pageStore.balanceOfCoin.value) > 0 && (
                    <>
                      <Popover
                        placement="top"
                        trigger="click"
                        content={
                          <>
                            <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>
                              {lang.t('amount.invalid')}
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                maxWidth: '12rem',
                                pointerEvents: 'auto'
                              }}
                            ></div>
                          </>
                        }
                        backgroundColor="#45bcb8"
                      >
                        <img src="/images/alert.png" style={{ cursor: 'pointer' }} alt="" />
                      </Popover>
                    </>
                  )}
                </div>

                <div
                  className={styles.denomenation}
                  style={{
                    marginBottom: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '12px'
                    }}
                    className="input"
                  >
                    BNB&nbsp;{lang.t('Denomination')}:&nbsp;
                    {store.currentCoinDenomination.getFormat({
                    decimals: pageStore.CurrentNetwork.coin.decimals,
                    fixed: 8
                  })}
                  </div>
                </div>
              </>
            )}

            {pageStore.CurrentSet.XRCToken && store.currentAmount.value.comparedTo(0) > 0 && (
              <>
                <div>
                  {lang.t('balance')}:&nbsp;{pageStore.balanceOfXRC.format}&nbsp;{pageStore.CurrentSet.XRCToken.symbol}
                  {store.currentAmount.value.comparedTo(pageStore.balanceOfXRC.value) > 0 && (
                    <>
                      <Popover
                        placement="top"
                        trigger="click"
                        content={
                          <>
                            <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>
                              {lang.t('amount.invalid')}
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                maxWidth: '12rem',
                                pointerEvents: 'auto'
                              }}
                            ></div>
                          </>
                        }
                        backgroundColor="#45bcb8"
                      >
                        <img src="/images/alert.png" style={{ cursor: 'pointer' }} alt="" />
                      </Popover>
                    </>
                  )}
                </div>

                <div
                  className={styles.denomenation}
                  style={{
                    marginBottom: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '12px'
                    }}
                    className="input"
                  >
                    {pageStore.CurrentSet.XRCToken.symbol}&nbsp;{lang.t('Denomination')}:&nbsp;
                    {store.currentAmount.format}
                  </div>

                  <Button
                    avaliable={pageStore.isConnect && !store.xrcApproved}
                    label={lang.t('approve') + ' ' + pageStore.CurrentSet.XRCToken.symbol}
                    disabledLabel={lang.t('approved')}
                    disable={store.xrcApproved}
                    onClick={store.onApproveXRC}
                    fontSize="12px"
                  />
                </div>
              </>
            )}

            {store.currentCYCDenomination.value.comparedTo(0) > 0 && pageStore.account && (
              <>
                <div>
                  {lang.t('balance')}:&nbsp;
                  {pageStore.balanceOfCYC.format}
                  &nbsp;CYC&nbsp;
                  {store.currentCYCDenomination.value.comparedTo(pageStore.balanceOfCYC.value) > 0 ? (
                    <>
                      <Popover
                        placement="top"
                        trigger="click"
                        content={
                          <>
                            <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>
                              {lang.t('cyc.tips')}
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                maxWidth: '12rem',
                                pointerEvents: 'auto'
                              }}
                            >
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline'
                                }}
                                href={pageStore.CurrentNetwork.CYCToken.buy}
                              >
                                {lang.t('click.buy')}
                              </a>
                            </div>
                          </>
                        }
                        backgroundColor="#45bcb8"
                      >
                        <img src="/images/alert.png" style={{ cursor: 'pointer' }} alt="" />
                      </Popover>
                    </>
                  ) : null}
                </div>

                <div className={styles.denomenation}>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '12px'
                    }}
                    className="input"
                  >
                    {lang.t('cyc.denomenation')}:&nbsp;{store.currentCYCDenomination.format}
                  </div>

                  <Button
                    avaliable={
                      pageStore.isConnect &&
                      !store.cycApproved &&
                      new BigNumber(pageStore.balanceOfCYC.value).comparedTo('0') &&
                      store.currentCYCDenomination.value.comparedTo(0) > 0
                    }
                    label={lang.t('approve') + ' CYC'}
                    disabledLabel={lang.t('approved')}
                    disable={store.cycApproved}
                    onClick={store.onApproveCYC}
                    fontSize="12px"
                  />
                </div>

                {pageStore.balanceOfCYC.value.comparedTo(store.currentCYCDenomination.value) < 0 && pageStore.account && (
                  <div
                    className="flex item-center"
                    style={{
                      textAlign: 'center',
                      marginTop: '0.5rem'
                    }}
                  >
                    <input
                      disabled={
                        pageStore.balanceOfCoin.value.comparedTo(
                          store.currentCoinDenomination.value.plus(pageStore.BNBtoBuyCYC.value)
                        ) < 0
                      }
                      id="check"
                      type="checkbox"
                      style={{ verticalAlign: 'middle' }}
                      onChange={store.onChangeBuyCYCCheckBox}
                    />
                    <label htmlFor="check" style={{ marginLeft: 10, verticalAlign: 'middle' }}>
                      {lang.t('use.coin.to.buy.cyc', {
                        amount: pageStore.BNBtoBuyCYC.format,
                        symbol: pageStore.CurrentNetwork.coin.symbol
                      })}
                    </label>
                  </div>
                )}
              </>
            )}

            {store.currentAmount.value.comparedTo(0) > 0 && (
              <>
                <div style={{ marginTop: '0.5rem' }}>
                  {lang.t('balance')}:&nbsp;
                  {pageStore.balanceOfCoin.getFormat({ decimals: pageStore.CurrentNetwork.coin.decimals })} BNB
                  {store.currentCoinDenomination.value.comparedTo(pageStore.balanceOfCoin.value) > 0 ? (
                    <>
                      <Popover
                        placement="top"
                        trigger="click"
                        content={
                          <>
                            <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>
                              {lang.t('amount.invalid')}
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                maxWidth: '12rem',
                                pointerEvents: 'auto'
                              }}
                            ></div>
                          </>
                        }
                        backgroundColor="#45bcb8"
                      >
                        <img src="/images/alert.png" style={{ cursor: 'pointer' }} alt="" />
                      </Popover>
                    </>
                  ) : null}
                </div>

                <div
                  className={styles.denomenation}
                  style={{
                    marginBottom: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '12px'
                    }}
                    className="input"
                  >
                    BNB&nbsp;{lang.t('Denomination')}:&nbsp;
                    {store.currentCoinDenomination.getFormat({ decimals: pageStore.CurrentNetwork.coin.decimals })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.buttonPanel}>{ActionButton}</div>
      {pageStore.isConnect && (
        <div className={styles.loginOut}>
          <span onClick={store.logout}>{lang.t('LOGOUT')}</span>
        </div>
      )}
      <p />
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
    }
  }),
  token: css({
    marginTop: '1.2rem',
    marginLeft: '7vw',
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
    marginBottom: '1rem',
    marginTop: '2.5rem',
    paddingLeft: '8%',
    boxSizing: 'border-box',
    '@md': {
      marginBottom: '2rem'
    },
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
    '.address, .perShare': {
      wordBreak: 'break-all',
      width: '95%',
      marginTop: '0.7rem',
      fontSize: '12px',
      marginBottom: 0
    },
    '.perShare': {
      marginTop: '0.3rem'
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
  denomenation: css({
    width: '95%',
    rowGap: '0.5rem',
    flexBetweenCenter: 'column',
    '.input': {
      marginBottom: '8px'
    },
    '.button': {
      width: '100%'
    },
    '.buttonDisable': {
      width: '100%'
    },
    '@xs': {
      columnGap: '1rem',
      flexBetweenCenter: 'row',
      '.input': {
        marginBottom: 0
      },
      '.button': {
        width: 'max-content'
      },
      '.buttonDisable': {
        width: 'max-content'
      }
    },
    '@md': {
      '.input': {
        marginBottom: 0
      }
    }
  }),
  approveBtn: css({
    padding: '0 10px',
    width: '100%',
    height: '34px',
    outline: 'none',
    border: '1px solid #45BCB8',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    backgroundColor: '#45BCB8',
    '@xs': {
      height: '40px',
      maxWidth: '152px'
    },
    '@md': {
      maxWidth: '90px',
      fontSize: '12px'
    },
    xl: {
      maxWidth: '152px',
      fontSize: '1rem'
    },
    '&:disabled': {
      backgroundColor: 'black'
    }
  }),
  loginOut: css({
    flexCenterCenter: 'row',
    paddingLeft: '8%',
    marginBottom: '2rem',
    '@md': {
      marginBottom: '3rem'
    },
    span: {
      textDecoration: 'underline',
      fontSize: '1',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  })
};

export default DepositViewForBSC;
