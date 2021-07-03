import React, { useEffect, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Wrapper, Icon, FlexBox, Text, BorderBox, Button, Section, DropBox } from '../../../modules/globalStyle';
import { useStore } from '../../../store';
import { LpMining } from '../../../components/LpMining';
import { LpMiningHeader } from '../../../components/LpMiningHeader';

export const Deposit = observer(() => {
  const { lang, god, dev, base } = useStore();

  if (god.isIOTX) {
    return (
      <Wrapper>
        <Text color="white" weight="medium">
          {lang.t('iotx.v2.tips')}
        </Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <LpMiningHeader />
      {god.AeolusV2 && <LpMining aeolus={god.AeolusV2} />}
      <LpMining aeolus={god.Aeolus} />
      {/* head */}
    </Wrapper>
  );
});
