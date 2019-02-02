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
                            <button
                                className="new-topic-button btn"
                                onClick={this.handleCreateNewLesson}
                            >
                                Ivesti Nauja Pamoką
                            </button>
                        </div>
                    );
                } else {
                    return
                }
            case 'lesson' :
                if (user) {
                    return (
                        <div className='navigation-button-wrapper'>
                            <Link
                                to="/"
                                className="back-button btn"
                            >
                                Atgal
                            </Link>
                            <button
                                onClick={this.handleReplyWithUser}
                                className="new-comment-button btn"
                            >
                                Naujas Komentaras
                            </button>
                        </div>
                    )
                } else {
                    return <div/>
                }
            case 'new' :
                return (
                    <div className='navigation-button-wrapper'>
                        <Link
                            to="/"
                            className="back-button btn"
                        >
                            Atgal
                        </Link>
                        <button
                            onClick={reset}
                            className="new-comment-button btn"
                        >
                            Restartuoti
                        </button>
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    handleReplyWithUser = () => {
        const { sideBarButtonActions } = this.props;
        sideBarButtonActions.handleNewCommentModal();
    };

    handleCreateNewLesson = () => {
        const { sideBarButtonActions } = this.props;
        sideBarButtonActions.handleNewLessonModal();
    }


};

PropTypes.SidebarButtons = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
};