import React from 'react';
import { Redirect } from 'react-router-dom';

export default class SignUp extends React.Component {
    render() {
        const { pendingUser } = this.props;
        //console.log(pendingUser);
        return pendingUser ? (
            <div>

            </div>
        ) : (
            <Redirect to={'/'}/>
        )
    }
}