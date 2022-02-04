import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, isConnected }) => {
/* const PrivateRoute = ({ component: Component, isConnected, ...rest }) =>  {
 */
  return (
    <Route
      render={(props) => (
        isConnected
          ? <Component component={Component} />
          : (<Redirect to={{ pathname: '/signIn' }} />))
                /*  <Component {...props} />
                : ( <Redirect to={{ pathname: '/login', state: { from: props } }} /> )) */
            }
    />
  )
}

PrivateRoute.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired
}
export default PrivateRoute
