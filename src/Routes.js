import React, { Component } from 'react';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';
import Home from './core/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashboard';
import Signin from './user/Signin';


const Routes = () => {          /*es6 way*/
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />  {/* exact is used to mount the component on the mentioned route otherwise it will  appear in every route */}
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
           
            <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
        </Switch> 
        </BrowserRouter>
    )
}
export default Routes;
