import { createClient } from '../../generated/bsc/gql/createClient';
import { request } from 'graphql-request';
import Config from '../Config';

export const analyticsBscClient = createClient({
  fetcher: ({ query, variables }) => request(Config.analyticsBscURL, query, variables).then((data) => ({ data }))
});

export const analyticsETHClient = createClient({
  fetcher: ({ query, variables }) => request(Config.analyticsETHURL, query, variables).then((data) => ({ data }))
});

export const createAnalyticsEthCilent = ({ APIURL }) =>
  createClient({
    fetcher: ({ query, variables }) => request(APIURL, query, variables).then((data) => ({ data }))
  });
