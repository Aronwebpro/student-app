import React from 'react';
import PropTypes from 'prop-types';

//Components
import Spinner from '../Spinner/index';


export default class UserView extends React.PureComponent {
    render() {
        const { userAvatar, userName, coach } = this.props;

        if (!userAvatar || !userName) {
            return (
                <Spinner/>
            )
        }
        return (
            <div>
                <div className="topic-meta theme-color_txt">
                    <p>
                        Ivertino
                    </p>
                </div>
                <div className="author-avatar">
                    <img src={userAvatar} alt="Author Avatar"/>
                </div>
                <div className="topic-meta theme-color_txt">
                    {coach && (
                        <p>Mokytojas</p>
                    )}
                    <p>
                        <span className="author">{userName} </span>
                    </p>
                </div>
            </div>
        )
    }
}

UserView.propTypes = {
    userAvatar: PropTypes.string,
    userName: PropTypes.string,
};