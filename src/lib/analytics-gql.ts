import { createClient } from '../../generated/gql/createClient';
import { request } from 'graphql-request';
import Config from '../Config';

export const analyticsClient = createClient({
  fetcher: ({ query, variables }) => request(Config.analyticsURL, query, variables).then((data) => ({ data })),
});

export const createAnalyticsIotexCilent = ({ APIURL }) =>
  createClient({
    fetcher: ({ query, variables }) => request(APIURL, query, variables).then((data) => ({ data })),
  });
