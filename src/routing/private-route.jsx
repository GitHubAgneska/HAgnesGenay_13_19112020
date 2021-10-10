import { Route,  Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, isConnected, ...rest }) =>  {
    return (
        <Route {...rest} 
            render= { ({ props }) => ( isConnected ? 
                <Component {...props} />
                : ( <Redirect to={{ pathname: '/login', state: { from: props } }} /> ))
            }
        />
    );
}

PrivateRoute.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    component: PropTypes.elementType.isRequired
};
export default PrivateRoute;