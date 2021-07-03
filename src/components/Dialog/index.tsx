import React, { useState } from 'react';
import { styled } from '../../modules/index';
import { FlexBox, Icon, Text } from '../../modules/globalStyle';

interface IComponentProps {
  content?: any,
  title?: string,
  size?: any,
  visible?: any,
  close?: any
}

const Dialog = styled('div', {
  position: 'absolute',
  variants: {
    status: {
      show: {
        display: 'block'
      },
      hide: {
        display: 'none'
      }
    }
  },
})

const ModalMask = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999,
  width: '100%',
  height: '100%',
  backgroundColor: '$bg6'
})

const ModalWrap = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1001,
  width: '100%',
  height: '100%',
  outline: 'none',
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Modal = styled('div', {
  padding: '1rem',
  backgroundColor: '$bg7',
  textAlign: 'center',
  '@md': {
    padding: '1.5rem 3rem 3rem 3rem',
  },
  variants: {
    size: {
      base: {
        px: '1.5rem',
        borderRadius: '10px',
        width: '90%',
        '@md': {
          width: '330px'
        }
      },
      small: {
        px: '2rem',
        width: '90%',
        '@md': {
          width: '550px'
        }
      },
      md: {
        px: '1.5rem',
        width: '90%',
        '@md': {
          width: '550px'
        }
      },
      medium: {
        width: '90%',
        '@md': {
          width: '700px'
        }
      },
      auto: {
        backgroundColor: 'transparent',
        width: '90%',
        '@md': {
          width: 'auto'
        }
      }
    }
  }
})

export const DialogWrapper = (props: IComponentProps) => {
  const { title, content, size, visible, close } = props
  return (
    <Dialog status={visible ? 'show' : 'hide'}>
      <ModalMask />
      <ModalWrap>
        <Modal size={size}>
          {title && <FlexBox justify="between" css={{ mb: '1.5rem' }}>
            <Text size="small" color="white" weight="semibold">{title}</Text>
            <Icon
              onClick={close}
              src="/images/home/delete_button_n.png"
              css={{
                '&:hover': {
                  content: 'url("/images/home/delete_button_s.png")'
                }
              }} alt="" />
          </FlexBox>}
          {content}
        </Modal>
      </ModalWrap>
    </Dialog>
  );
}