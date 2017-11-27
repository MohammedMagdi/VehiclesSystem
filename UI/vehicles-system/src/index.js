import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import UserLogin from './UserLogin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserLogin />, document.getElementById('root'));
registerServiceWorker();
