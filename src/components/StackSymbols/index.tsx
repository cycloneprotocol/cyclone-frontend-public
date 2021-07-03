import React from 'react';
import { styled } from '../../modules/index';
import { Icon } from '../../modules/globalStyle';

interface IComponentProps {
  imgs?: any;
}

const StackBox = styled('div', {
  position: 'relative',
  width: '2.1875rem',
  height: '1.25rem',
  '@md': {
    width: '4.375rem',
    height: '2.5rem',
  },
  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '1.25rem',
    height: '1.25rem',
    '@md': {
      width: '2.5rem',
      height: '2.5rem',
    },
    '&:nth-child(1)': {
      zIndex: 2
    },
    '&:nth-child(2)': {
      left: '0.9rem',
      '@md': {
        left: '1.875rem',
      }
    },

  }
})

export const StackSymbols = (props: IComponentProps) => {
  const { imgs } = props
  return (
    <StackBox>
      <Icon src={imgs[0]} alt="" />
      <Icon src={imgs[1]} alt="" />
    </StackBox>
  );
}