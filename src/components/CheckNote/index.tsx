import React, { useState } from 'react';
import { styled } from '../../modules/index';
import { Icon, Text, FlexBox, TextArea, Button, Section } from '../../modules/globalStyle';
import { DialogWrapper } from '../Dialog/index';
import { useStore } from '../../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
interface IComponentProps {
  visible?: boolean;
  close?: any;
  note?: any;
  onConfirm?: Function;
  onCancel?: Function;
}

const NoteBox = styled('div', {
  backgroundColor: '$bg3',
  p: '1rem'
});

export const CheckNote = observer((props: IComponentProps) => {
  const { lang } = useStore();
  const { visible, close } = props;
  const store = useLocalStore(
    (props) => ({
      checked: false,
      noteConfirm: '',
      copy(data) {
        copy(data);
        message.success(lang.t('check.note.copied'));
      },
      get isConfirm() {
        return !!store.noteConfirm && store.noteConfirm == props.note;
      }
    }),
    props
  );

  const content = (
    <Section css={{ paddingBottom: store.checked ? '50vh' : '0', '@md': { paddingBottom: '0' } }} >
      <Text size="md" color="white" css={{ mb: '0.4rem' }}>
        {lang.t('backup')}
      </Text>
      <Text size="md" color="warning" css={{ mb: '1.2rem' }}>
        {lang.t('backup.red')}
      </Text>
      <NoteBox css={{ mb: '1.2rem' }} onClick={(e) => store.copy(props.note)}>
        <Text size="md" color="light" css={{ wordBreak: 'break-word' }}>
          {props.note}
          <Icon src="/images/home/icon_copy.png"></Icon>
        </Text>
      </NoteBox>
      <FlexBox css={{ mb: '1.6rem' }} onClick={() => (store.checked = !store.checked)}>
        <Icon css={{ mr: '0.5rem' }} src={`/images/home/${store.checked ? 'Checked' : 'Unchecked'}.png`}></Icon>
        <Text size="md" color="white">
          {lang.t('note.warning')}
        </Text>
      </FlexBox>
      {store.checked && (
        <div>
          <Text size="md" color="white" css={{ mb: '1.5rem' }}>
            {lang.t('check.note.textarea')}
          </Text>

          <TextArea value={store.noteConfirm} css={{ mb: '2rem' }} onChange={(e) => (store.noteConfirm = e.target.value)} />

          <Button size="large" disabled={!store.isConfirm} onClick={(e) => props.onConfirm()} color="primary" responsive="large">
            {lang.t('SEND DEPOSIT')}
          </Button>
        </div>
      )}
    </Section>
  );
  return <DialogWrapper title="Your  Note" size="medium" content={content} visible={visible} close={close} />;
});
