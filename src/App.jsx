import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/containers/Home'
import UserProfile from './components/containers/UserProfile'
import SignIn from './components/containers/SignIn'

import { GlobalStyle } from './style/global_style'
import { useSelector } from 'react-redux';
import PublicRoute from './routing/public-route'
import PrivateRoute from './routing/private-route'
import ProtectedRoutes from './routing/protected-routes'


const App = () => {
    const isConnected = useSelector((isConnected) => isConnected);
    console.log('isConnected=', isConnected);

    return (
        <div className="App">
            <div className="container" style={{height:'100%', width:'100%'}}>
                <GlobalStyle />
                    <Router>
                        <Header /> {/* INSIDE router because contains NAV with 'LINK TO'  */}

                        <Fragment>
                            <Switch>
                                <PublicRoute exact path="/" isConnected={isConnected} render={() => <Redirect to="/home" />} />
                                <PublicRoute exact path="/home" isConnected={isConnected} component={Home} />
                                {/* <Route exact path="/user" component={UserProfile} /> */}
                                <PublicRoute exact path="/signIn" isConnected={isConnected} component={SignIn} />

                                <PrivateRoute path="/user" isConnected={isConnected} >
                                    <ProtectedRoutes />
                                </PrivateRoute>

                            </Switch>
                        </Fragment>

                        </Router>
                    <Footer />
            </div>
        </div>
    )
}
export default App

