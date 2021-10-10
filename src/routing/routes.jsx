import { lazy } from 'react';
import UserProfile from '../components/containers/UserProfile'


// Authenticated routes
const routes = [
    {
        path: 'user',
        component: UserProfile,
       /*  component: lazy(() => import('./components/containers/UserProfile')), */
        exact: true
    }
];

export default routes;