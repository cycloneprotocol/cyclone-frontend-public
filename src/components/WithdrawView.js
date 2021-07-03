import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import Config from '../Config';
import God from '../God';
import Button from './Button';
import { validateAddress } from 'iotex-antenna/lib/account/utils';
import { bytesToHex } from 'web3-utils';
import debounce from 'lodash.debounce';
import ModalView from './ModalView';
import Loading from './Loading';
import { css } from '../modules/index';

import { useStore } from '../store';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';

const Address = require('iotex-antenna/lib/crypto/address');

export const WithdrawView = observer((props) => {
  const { lang, base, iotex: pageStore } = useStore();

  const store = useLocalStore(() => ({
    address: '',
    isAddressValidate: false,
    note: '',
    noteData: null,
    noteTime: null,
    Subsequent: 0,
    cycToBurn: '0',
    iotexToBurn: '0',
    denomination: '0',
    poolFee: 0,
    poolBalance: 0,
    noteLeafIndex: -1,
    gasPrice: '1000000000000',
    gas: 1000000,
    theNoteInput: null,
    theAddressInput: null,
    poolId: 0,
    pool: {},
    cleanup() {
      store.theNoteInput.value = '';
      store.theAddressInput.value = '';
      store.ddress = '';
      store.isAddressValidate = false;
      store.note = '';
      store.noteData = null;
      store.noteTime = null;
      store.Subsequent = 0;
      store.noteLeafIndex = -1;
      store.gasPrice = '1000000000000';
      store.gas = 1000000;
    },
    onConnect() {
      props.onConnect();
    },

    async getDataWithNote(note) {
      const tempObject = God.parseNote(note);
      store.noteData = tempObject;

      // props.resizeAsBigger(store.isAddressValidate && tempObject && !tempObject.error)
      if (tempObject.error) {
        return;
      }

      const indexOfSet = God.getIndexOfSetByTokenName(tempObject.currency);
      store.poolId = tempObject.poolId;
      store.pool = Config.tokens[indexOfSet].amountSteps.find((i) => i.poolId == tempObject.poolId);

      const [theEvents, _apIncentiveRate, _buybackRate, denomination, numOfShares, maxNumOfShares] = await Promise.all([
        God.findOneLog(tempObject.deposit, store.pool.address),
        God.asyncGetCYCApIncentiveRate({ address: store.pool.address, abiUrl: store.pool.abi }),
        God.asyncGetCYCBuybackRate({ address: store.pool.address, abiUrl: store.pool.abi }),
        God.asyncGetWithdrawDenomination({ address: store.pool.address, abiUrl: store.pool.abi }),
        God.asyncGetNumOfShares({ address: store.pool.address, abiUrl: store.pool.abi }),
        God.asyncGetMaxNumOfShares({ address: store.pool.address, abiUrl: store.pool.abi }),
      ]);
      const a = God.calculateWithdrawA({ numOfShares: numOfShares - 1, maxNumOfShares });
      store.denomination = denomination;
      const apIncentiveRate = Number(_apIncentiveRate || 0) / 10000;
      const buybackRate = Number(_buybackRate || 0) / 10000;

      if (theEvents[0]) {
        store.noteTime = parseInt(theEvents[0].timestamp) * 1000;
        store.noteLeafIndex = parseInt(theEvents[0].leafIndex);
        store.Subsequent = theEvents[1].filter((e) => parseInt(e.timestamp) > parseInt(theEvents[0].timestamp)).length;
        // if (God.isConnect) {
        const burnAmount = new BigNumber(denomination).multipliedBy(buybackRate).multipliedBy(a).toFixed(0);
        console.log({ buybackRate, a, burnAmount });

        const toBurn = await God.asyncGetBurnWithinMimo(burnAmount);
        const rawUnit = new BigNumber(10).pow(Config.CYCToken.decimals);
        store.cycToBurn = !isNaN(toBurn) ? toBurn.dividedBy(rawUnit).toFixed(6).toString() : '0';
        store.iotexToBurn = new BigNumber(burnAmount).dividedBy(1e18).toFixed(6).toString() || '0';

        store.poolFee = new BigNumber(denomination).dividedBy(rawUnit).multipliedBy(apIncentiveRate).toFixed(4).toString();

        // const balanceString = await God.asyncGetBalanceByIndexOfLPToken(0);
        // const balanceString = await God.asyncGetIOTXBalance()
        //store.poolBalance = new BigNumber(balanceString).dividedBy(rawUnit).toFixed(4).toString()
        store.poolBalance = new BigNumber(store.denomination).dividedBy(rawUnit).minus(store.iotexToBurn).minus(store.poolFee).toFixed(4).toString();
        // }
      } else {
        store.noteData = { error: 1 };
      }
    },

    async withdraw() {
      const ethAddress = bytesToHex(Address.fromString(store.address).bytes());
      const indexOfSet = God.getIndexOfSetByTokenName(store.noteData.currency);
      props.withdrawStart(store.noteData.deposit, ethAddress, indexOfSet, store.poolId, store.noteData.amount, store.note);
    },
  }));

  const ActionButton = useObserver(() => {
    // if (!props.isAvaliable) {
    //   return <Button avaliable={true} label={lang.t('connect')} onClick={store.onConnect} />;
    // }
    if (pageStore.isPreloadFile) {
      return <Button label={lang.t('preparing.zksnark')} avaliable={false}></Button>;
    }

    return (
      <Button
        label={lang.t('WITHDRAW')}
        avaliable={store.note && store.noteData && !store.noteData.error && store.noteLeafIndex >= 0 && store.isAddressValidate ? true : false}
        onClick={store.withdraw}
      />
    );
  });
  // }, [props.isAvaliable, store.note, store.noteData, store.noteLeafIndex, store.isAddressValidate]);

  return (
    <div
      className={styles.withdraw.className}
      style={{
        height: store.note && store.noteData ? 'max-content' : '420px',
      }}
    >
      <div className={styles.note.className}>
        <div className="header">{lang.t('note')}</div>
        <div className="flex">
          <input
            ref={(node) => (store.theNoteInput = node)}
            className="input"
            type="text"
            onChange={debounce(() => {
              store.note = store.theNoteInput.value;
              store.noteData = null;
              store.noteTime = null;
              store.noteLeafIndex = -1;
              store.Subsequent = 0;

              store.getDataWithNote(store.theNoteInput.value);
            }, 3000)}
            style={{ borderColor: store.noteData && store.noteData.error ? 'red' : '#45bcb8' }}
            placeholder="Please enter your note"
          />
        </div>

        {store.note &&
          store.noteData &&
          (!store.noteData.error ? (
            store.noteLeafIndex >= 0 ? (
              <div style={{ marginTop: '0.5rem' }}>
                <div className="noteData">
                  <div>{lang.t('deposit.amount')}</div>
                  <div style={{ color: '#45BCB8' }}>
                    {new BigNumber(store.noteData.amount).dividedBy(Math.pow(10, 18)).toString()}&nbsp;
                    {store.noteData.currency}
                  </div>
                </div>

                <div className="noteData">
                  <div>{lang.t('withdraw.currentValue')}</div>
                  <div style={{ color: '#45BCB8' }}>
                    {new BigNumber(store.denomination).dividedBy(Math.pow(10, 18)).toString()} {store.noteData.currency}
                  </div>
                </div>

                <div className="noteData">
                  <div>{lang.t('time.passed')}</div>
                  <div style={{ color: '#E84D4D' }}>{base.timeAgo.format(new Date(store.noteTime))}</div>
                </div>

                <div className="noteData">
                  <div>{lang.t('subsequent.deposits')}</div>
                  <div style={{ color: '#45BCB8' }}>
                    {store.Subsequent}&nbsp;{lang.t('Deposits')}
                  </div>
                </div>

                <div className="noteData">
                  <div>{lang.t('cyc.to.burn')}</div>
                  <div style={{ color: '#45BCB8' }}>{store.cycToBurn}&nbsp;CYC</div>
                </div>
                <div className="noteData">
                  <div>{lang.t('iotex.used')}</div>
                  <div style={{ color: '#45BCB8' }}>({store.iotexToBurn}&nbsp;IOTX)</div>
                </div>

                <div className="noteData">
                  <div>{lang.t('pool.fee')}</div>
                  <div style={{ color: '#45BCB8' }}>{store.poolFee}&nbsp;IOTX</div>
                </div>

                <div className="noteData">
                  <div>{lang.t('balance.to.withdraw')}</div>
                  <div style={{ color: '#45BCB8' }}>{store.poolBalance}&nbsp;IOTX</div>
                </div>
              </div>
            ) : (
              <ModalView>
                <Loading text={lang.t('Loading.text8')} />
              </ModalView>
            )
          ) : (
            <div
              style={{
                marginTop: '0.5rem',
                fontSize: '12px',
                color: 'red',
              }}
            >
              {lang.t('invalid')}
            </div>
          ))}
      </div>

      <div className={styles.recipient.className}>
        <div className="header">{lang.t('recipient.address')}</div>
        <div className="recipient-tips">{lang.t('recipient.tips')}</div>
        <div className="flex">
          <input
            ref={(node) => (store.theAddressInput = node)}
            className="input"
            type="text"
            // value={store.address}
            onChange={debounce(() => {
              store.address = store.theAddressInput.value;

              if (store.theAddressInput.value.length < 41) {
                return;
              }

              const tempBool = validateAddress(store.theAddressInput.value);
              store.isAddressValidate = tempBool;

              //props.resizeAsBigger(tempBool && store.noteData && !store.noteData.error)
            }, 1500)}
            placeholder={lang.t('paste.address')}
          />
        </div>

        {/* {store.isAddressValidate && store.noteData && (
          <div style={{ marginTop: '0.5rem' }}>
            <div className="header">Total</div>
            <div style={{ marginTop: '0.5rem' }}>
              <div className="noteData">
                <div>{lang.t('gas.price')}</div>
                <div style={{ color: '#45BCB8' }}>
                  {new BigNumber(store.gasPrice).dividedBy(Math.pow(10, 18)).toString()}&nbsp;
                  {store.noteData.currency}
                </div>
              </div>
              <div className="noteData">
                <div>{lang.t('network.fee')}</div>
                <div style={{ color: '#45BCB8' }}>
                  {new BigNumber(store.gasPrice).multipliedBy(store.gas).dividedBy(Math.pow(10, 18)).toString()}
                  &nbsp;{store.noteData.currency}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      <div className={styles.buttonPanel.className}>{ActionButton}</div>

      <div
        style={{
          marginLeft: '64px',
          marginRight: '28px',
          fontSize: '12px',
          paddingLeft: '50px',
          paddingTop: '6px',
          paddingBottom: '6px',
        }}
      >
        &nbsp;
      </div>
    </div>
  );
});

const styles = {
  withdraw: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    '@md': {
      height: 'auto',
    },
  }),
  note: css({
    marginTop: '1rem',
    marginLeft: '8vw',
    marginBottom: '1.5rem',
    paddingRight: '40px',
    '@md': {
      marginTop: '25px',
      marginLeft: '40px',
    },
  }),
  recipient: css({
    marginLeft: '8vw',
    marginBottom: '2rem',
    paddingRight: '10vw',
    '@md': {
      marginLeft: '40px',
      paddingRight: '40px',
    },
    '.flex': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '.paste': {
        padding: '0 0.25rem',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '40px',
        color: '#fff',
        backgroundColor: 'rgb(69, 188, 184)',
      },
    },
    '.recipient-tips': {
      fontSize: 12,
      marginBottom: 8,
      color: 'red',
    },
  }),
  buttonPanel: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.28rem',
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
    },
  }),
};

export default WithdrawView;
