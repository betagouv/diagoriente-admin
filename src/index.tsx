import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

reactDom.render(<App />, document.getElementById('root') as HTMLElement);
serviceWorker.unregister();
