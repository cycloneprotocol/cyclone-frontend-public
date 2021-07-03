import { analyticsBscClient, analyticsETHClient } from '../lib/analytics-bsc-gql';
import { publicConfig } from '../config/public';
import { analyticsClient } from '../lib/analytics-gql';

export const marketUtils = {
  async getTVL() {
    const [bscTotal, ethTotal] = await Promise.all([
      analyticsBscClient.chain.query.total.execute({ lpLocked: 1, lpOldLocked: 1, pool: 1 }),
      analyticsETHClient.chain.query.total.execute({ lpLocked: 1, pool: 1 })
    ]);
    return (
      Number(bscTotal.lpLocked) +
      Number(bscTotal.lpOldLocked) +
      Number(bscTotal.pool) +
      Number(ethTotal.lpLocked) +
      Number(ethTotal.pool) +
      publicConfig.iotexTVL
    );
  },
  async getSupply() {
    const [iotex, bsc, eth] = await Promise.all([
      analyticsClient.chain.query.total.execute({ totalSupply: 1 }),
      analyticsBscClient.chain.query.total.execute({ cycSupply: 1 }),
      analyticsETHClient.chain.query.total.execute({ cycSupply: 1 })
    ]);
    return iotex.totalSupply + bsc.cycSupply + eth.cycSupply;
  }
};
