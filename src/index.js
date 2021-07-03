import 'globalthis/auto';
import 'react-app-polyfill/stable';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from './store';
import { getLibrary } from './lib/web3-react-bsc';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Web3ReactProvider } from '@web3-react/core';
import { Bsc } from './pages/Home/bsc';

import { Leva, useControls } from 'leva';
import { Eth } from './pages/Home/eth';
import { Modal } from './components/Modal';

if (process.env.NODE_ENV == 'production') {
  Sentry.init({
    dsn: 'https://3731f73d7eaf4e008d0409f867665f99@o563381.ingest.sentry.io/5703305',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
}
const App = () => {
  const { lang, base, dev } = useStore();
  const setting = useControls({ devUI: dev.devUI, devPool: dev.devPool });
  useEffect(() => {
    lang.init();
    base.init();
  }, []);
  useEffect(() => {
    Object.assign(dev, setting);
  }, [setting]);

  return (
    <React.StrictMode>
      <Leva hidden={!dev.dev} />
      <Modal />
      <Router>
        <Switch>
          <Route exact path="/bsc">
            <Web3ReactProvider getLibrary={getLibrary}>
              <Bsc />
            </Web3ReactProvider>
          </Route>
          <Route exact path="/eth">
            <Web3ReactProvider getLibrary={getLibrary}>
              <Eth />
            </Web3ReactProvider>
          </Route>
          <Redirect to={'/bsc'} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
