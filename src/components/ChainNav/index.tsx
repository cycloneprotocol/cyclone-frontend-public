import React, { useState } from 'react';
import { useStore } from '../../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { Wrapper, Text, FlexBox, Icon, BorderBox, Button, Section } from '../../modules/globalStyle';
import { styled } from '../../modules/index';

export const ChainNav = observer(() => {
  const { lang, base } = useStore();
  const history = useHistory();
  const store = useLocalStore(() => ({
    current: history.location.pathname,
    chains: [
      {
        name: 'BSC',
        logo: '/images/home/bsc_n.svg',
        path: '/bsc',
        active_logo: '/images/home/bsc_s.svg'
      },
      {
        name: 'ETH',
        logo: '/images/home/eth_n.svg',
        path: '/eth',
        active_logo: '/images/home/eth_s.svg'
      },
      {
        name: 'IoTeX',
        logo: '/images/home/iotex_n.svg',
        path: '/iotx-v1',
        active_logo: '/images/home/iotex_s.svg'
      }
    ],
    get currentObj() {
      return store.chains.find((i) => i.path == store.current);
    },
  }));

  return (
    <>
      <Section css={{ display: 'none', '@md': { display: 'block', position: 'relative', mr: '1rem' } }}>
        <DropItem color="normal">
          <FlexBox justify="between" css={{width: '100%'}}>
            <FlexBox css={{flex: 1}}>
                <Icon src={store.currentObj.active_logo} alt="" css={{ width: '25px', height: '25px', marginRight: '5px' }}></Icon>
                <Text color="white" size="md" weight="semibold">{store.currentObj.name}</Text>
            </FlexBox>
            <Icon src="/images/home/btn_dropdown.png" alt="" css={{ width: 24, height: 24 }}></Icon>
          </FlexBox>
        </DropItem>
        <DropdownBox>
          <Section className="dropBox" css={{ backgroundColor: '$bg9' }}>
            {store.chains &&
              store.chains.map((item, index) => (
                <DropItem
                  key={item.path}
                  onClick={() => {
                    store.current = item.path;
                    history.push(item.path);
                  }}
                  css={{
                    backgroundColor: store.current === item.path ? '$bg9' : 'transparent',
                    '&:hover': {
                      img: {
                        content: `url(${item.active_logo}) !important`
                      },
                      ".name": {
                        color: '$textPrimary'
                      }
                    }
                  }}
                >
                  <Icon
                    src={store.current === item.path ? item.active_logo : item.logo}
                    css={{
                      width: '25px',
                      height: '25px',
                      marginRight: '5px',
                      '&:hover': {
                        content: `url(${item.active_logo})`
                      }
                    }}
                  />
                  <Text className="name" color="light" size="md" weight="semibold" cursor="pointer">{item.name}</Text>
                </DropItem>
              ))}
          </Section>
        </DropdownBox>
      </Section>

      <FlexBox css={{ mb: '2rem', display: 'flex', '@md': { display: 'none' } }}>
        {store.chains &&
          store.chains.map((item, index) => (
            <DropItem
              key={item.path}
              onClick={() => {
                store.current = item.path;
                history.push(item.path);
              }}
              css={{
                padding: 0,
                width: '30%',
                textAlign: 'center',
                backgroundColor: store.current === item.path ? '$bg9' : '$bg3',
                '&:hover': {
                  img: {
                    content: `url(${item.active_logo}) !important`
                  },
                }
              }}
            >
              <FlexBox justify="center" css={{width: '100%'}}>
                <Icon
                  src={store.current === item.path ? item.active_logo : item.logo}
                  css={{
                    width: '25px',
                    height: '25px',
                    marginRight: '5px',
                    '&:hover': {
                      content: `url(${item.active_logo})`
                    }
                  }}
                />
                <Text color={store.current === item.path  ? "white": "light"} size="md" weight="semibold" cursor="pointer">{item.name}</Text>
              </FlexBox>
            </DropItem>
          ))}
      </FlexBox>
    </>
  );
});

const DropdownBox = styled('div', {
  position: 'absolute',
  width: '100px',
  height: '30px',
  top: 0,
  left: 0,
  '.dropBox': {
    position: 'absolute',
    top: 38,
    left: 0,
    display: 'none'
  },
  '&:hover': {
    height: 90,
    '.dropBox': {
      display: 'block'
    }
  }
});

const DropItem = styled('div', {
  width: '110px',
  height: '30px',
  backgroundColor: '$bg9',
  padding: '0 9px 0 11px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  variants: {
    color: {
      normal: {
        '&:hover': {
          backgroundColor: '$bg3'
        }
      }
    }
  }
});
