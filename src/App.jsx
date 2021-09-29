import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/containers/Home'
import UserProfile from './components/containers/UserProfile'
import SignIn from './components/containers/SignIn';

import { GlobalStyle } from './style/global_style'



const App = () => {
    
    return (
        <div className="App">
            <div className="container" style={{height:'100%', width:'100%', position:'fixed'}}>
                <GlobalStyle />
                    <Router>
                        <Header /> {/* INSIDE router because contains NAV with 'LINK TO'  */}

                        <Fragment>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/home" />} />
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/user" component={UserProfile} />
                                <Route exact path="/signIn" component={SignIn} />
                            </Switch>
                        </Fragment>

                        </Router>
                    <Footer />
            </div>
        </div>
    )
}
export default App

