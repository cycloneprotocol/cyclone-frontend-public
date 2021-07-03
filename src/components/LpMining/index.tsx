import React, { useState } from 'react';
import { Icon, Text, FlexBox, Wrapper, Button, BorderBox, DropBox, Section, Input } from '../../modules/globalStyle';
import { StackSymbols } from '../StackSymbols';
import { useStore } from '../../store';
import CountUp from 'react-countup';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import BigNumber from 'bignumber.js';
import { BigNumberInputState } from '../../store/lib/BignumberInputState';
import { message } from 'antd';
import { AeolusContractState } from '../../store/lib/ContractState';
import { LPTokenState } from '../../store/lib/TokenState';

interface IComponentProps {
  title?: string;
  visible?: boolean;
  close?: any;
  aeolus?: AeolusContractState;
  lpToken?: LPTokenState;
}

export const LpMining = observer((props: IComponentProps) => {
  const { lang, god, base, dev, setting } = useStore();

  const store = useLocalStore(
    (props) => ({
      isShowDetail: false,
      lpStakeInput: new BigNumberInputState({}),
      lpUnStakeInput: new BigNumberInputState({}),
      get Aeolus() {
        return props.aeolus;
      },
      get LpToken() {
        return store.Aeolus.LpToken;
      },
      get lpApproved() {
        return store.LpToken.allowanceForAeolus.value.comparedTo(store.lpStakeInput.value) >= 0;
      },
      get stakeAble() {
        return (
          store.LpToken.balance.value.comparedTo(store.lpUnStakeInput.value) > 0 && store.lpStakeInput.value.comparedTo(0) > 0 && store.lpApproved
        );
      },
      get unStakeAble() {
        return store.lpUnStakeInput.value.comparedTo(0) > 0;
      },
      get isStaking() {
        return store.LpToken.metas.isApprovingAllowance || store.lpStakeInput.loading;
      },

      setLpStake(val) {
        store.lpStakeInput.setFormat(val);
      },
      setLpUnstake(val) {
        store.lpUnStakeInput.setFormat(val);
      },
      setLpStakeMax() {
        store.lpStakeInput.setValue(store.LpToken.balance.value);
      },
      setLpUnStakeMax() {
        store.lpUnStakeInput.setValue(store.Aeolus.staked.value);
      },
      cliam() {
        god.CliamToken({ aeolus: store.Aeolus });
      },
      approveLP() {
        god.ApproveLP({ amount: store.lpStakeInput.value.toFixed(0, 1), aeolus: store.Aeolus });
      },
      async stake() {
        try {
          store.lpStakeInput.setLoading(true);
          await god.StakeLP({ amount: store.lpStakeInput.value.toFixed(0, 1), aeolus: store.Aeolus });
          store.lpStakeInput.setValue(new BigNumber(0));
        } catch (error) {
          message.error(error.message);
        }
        store.lpStakeInput.setLoading(false);
      },
      async unStake() {
        try {
          store.lpUnStakeInput.setLoading(true);
          await god.UnStakeLP({ amount: store.lpUnStakeInput.value.toFixed(0, 1), aeolus: store.Aeolus });
          store.lpUnStakeInput.setValue(new BigNumber(0));
        } catch (error) {
          message.error(error.message);
        }
        store.lpUnStakeInput.setLoading(false);
      },
      connect() {
        god.setShowConnecter(true);
      }
    }),
    props
  );
  const LpDetail = useObserver(() => {
    if (store.isShowDetail) {
      if (!god.isConnect) {
        return (
          <DropBox color="primary">
            <FlexBox justify="center" items="center">
              <Button size="large" responsive="large" color="primary" onClick={store.connect}>
                {lang.t('connect')}
              </Button>
            </FlexBox>
          </DropBox>
        );
      }
      return (
        <DropBox color="primary">
          <BorderBox css={{ pt: 0 }}>
            <FlexBox justify="between">
              <FlexBox>
                <Text size="small" color="white">
                  {lang.t('earned')}：
                </Text>
                <Text size="small" color="yellow">
                  {store.Aeolus.cycEarn.value.comparedTo(0) > 0 ? (
                    <CountUp end={store.Aeolus.cycEarn.format} duration={1} decimals={6} preserveValue />
                  ) : (
                    0
                  )}
                  <span> {lang.t('cyc')}</span>
                </Text>
              </FlexBox>
              <Button size="mini" color="info" css={{ ml: '1.875rem', cursor: 'pointer' }} responsive="mini" onClick={(e) => store.cliam()}>
                <Text size="small" weight="semibold" align="center" responsive="md" cursor="pointer">
                  {lang.t('claim')}
                </Text>
              </Button>
            </FlexBox>
          </BorderBox>

          <FlexBox justify="between">
            <FlexBox css={{ mt: '1.4rem', mb: '1rem' }}>
              <Text size="small" color="white" weight="medium">
                {lang.t('pool.token', { tokenA: god.CYCToken.symbol, tokenB: god.Coin.symbol })}
              </Text>
              {/* <Icon src="/images/home/info_icon.png" css={{ ml: '0.8rem' }} /> */}
            </FlexBox>
            <a href={store.Aeolus.LiquidityURL} target="_blank">
              <Text size="small" color="primary" css={{ textDecoration: 'underline' }} cursor="pointer">
                {store.Aeolus.liquidityText}
              </Text>
            </a>
          </FlexBox>
          <Text size="small" color="white" css={{ mb: '1.5rem' }}>
            {lang.t('mining.reward.today')}: {store.Aeolus.rewardDaily} {lang.t('cyc')}
          </Text>

          <FlexBox justify="between" responsive="rc">
            <Section css={{ width: '100%', mb: '1.5rem', '@md': { width: '46%', mb: 0 } }}>
              <Text size="small" color="white" css={{ mb: '0.5rem' }}>
                {lang.t('balance')}: {store.LpToken.balance.format} {lang.t('lp')}
              </Text>
              {dev.devUI && (
                <Text size="small" color="white" css={{ mb: '0.5rem' }}>
                  {lang.t('allowance')}: {store.LpToken.allowanceForAeolus.format} {lang.t('lp')}
                </Text>
              )}
              <Section css={{ position: 'relative', mb: '1.5rem' }}>
                <Input
                  type="number"
                  min={0}
                  css={{ pr: '50px' }}
                  value={store.lpStakeInput.format}
                  onChange={(e) => store.setLpStake(e.target.value)}
                />
                <Text
                  size="small"
                  color="primary"
                  cursor="pointer"
                  onClick={(e) => store.setLpStakeMax()}
                  css={{ position: 'absolute', lineHeight: '40px', top: 0, right: 11 }}
                >
                  {lang.t('Max')}
                </Text>
              </Section>

              {!store.lpApproved ? (
                <FlexBox justify="between">
                  <Button
                    size="medium"
                    responsive="lg"
                    color="primary"
                    status={store.LpToken.metas.isApprovingAllowance ? 'loading' : 'normal'}
                    disabled={store.lpStakeInput.value.comparedTo(0) <= 0 || store.LpToken.metas.isApprovingAllowance}
                    onClick={(e) => store.approveLP()}
                  >
                    {lang.t('approve')}
                  </Button>
                  <Button size="medium" responsive="lg" color="primary" disabled={true}>
                    {lang.t('STAKE')}
                  </Button>
                </FlexBox>
              ) : (
                <Button
                  size="large"
                  responsive="large"
                  color="primary"
                  status={store.isStaking ? 'loading' : 'normal'}
                  disabled={!store.stakeAble || store.isStaking}
                  onClick={(e) => store.stake()}
                >
                  {lang.t('STAKE')}
                </Button>
              )}
            </Section>
            <Section css={{ width: '100%', '@md': { width: '46%' } }}>
              <Text size="small" color="white" css={{ mb: '0.5rem' }}>
                {lang.t('staked')}: {store.Aeolus.staked.format} {lang.t('lp')}
              </Text>
              <Section css={{ position: 'relative', mb: '1.5rem' }}>
                <Input
                  type="number"
                  min={0}
                  css={{ pr: '50px' }}
                  value={store.lpUnStakeInput.format}
                  onChange={(e) => store.setLpUnstake(e.target.value)}
                />
                <Text
                  size="small"
                  color="primary"
                  cursor="pointer"
                  onClick={(e) => store.setLpUnStakeMax()}
                  css={{ position: 'absolute', lineHeight: '40px', top: 0, right: 11 }}
                >
                  {lang.t('Max')}
                </Text>
              </Section>
              <Button
                size="large"
                responsive="large"
                color="primary"
                disabled={!store.unStakeAble || store.lpUnStakeInput.loading}
                onClick={(e) => store.unStake()}
                status={store.lpUnStakeInput.loading ? 'loading' : 'normal'}
              >
                {lang.t('UNSTAKE')}
              </Button>
            </Section>
          </FlexBox>
          <Text size="mini" color="light" css={{ mt: '1.5rem' }}>
            {lang.t('lp.tips')}
          </Text>
        </DropBox>
      );
    }
  });

  return (
    <Section>
      <BorderBox css={{ padding: '0.6rem 0', cursor: 'pointer' }} onClick={() => (store.isShowDetail = !store.isShowDetail)}>
        <FlexBox justify="between">
          <FlexBox css={{ width: 'max-content', cursor: 'pointer', '@md': { width: '32%' } }}>
            <StackSymbols imgs={['/images/home/token_cyc.png', `/images/home/token_${god.currentChain.Coin.symbol.toLowerCase()}.png`]} />
            <Text size="small" color="primary" css={{ ml: '0.8rem' }}>
              <span>{store.Aeolus.title}</span>
            </Text>
          </FlexBox>
          <Text size="small" color="white" css={{ flex: 1, textAlign: 'right', cursor: 'pointer' }}>
            {store.Aeolus.liquidityApy}% / {store.Aeolus.liquidityApyDaily}%
          </Text>
          <FlexBox justify="end" css={{ width: 'max-content', cursor: 'pointer', '@md': { width: '40%' } }}>
            <Text size="small" color="white" css={{ display: 'none', '@md': { display: 'block' } }}>
              {store.Aeolus.lpLocked ? (
                <CountUp
                  end={store.Aeolus.lpLocked}
                  duration={0.5}
                  decimals={2}
                  preserveValue
                  formattingFn={(e) => `$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                />
              ) : (
                '...'
              )}
            </Text>
            <Icon
              css={{ width: '1rem', ml: '1rem', '@md': { width: '1.375rem', ml: '1.5rem' } }}
              src={`/images/home/${store.isShowDetail ? 'dropup' : 'dropdown'}.png`}
            ></Icon>
          </FlexBox>
        </FlexBox>
      </BorderBox>
      {LpDetail}
    </Section>
  );
});
