import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = (props) => {
    const { user } = props;
    return (
        user ? (
            <Route {...props} />
        ) : (
            <Redirect to={'/'} push />
        )
    );
};
//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(AuthenticatedRoute);

AuthenticatedRoute.propTypes = {
    user: PropTypes.object,
    path: PropTypes.string.isRequired,
    render: PropTypes.func,
    component: PropTypes.func,
};


