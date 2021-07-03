import BigNumber from 'bignumber.js';
import React from 'react';
import Utility from '../Utility';
import { toast } from 'react-toastify';
import TextButton from './TextButton';
import { useStore } from '../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import God from '../God';
import ReactTooltip from 'react-tooltip';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import EthereumConfig from '../EthereumConfig';
let clipboardy = null;

export const TransactionRecord = observer(props => {
  const { lang, base, bsc: BSCPageStore } = useStore();
  const store = useLocalStore(
    props => ({
      formatAmount(str) {
        return new BigNumber(str)
          .dividedBy(Math.pow(10, 18))
          .toFixed(6)
          .toString();
      },

      onClickRemoveButton(event) {
        props.removeTransactionRecord(event.currentTarget.id);
      },

      onClickCopyButton(event) {
        if (clipboardy) {
          clipboardy.value = props.data[event.currentTarget.id].note;
          clipboardy.focus();
          clipboardy.select();
          const result = document.execCommand('copy');
          if (result === 'unsuccessful') {
            console.error(lang.t('check.note.fail'));
          } else {
            toast.dark(lang.t('check.note.copied'), {
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

      showStatus(idOfStatus) {
        switch (idOfStatus) {
          case 0:
            return lang.t('waiting.for.receipt');

          case 1:
            return lang.t('Deposited');

          case 2:
            return lang.t('Sending');

          case 3:
            return lang.t('Spent');
        }
      },
      sortByTime() {
        props.sortTransactionByField(0);
      },

      sortByAmount() {
        props.sortTransactionByField(1);
      },

      sortBySubsequentDeposites() {
        props.sortTransactionByField(2);
      },

      sortByStatus() {
        props.sortTransactionByField(4);
      }
    }),
    props
  );
  return (
    <>
      {props.data && props.data.length > 0 && (
        <div className="borderedView" style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
          <div className="table">
            <div className="th">
              <div className="td">
                <TextButton small={true} onClick={store.sortByTime} text="Time Passed" />
              </div>

              {God.isBSC && <div className="td">{lang.t('Pool')}</div>}

              <div className="td">
                {God.isBSC ? (
                  <span>{lang.t('Deposit')}</span>
                ) : (
                  <TextButton small={true} onClick={store.sortByAmount} text="Amount" />
                )}
              </div>

              {!God.isBSC ? (
                <div className="td">
                  <TextButton small={true} onClick={store.sortBySubsequentDeposites} text="Subsequent Deposits" />
                </div>
              ) : null}

              <div className="td">{lang.t('tx.hash')}</div>
              <div className="td" style={{ display: 'flex', alignItems: 'center' }}>
                <InfoCircleOutlined data-tip="status-tips" data-for="status-tips" style={{ marginRight: '2px' }} />
                <ReactTooltip
                  place="top"
                  type="warning"
                  id="status-tips"
                  effect="solid"
                  backgroundColor="#45bcb8"
                  delayHide="500"
                >
                  {lang.t('status_warning')}
                </ReactTooltip>
                <TextButton small={true} onClick={store.sortByStatus} text="Status" />
              </div>
              <div className="td" style={{ width: '120px' }}></div>
            </div>

            {props.data.map((item, index) => (
              <div className="tr" key={item.txHash}>
                <div className="td" style={{ width: '230px' }}>
                  <div>{item.createTime && base.timeAgo.format(new Date(item.createTime))}</div>
                  {/* <div>{item.subsequent > -1 ? item.subsequent : 'no'}&nbsp;{lang.t('subsequent.deposits')}</div> */}
                </div>

                {God.isBSC && <div className="td">{item.poolName}</div>}

                <div className="td">
                  {God.isBSC ? (
                    <>
                      <div>
                        {store.formatAmount(item.amount)}&nbsp;{(EthereumConfig.tokensOnEthereum[item.currency] && EthereumConfig.tokensOnEthereum[item.currency].pools[item.indexOfSet]) ? EthereumConfig.tokensOnEthereum[item.currency].pools[item.indexOfSet].symbol : item.currency + "-" + item.indexOfSet}
                      </div>
                      <div>{store.formatAmount(item.amountCYC)}&nbsp;CYC</div>

                      {item.coin && (
                        <div>{store.formatAmount(item.coin)}&nbsp;BNB</div>
                      )}
                    </>
                  ) : (
                    <span>
                      {store.formatAmount(item.amount)}&nbsp;{item.currency}
                    </span>
                  )}
                </div>

                {!God.isBSC ? (
                  <div className="td">
                    {item.subsequent > -1 ? item.subsequent : 'no'}&nbsp;{lang.t('deposits')}
                  </div>
                ) : null}

                <div className="td">
                  <a
                    href={
                      (God.isBSC ? `${BSCPageStore.CurrentNetwork.explorerURL}/tx/` : 'https://iotexscan.io/action/') +
                      item.txHash
                    }
                    className="colorfulA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Utility.toFixString(item.txHash, 10)}
                  </a>
                </div>
                <div className="td">{store.showStatus(item.status)}</div>
                <div className="td" style={{ minWidth: '150px' }}>
                  <button
                    id={index}
                    onClick={store.onClickCopyButton}
                    className="imageButton"
                    style={{
                      padding: '0px',
                      backgroundColor: '#6cded4',
                      color: 'black',
                      borderRadius: '5px',
                      fontWeight: 'bold'
                    }}
                  >
                    <img src="/images/copyicon.png" alt="Copy Button" />
                    <span>{lang.t('note')}&nbsp;</span>
                  </button>

                  <Popconfirm title={lang.t('note.delte.confirm')} onConfirm={store.onClickRemoveButton}>
                    <button id={index} className="imageButton">
                      <img src="/images/closeicon.png" alt="Remove Button" />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
        defaultValue={props.note}
      />
    </>
  );
});

export default TransactionRecord;
