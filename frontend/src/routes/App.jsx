import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AlertaState from '../context/alertas/alertaState';
import AuthState from '../context/autenticacion/authState';
import tokenAuth from '../config/token';
import BookingState from '../context/booking/bookingState';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Layout from '../components/Layout';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

const App = () => {
    return (
       <BookingState>
            <AlertaState> 
                <AuthState>
                    <BrowserRouter>
                        <Layout> 
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/Login" component={Login} />
                            </Switch>
                        </Layout>
                    </BrowserRouter>
                </AuthState> 
            </AlertaState>
       </BookingState>
    );
};

export default App;