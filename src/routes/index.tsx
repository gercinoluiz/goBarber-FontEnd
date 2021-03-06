import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './Route'
import Signin from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword/index';
import ResetPassword from '../pages/ResetPassword/index';
import Profile from '../pages/Profile/index';


const Routes: React.FC = () => {

    return (
        <BrowserRouter>

            <Switch>
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route exact path='/' component={Signin} />
                <Route path='/signup' component={SignUp} />
                <Route isPrivate path='/dashboard' component={Dashboard} />
                <Route path='/reset-password' component={ResetPassword} />
                <Route path='/profile' component={Profile} isPrivate></Route>
            </Switch>

        </BrowserRouter>
    )

}


export default Routes;