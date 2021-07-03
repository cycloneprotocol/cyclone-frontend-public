import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../store';
import Button from './Button';

export const Alert = observer((props) => {
  const { lang } = useStore();
  return (
    <div className="borderedView">
      <div className="checkNoteView">
        <div className="titleOfView">{props.title}</div>
        <div className="bodyOfView">
          <p>{props.text}</p>

          <div
            style={{
              marginTop: '1.2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button fullWidth={false} avaliable={true} onClick={props.onClose} label={lang.t('Confirm')} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Alert;
