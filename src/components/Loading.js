import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../store';
import Button from './Button';

export const Loading = observer((props) => {
  const { lang } = useStore();

  const store = useLocalStore(
    (props) => ({
      allowToCancel: false,
      nextable: true,
      next() {
        props.next();
        store.nextable = false;
      },
    }),
    props
  );

  useEffect(() => {
    if (props.action) {
      props.action();
    }

    setTimeout(() => {
      store.allowToCancel = true;
    }, 7000);
  }, []);

  return (
    <div className="loadingBar">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M39.5488 16.0156C52.6496 16.0156 63.2616 26.7487 63.2616 39.999C63.2616 53.2494 52.6496 63.9824 39.5488 63.9824C26.4479 63.9824 15.8359 53.2494 15.8359 39.999"
          stroke="#38DCD5"
          strokeWidth="6"
          strokeMiterlimit="10"
          strokeLinecap="square"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="1s"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M51.3651 40.001C51.3651 46.6123 46.0865 51.9512 39.5498 51.9512C33.013 51.9512 27.7344 46.6123 27.7344 40.001C27.7344 33.3896 33.013 28.0508 39.5498 28.0508"
          stroke="#38DCD5"
          strokeWidth="6"
          strokeMiterlimit="10"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="1s"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M74.9969 40C74.9969 59.8064 59.1337 75.8506 39.5508 75.8506"
          stroke="#38DCD5"
          strokeWidth="6"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M4.10156 39.9991C4.10156 20.1927 19.9648 4.14844 39.5477 4.14844"
          stroke="#38DCD5"
          strokeWidth="6"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path d="M39.5508 4.14844H74.9969" stroke="#38DCD5" strokeWidth="6" strokeMiterlimit="10" />
        <path d="M39.5477 75.8516H4.10156" stroke="#38DCD5" strokeWidth="6" strokeMiterlimit="10" />
      </svg>

      <div className="loadingLabel">{props.text}</div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {props.nextable && (
          <Button
            fullWidth={false}
            avaliable={props.nextable && store.nextable}
            onClick={store.next}
            label={props.positiveButtonLabel ? props.positiveButtonLabel : lang.t('Confirm')}
          />
        )}

        {props.cancelable && (
          <div style={{ marginTop: "1rem" }}>
            <Button fullWidth={false} avaliable={store.allowToCancel} onClick={props.cancel} label={lang.t('Cancel')} />
          </div>
        )}
      </div>
    </div>
  );
});

export default Loading;
