import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
function ProtectedRoute({ component: Component, children, ...rest }) {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());
    // const currentUserId = useSelector(getCurrentUserId());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) { // if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    match: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    userId: PropTypes.string
};

export default ProtectedRoute;
