import React from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import { useStore } from '../store';
import { css } from '../modules/index';
import { observer, useLocalStore } from 'mobx-react-lite';
import TextArea from 'antd/lib/input/TextArea';
import God from '../God';

let clipboardy = null;

export const CheckNoteView = observer(props => {
  const { lang } = useStore();

  const store = useLocalStore(
    props => ({
      isBackedUp: false,
      isPaste: false,
      notePaste: '',
      isKeyboardShown: false,
      onBackupNote(event) {
        store.isBackedUp = event.target.checked;
      },
      onClickCopyButton(event) {
        if (clipboardy) {
          clipboardy.focus();
          clipboardy.select();
          const result = document.execCommand('copy');
          if (result === 'unsuccessful') {
            clipboardy.blur();
            console.error(lang.t('check.note.fail'));
          } else {
            clipboardy.blur();
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
      onFocusWithTextArea() {
        if (God.isAndroid) {
          store.isKeyboardShown = true;
        }
      },
      onBlurWithTextArea() {
        store.isKeyboardShown = false;
      },
      onChange({ target: { value } }) {
        store.notePaste = value;
        store.isPaste = props.note === value ? true : false;
      }
    }),
    props
  );

  return (
    <>
      <div
        className="borderedView"
        style={{
          top: store.isKeyboardShown ? '-15rem' : 0,
          position: store.isKeyboardShown ? 'absolute' : 'initial'
        }}
      >
        <div className="smallCheckNoteView">
          <div className="titleOfView">
            <div>{props.title}</div>
            <button onClick={props.onClickCloseButton} className="imageButton">
              <img src="images/close.svg" width="16px" height="16px" alt="" />
            </button>
          </div>
          <div className="bodyOfView">
            <div>{lang.t('backup')} <span style={{ color: 'red' }}>{lang.t('backup.red')}</span></div>
            <div className="highLightText" style={{ lineHeight: 1.5 }}>
              <span className="contentText">{props.note}</span>
              <button onClick={store.onClickCopyButton} className="imageButton">
                <img src="/images/copyicon.png" width="16px" height="16px" alt="" />
              </button>
            </div>
            <div className="flex item-center">
              <input id="check" type="checkbox" onChange={store.onBackupNote} style={{ verticalAlign: 'middle' }} />
              <label htmlFor="check" style={{ marginLeft: 10, verticalAlign: 'middle' }}>
                {lang.t('note.warning')}
              </label>
            </div>
            {store.isBackedUp && (
              <>
                <div style={{ marginLeft: '2rem' }}>
                  {lang.t('check.note.textarea')}
                </div>
                <TextArea
                  rows={4}
                  value={store.notePaste}
                  onFocus={store.onFocusWithTextArea}
                  onBlur={store.onBlurWithTextArea}
                  onChange={store.onChange}
                />

                {store.notePaste !== '' && !store.isPaste && (
                  <div style={{ color: 'red', marginTop: '-10px' }}>{lang.t('note.not.match')}</div>
                )}
              </>
            )}
            <div style={{ marginTop: '0.8rem' }}>
              <Button
                fullWidth={true}
                avaliable={store.isBackedUp && props.note !== '' && store.isPaste}
                onClick={props.onSend}
                label={lang.t('SEND DEPOSIT')}
              />
            </div>
          </div>
        </div>
      </div>

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

export default CheckNoteView;
