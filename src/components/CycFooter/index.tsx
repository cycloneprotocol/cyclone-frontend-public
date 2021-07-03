import React, { useState } from 'react';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { Wrapper, Text, FlexBox, Icon, Section, Button } from '../../modules/globalStyle';
import { styled } from '../../modules/index';
import { LinksLanguage } from '../LinksLanguage';

const langGroups = {
  en: { name: 'EN', src: '/images/EN.png', text: 'en' },
  ru: { name: 'RU', src: '/images/RU.png', text: 'ru' },
  zh_CN: { name: 'CN', src: '/images/CN.png', text: 'zh_CN' }
};

export const CycFooter = observer(() => {
  const { lang, god, base } = useStore();

  return (
    <FooterBox>
      <Wrapper>
        <FlexBox justify="between" responsive="rc" css={{ alignItems: 'center', '@md': { alignItems: 'start' } }}>
          <LinksLanguage />
          <FlexBox justify="end" direction="column" items="end">
            <FlexBox css={{ mb: '0.5rem', cursor: 'pointer' }}>
              <a href={god.currentChain.explorerURL + '/address/' + god.CYCToken.address} target="_blank">
                <Text size="mini" color="white" cursor="pointer">
                  {lang.t('cyc.token.contract')}: {god.CYCToken.address}
                </Text>
              </a>
              <Section css={{ width: 1, height: 12, backgroundColor: '$textGray', mx: '0.8rem' }} />
              <Icon src="/images/home/metamask_logo.png" alt="" onClick={(e) => god.addCYCToMetamask()} />
            </FlexBox>
            <FlexBox>
              <FlexBox>
                <Text size="mini" color="white">
                  {lang.t('token.price')}：
                </Text>
                <Text size="mini" color="primary" cursor="pointer" css={{ textDecoration: 'underline' }}>
                  $ {base.cycPrice}
                </Text>
              </FlexBox>
              <Section css={{ width: 1, height: 12, backgroundColor: '$textGray', mx: '0.8rem' }} />
              <a href={god.currentChain.swapURL} target="_blank">
                <Icon src={`/images/home/${god.currentChain.swapName.toLowerCase()}.png`} alt="" />
              </a>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Wrapper>
    </FooterBox>
  );
});

const FooterBox = styled('article', {
  backgroundColor: '$bg2',
  padding: '2rem 0',
  '@md': {
    padding: '2.75rem 0 1.875rem 0'
  }
});
