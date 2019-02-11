import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import changeNewLessonModalState from '../../../redux/actions/changeNewLessonModalState';
import changeHeartRateModalState from '../../../redux/actions/changeHeartRateModalState';

//Style
import './sidebarButtons.css';

class SidebarButtons extends React.PureComponent {
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
            sideBarButtonState,
        } = this.props;

        const { heartRate } = sideBarButtonState;

        switch (page) {
            case 'home' :
                if (user && user.role === 'teacher') {
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
                } else if (user && user.role === 'student' && heartRate !== null && !heartRate) {
                    return (
                        <div className='navigation-button-wrapper'>
                            <button
                                className="new-topic-button btn"
                                onClick={this.handleHeartRate}
                            >
                                Ivesti Širdies Ritma
                            </button>
                        </div>
                    )
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
                                Komentuoti
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
        const { dispatch } = this.props;
        dispatch(changeNewLessonModalState(true));
    };

    handleHeartRate = () => {
        const { dispatch } = this.props;
        dispatch(changeHeartRateModalState(true));
    }
}

PropTypes.SidebarButtons = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        newLessonModalVisible: state.newLessonModal.visible,
        heartRateModalVisible: state.heartRateModal.visible,
    }
};

export default connect(mapStateToProps)(SidebarButtons);