import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import UserLogin from './pages/UserLogin';
import AdminPage from './pages/AdminPage';
import AddNewVehicle from './pages/AddNewVehicle';
import RegisterUser from './pages/RegisterUser';
import NotFound from './pages/NotFound';
import StringsModel from './resources/StringsModel';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter >
        <Switch>
            <Route path={StringsModel.HomeUrl} exact component={AddNewVehicle} customHistory={customHistory} />
            <Route path={StringsModel.LoginUrl} exact component={UserLogin} customHistory={customHistory} />
            <Route path={StringsModel.RegisterUrl} exact component={RegisterUser} customHistory={customHistory} />
            <Route path={StringsModel.AdminUrl} exact component={AdminPage} customHistory={customHistory} />
            <Route component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
