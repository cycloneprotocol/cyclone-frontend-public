import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { FlexBox, Text, BorderBox, Section } from '../../modules/globalStyle';
import { useStore } from '../../store/index';
import { styled } from '../../modules';

const SwitchItem = styled('div', {
  width: 24,
  height: 24,
  lineHeight: '24px',
  cursor: 'pointer',
  '.name': {
    textAlign: 'center'
  },
  variants: {
    bg: {
      active: {
        backgroundColor: '$primaryOpacity'
      },
      normal: {
        backgroundColor: 'transparent'
      }
    }
  }
});

export const LpMiningHeader = observer(() => {
  const { lang, setting } = useStore();
  const store = useLocalStore(() => ({
    toggleSwtich() {
      setting.approveMax.save(!setting.approveMax.value);
    }
  }));
  return (
    <Section>
      <FlexBox justify="end" items="center" css={{ mb: '3rem' }}>
        <Text size="small" color="light" cursor="none" align="right">
          {lang.t('use.max.approve')}
        </Text>
        <FlexBox justify="between" css={{ border: '1px solid $borderPrimary', width: '54px', height: '28px', ml: '1rem', px: '1px' }}>
          <SwitchItem bg={setting.approveMax.value ? 'active' : 'normal'} onClick={store.toggleSwtich}>
            <Text color={setting.approveMax.value ? 'primary' : 'light'} size="mini" className="name" cursor="pointer">
              On
            </Text>
          </SwitchItem>
          <SwitchItem bg={setting.approveMax.value ? 'normal' : 'active'} onClick={store.toggleSwtich}>
            <Text color={setting.approveMax.value ? 'light' : 'primary'} size="mini" className="name" cursor="pointer">
              Off
            </Text>
          </SwitchItem>
        </FlexBox>
      </FlexBox>
      <BorderBox css={{ padding: '0 0 0.4rem 0' }}>
        <FlexBox justify="between">
          <Text size="small" color="white" cursor="none" weight="medium" css={{ width: 190, '@md': { width: '32%' } }}>
            {lang.t('cyc.lp.mining.title')}
          </Text>
          <Text size="small" color="white" cursor="none" weight="medium" css={{ flex: 1, textAlign: 'right' }}>
            {lang.t('total.apy')} / {lang.t('daily.apr')}
          </Text>
          <FlexBox css={{ width: 'max-content', '@md': { width: '40%' } }} justify="end">
            <Text size="small" color="white" cursor="none" weight="medium" css={{ display: 'none', '@md': { display: 'block' } }}>
              {lang.t('tvl')}
            </Text>
            <Section css={{ width: '1rem', ml: '1rem', '@md': { width: '1.375rem', ml: '1.5rem' } }} />
          </FlexBox>
        </FlexBox>
      </BorderBox>
    </Section>
  );
});
