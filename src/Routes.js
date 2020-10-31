import React from 'react';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';
import Home from './core/Home';


const Routes = () => {          {/*es6 way*/}
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />  {/* exact is used to mount the component on the mentioned route otherwise it will  appear in every route */}
          
        </Switch> 
        </BrowserRouter>
    )
}
export default Routes;
