import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//renders the app using the ReactDOM
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
