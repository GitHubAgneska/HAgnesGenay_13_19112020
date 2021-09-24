import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from ''
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import NavSide from './components/layout/Nav_side';
import { GlobalStyle } from './style/global_style';


const App = () => {
    
    return (
        <div className="App">
            <div className="container" style={{height:'100%', width:'100%', position:'fixed'}}>
                <GlobalStyle />
                    <Router>
                        <Header /> {/* INSIDE router because contains NAV with 'LINK TO'  */}
                        <NavSide /> {/* same  */}
                        <Fragment>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/home" />} />
                                <Route exact path="/userProfile/:id" component={Home} />
                            </Switch>
                        </Fragment>
                    </Router>
            </div>
        </div>
    )
}
export default App

