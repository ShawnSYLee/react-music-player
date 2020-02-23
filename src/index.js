import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fonts/Futura_PT_Light.ttf';
import './fonts/Futura_PT_Book.ttf';
import './fonts/Futura_PT_Medium.ttf';
import './fonts/Futura_PT_Heavy.ttf';
import './fonts/Futura_PT_ExtraBold.ttf';

ReactDOM.render((
  <App />
), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
