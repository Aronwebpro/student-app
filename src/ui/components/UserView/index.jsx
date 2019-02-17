import React from 'react';
import PropTypes from 'prop-types';

//Components
import Spinner from '../Spinner/index';

//Styles
import './user-view.css';

export default class UserView extends React.PureComponent {
    render() {
        const { userAvatar, userName, coach } = this.props;

        if (!userAvatar || !userName) {
            return (
                <Spinner/>
            )
        }
        return (
            <div className='user-view-container'>
                {coach && (
                    <div className="user-view-header">
                        <h2>Ivertino</h2>
                    </div>
                )}
                <div className="author-avatar">
                    <img src={userAvatar} alt="Coach"/>
                </div>
                <div className='user-view-title'>
                    {coach && (
                        <h2>Mokytojas</h2>
                    )}
                    <h3>
                        <span className="theme-color_txt author">{userName}</span>
                    </h3>
                </div>

            </div>
        )
    }
}

UserView.propTypes = {
    userAvatar: PropTypes.string,
    userName: PropTypes.string,
};