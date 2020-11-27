import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';


type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
};
const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...routeProps
}) => {
  
  return (
    <Route
      {...routeProps}
      render={(props) =>
        localStorage.getItem('token')
         ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {error: 'You need to be logged in to access that'}}} />
      }
    />
  );
};


export default PrivateRoute;