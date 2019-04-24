import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import localforage from 'localforage';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import store, { persistor, history } from './config/store';
import RootContainer from './containers/RootContainer';
import './App.scss';

localforage.config({
  driver: localforage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
  name: 'myApp',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description: 'some description',
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            fontFamily: "'Poppins', sans-serif",
            useNextVariants: true,
          },
        })}
      >
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <PersistGate loading={null} persistor={persistor}>
              <RootContainer />
            </PersistGate>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
