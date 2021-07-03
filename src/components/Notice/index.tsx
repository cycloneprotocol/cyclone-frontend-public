import React, { useState } from 'react';
import { styled } from '../../modules/index';
import { Icon, Text } from '../../modules/globalStyle';

interface IComponentProps {
  content?: any;
}

export const Notice = styled('div', {
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '$bg3',
  padding: '0.5rem 1.5rem',
  flexBetweenCenter: 'row',
  fontSize: '0.75rem',
  lineHeight: '1.2rem',
  color: '$textPrimary',
  a: {
    color: '$primary',
    textDecoration: 'none'
  },
  img: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    ml: '1rem'
  },
  variants: {
    status: {
      show: {
        display: 'flex'
      },
      hide: {
        display: 'none'
      }
    }
  }
});

export const NoticeItem = (props: IComponentProps) => {
  const { content } = props;
  const [isShow, setStatus] = useState(true);
  return (
    <Notice css={{ mb: '0.5rem' }} status={isShow ? 'show' : 'hide'}>
      <Text css={{ flex: 1, textAlign: 'center' }}>{content}</Text>
      <Icon
        onClick={() => setStatus(false)}
        src="/images/home/delete_button_n.png"
        css={{
          '&:hover': {
            content: 'url("/images/home/delete_button_s.png")'
          }
        }}
        alt=""
      />
    </Notice>
  );
};
