import React, { useState } from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox, TextArea, Button } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { useLocalStore, observer } from 'mobx-react-lite';
import { useStore } from '../../store/index';

interface IComponentProps {
  visible?: boolean;
  text?: string;
  showConfirm?: boolean;
  showCancel?: boolean;
  showLoading?: boolean;
  confirmText?: string;
  close?: Function;
  onConfirm?: Function;
  onCancel?: Function;
}

export const OnLoading = observer((props: IComponentProps) => {
  const { lang } = useStore();
  const { visible, text } = props;

  const store = useLocalStore(() => ({
    onConfirm() {
      props.close();
      props.onConfirm();
    },
    onCancel() {
      props.close();
      props.onCancel();
    }
  }));

  const content = (
    <article>
      {props.showLoading && (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M39.5488 16.0156C52.6496 16.0156 63.2616 26.7487 63.2616 39.999C63.2616 53.2494 52.6496 63.9824 39.5488 63.9824C26.4479 63.9824 15.8359 53.2494 15.8359 39.999"
            stroke="#38DCD5"
            strokeWidth="6"
            strokeMiterlimit="10"
            strokeLinecap="square"
          >
            <animateTransform attributeName="transform" begin="0s" dur="1s" type="rotate" from="0 40 40" to="360 40 40" repeatCount="indefinite" />
          </path>
          <path
            d="M51.3651 40.001C51.3651 46.6123 46.0865 51.9512 39.5498 51.9512C33.013 51.9512 27.7344 46.6123 27.7344 40.001C27.7344 33.3896 33.013 28.0508 39.5498 28.0508"
            stroke="#38DCD5"
            strokeWidth="6"
            strokeMiterlimit="10"
          >
            <animateTransform attributeName="transform" begin="0s" dur="1s" type="rotate" from="0 40 40" to="360 40 40" repeatCount="indefinite" />
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
      )}

      <Text size="lg" color="primary" weight="medium" css={{ my: '1rem' }} align="center">
        {text}
      </Text>

      <FlexBox justify="center">
        {props.showConfirm && (
          <Button size="medium" color="primary" onClick={store.onConfirm}>
            {props.confirmText || (props.showLoading ? lang.t('Confirm') : lang.t('Okay'))}
          </Button>
        )}
        {props.showCancel && (
          <Button size="medium" color="primary" css={{ ml: '1rem' }} onClick={store.onCancel}>
            Cancel
          </Button>
        )}
      </FlexBox>
    </article>
  );
  return <DialogWrapper size="auto" content={content} visible={visible} />;
});
