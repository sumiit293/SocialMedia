import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isUserLoggedIn, loading, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => !isUserLoggedIn && !loading ? <Redirect to="/login" /> : <Component {...props} />}
        />
    )
};
const mapStateToProps = (state) => ({
    isUserLoggedIn: state.loginReducer.loggedInUser,
    loading: state.loginReducer.isLoading
});
export default connect(mapStateToProps, null)(PrivateRoute);
