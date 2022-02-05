import React, {Fragment, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import PrivateRoute from './routing/private-route'

import { useSelector } from 'react-redux'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import UserProfile from './components/containers/UserProfile'
import SignIn from './components/containers/SignIn'
import SignUpPage from './components/containers/SignUp'
import NotFoundPage from './components/containers/404'

import { GlobalStyle } from './style/global_style'

const Home = lazy(() => import('./components/containers/Home'))


const App = () => {
  // const allState = useSelector((state) => state)
  // console.log('allState=', allState)

  const isConnected = useSelector((state) => state.login.isConnected)
  // console.log('isConnected', isConnected)

  return (
    <div className='App'>
      <div className='container' style={{ height: '100%', width: '100%' }}>
        <GlobalStyle />
        <Router>
          <Header /> {/* INSIDE router because contains NAV with 'LINK TO'  */}

          <Fragment>
              <Suspense fallback={<div>Loading...</div>}>

              <Switch>
                <Route exact path='/' render={() => <Redirect to='/home' />} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/signIn' component={SignIn} />
                <Route exact path='/signup' component={SignUpPage} />

                <PrivateRoute path='/user/:id' component={UserProfile} isConnected={isConnected} />
                <Route component={NotFoundPage} />
              </Switch>

              </Suspense>
            </Fragment>
            
        </Router>
        <Footer />
      </div>
    </div>
  )
}
export default App
