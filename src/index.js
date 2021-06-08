import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

import './index.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk))); // variable to hold global data

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
