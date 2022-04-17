import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

PrivateRoute.propTypes = {

};

function PrivateRoute({ component: Component, ...rest }) {
    const isLoginned = Boolean(useSelector(state => state.user.user.id));
    return (
        <Route
            {...rest}
            render={props => {
                return isLoginned ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/products' />

                );
            }}
        />
    )

}

export default PrivateRoute;