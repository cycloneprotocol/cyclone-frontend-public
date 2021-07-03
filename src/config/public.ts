import BN from 'bignumber.js';
export const publicConfig = {
  isProd: process.env.NODE_ENV == 'production',
  maxApprove: new BN(1.157920892373162e59).toFixed(0),
  iotexTVL: 10000000
};
