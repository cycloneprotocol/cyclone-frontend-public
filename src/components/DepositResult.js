import BigNumber from 'bignumber.js';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Config from '../Config';
import God from '../God';
import { useStore } from '../store';
import Button from './Button';

export const DepositResult = observer(props => {
  const { lang } = useStore();
  const rawUnit = new BigNumber(10).pow(Config.CYCToken.decimals);
  // const store = useLocalStore(() => ({
  //   x1: "0",
  //   x2: "0",
  //   async compute() {
  //     let i = await God.asyncGetX1WithinMimo(props.amount)
  //     this.x1 = !isNaN(i) ? i.dividedBy(rawUnit).toFixed(6).toString() : "0"

  //     i = await God.asyncGetX2WithinMimo(props.amount)
  //     this.x2 = !isNaN(i) ? i.dividedBy(rawUnit).toFixed(6).toString() : "0"
  //   }
  // }));

  // useEffect(() => {
  //   store.compute()
  // }, [props.amount])

  return (
    <div
      className="borderedView"
      style={{
        width: '80%'
      }}
    >
      <div
        className="checkNoteView"
        style={{
          maxWidth: 'none'
        }}
      >
        <div className="bodyOfView">
          {props.x1 > 0 && props.x2 > 0 ? (
            <p style={{ textAlign: 'center' }}>
              {lang.t('deposit.result', {
                x1: props.x1,
                x2: props.x2
              })}
            </p>
          ) : (
            <p style={{ textAlign: 'center' }}>{lang.t('deposit.result1')}</p>
          )}

          <div
            style={{
              marginTop: '1.2rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button fullWidth={false} avaliable={true} onClick={props.goToLPMining} label={lang.t('Mining')} />
            <div>&nbsp;&nbsp;</div>
            <Button fullWidth={false} avaliable={true} onClick={props.onClose} label={lang.t('close')} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DepositResult;
