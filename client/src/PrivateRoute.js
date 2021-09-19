import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isExist } from "./components/User/Profile/apiCore";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isExist() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/profile",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;