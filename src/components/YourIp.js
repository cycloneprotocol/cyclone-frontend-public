import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../store';
import ReactTooltip from 'react-tooltip';

export const YourIp = observer((props) => {
  const { lang } = useStore();
  const { base } = props
  return (
    <>
      <div className="yourIp" data-tip="your-ip-tips" data-for='your-ip-tips'>
        {lang.t('yourIp')}: {base.ip !== '' ? base.ip : '000.00.000.000'}
        {', ' + base.geo}
      </div>
      <div className="yourIpMobile" data-tip="your-ip-tips" data-offset="{'left': -50}" data-for='your-ip-tips'>
        {' '}
        {base.ip !== '' ? base.ip : '000.00.000.000'}
        {',' + base.geo}
      </div>
      <ReactTooltip place="top" type="warning" id="your-ip-tips" effect="solid" backgroundColor="#45bcb8">
        <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '280px' }}>
          {lang.t('yout.ip.tips')}
        </div>
      </ReactTooltip>
    </>
  );
});

export default YourIp;
