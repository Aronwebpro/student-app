import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Style
import './sidebarButtons.css';

export default class SidebarButtons extends React.PureComponent {
    render() {
        return (
            <div className="navigation-buttons">
                {this.sidebarButtons()}
            </div>
        )
    }

    sidebarButtons = () => {
        const {
            reset,
            user,
            page,
        } = this.props;

        switch (page) {
            case 'home' :
                if (user && user.role === 'coach') {
                    return (
                        <div className='navigation-button-wrapper'>
                            <Link to="/newPost" className="new-topic-button btn">Ivesti Nauja Pamoką</Link>
                        </div>
                    );
                } else {
                    return
                }
            case 'post' :
                if (user) {
                    return (
                        <div className='navigation-button-wrapper'>
                            <Link to="/" className="back-button btn">Atgal</Link>
                            <a onClick={this.handleReplyWithUser} className="new-comment-button btn">
                                Naujas Komentaras
                            </a>
                        </div>
                    )
                } else {
                    return <div />
                }
            case 'new' :
                return (
                    <div className='navigation-button-wrapper'>
                        <Link to="/" className="back-button btn">Atgal</Link>
                        <a onClick={reset} className="new-comment-button btn">Restartuoti</a>
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };


};

PropTypes.SidebarButtons = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
};