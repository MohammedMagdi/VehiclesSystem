import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/bootstrap.css';
import './styles/index.css';
import AdminLogin from './AdminLogin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AdminLogin />, document.getElementById('root'));
registerServiceWorker();
