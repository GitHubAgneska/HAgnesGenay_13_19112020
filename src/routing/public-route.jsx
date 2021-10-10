import {  Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, isConnected, ...rest }) => {
    return (
        <Route {...rest}
            render={ ({ props }) => ( !isConnected ?
                <Component {...props} />
                : ( <Redirect  to={{ pathname: '/home', state: { from: props } }} />
            ))}
        />
    );
}
PublicRoute.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    component: PropTypes.elementType.isRequired
};
export default PublicRoute;