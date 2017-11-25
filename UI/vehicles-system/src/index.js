import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/bootstrap.css';
import './styles/index.css';
import UserLogin from './UserLogin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserLogin />, document.getElementById('root'));
registerServiceWorker();
