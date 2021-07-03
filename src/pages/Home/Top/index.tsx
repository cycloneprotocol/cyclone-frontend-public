import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Wrapper, FlexBox, Text, Icon, Section } from '../../../modules/globalStyle';
import { css } from '../../../modules/index';
import { Headers } from '../../../components/Headers/index';
import { NoticeItem } from '../../../components/Notice/index';
import { useStore } from '../../../store';
import CountUp from 'react-countup';

export const HomeTop = observer(() => {
  const { lang, base, god } = useStore();
  return (
    <article className={styles.homeTop.className}>
      <Wrapper>
        <Headers />

        <NoticeItem
          content={
            <div>
              {lang.t('notice.txt1')}&nbsp;
              <a href="https://docs.cyclone.xyz/audit">{lang.t('audited.code')}</a>&nbsp;
              {lang.t('notice.txt2')}
            </div>
          }
        />

        <FlexBox justify="between" responsive="rc" css={{ mt: '2.625rem', alignItems: 'stretch', '@md': { alignItems: 'center' } }}>
          <Section css={{ mb: '3rem', '@md': { mb: 0 } }}>
            <Text size="large" color="white" weight="medium" css={{ mb: '0.5rem' }} responsive="large">
              <span>{lang.t('tvl')}: </span>
              {base.tvl ? (
                <CountUp
                  end={base.tvl}
                  duration={1}
                  decimals={2}
                  preserveValue
                  formattingFn={(e) => `$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                />
              ) : (
                '...'
              )}
            </Text>
            <Text size="medium" color="light" responsive="large">
              <span>{lang.t('token.price')}: $</span>
              <CountUp end={base.cycPrice} duration={1} decimals={2} preserveValue />
            </Text>
          </Section>
          <Section>
            <FlexBox justify="end" css={{ mb: '0.4rem' }} onClick={(e) => god.addCYCToMetamask()}>
              <Text size="small" color="light" hover="light" cursor="pointer">
                {lang.t('add.metamask')}
              </Text>
              <Icon src="/images/home/metamask_logo.png" css={{ marginLeft: '0.8rem' }} alt="" />
            </FlexBox>
            <a href={god.currentChain.swapURL} target="_blank">
              <FlexBox justify="end">
                <Text size="small" color="light" hover="light" cursor="pointer">
                  {lang.t('add.to', { target: god.currentChain.swapName })}
                </Text>
                <Icon src={`/images/home/${god.currentChain.swapName.toLowerCase()}.png`} css={{ marginLeft: '0.8rem' }} alt="" />
              </FlexBox>
            </a>
          </Section>
        </FlexBox>
      </Wrapper>
    </article>
  );
});

const styles = {
  homeTop: css({
    padding: '1.5rem 0 0 0'
  }),
  miniLine: css({
    width: '100px',
    height: 1,
    backgroundColor: '$primary',
    marginTop: '1.5rem'
  })
};
