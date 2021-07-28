import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {checkDados} = useContext(Context);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!checkDados ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};


export default PrivateRoute