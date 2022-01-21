import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes'; // Route list
// import Loader from 'sharedComponent/Loader';

// -- draft : unused atm
const ProtectedRoutes = ( ) => (
    <Switch>
        <Suspense fallback={"loading.."}>
       {/*  <Suspense fallback={<Loader />}> */}

        { routes.map(({ component: UserProfile, path, exact }) => (
            <Route  path={`/${path}`} key={path}  exact={exact} >
                <UserProfile />
            </Route>
        ))}
        </Suspense>
    </Switch>
);

export default ProtectedRoutes;