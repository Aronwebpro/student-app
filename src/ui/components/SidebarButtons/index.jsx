import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Redux Action Creators
import changeNewLessonModalState from '../../../redux/actions/changeNewLessonModalState';
import changeNewCommentModalState from '../../../redux/actions/changeNewCommentModalState';
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
            openNewLessonModal,
            openHeartRateModal,
            openNewCommentModal
        } = this.props;

        const { heartRate } = sideBarButtonState;

        switch (page) {
            case 'home' :
                if (user && user.role === 'teacher') {
                    return (
                        <div className='navigation-button-wrapper'>
                            <button
                                className="new-topic-button btn"
                                onClick={openNewLessonModal}
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
                                onClick={openHeartRateModal}
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
                                onClick={openNewCommentModal}
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
}

PropTypes.SidebarButtons = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
    createNewLesson: PropTypes.func.isRequired,
    submitHeartRate: PropTypes.func.isRequired,
};

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        newLessonModalVisible: state.newLessonModal.visible,
        heartRateModalVisible: state.heartRateModal.visible,
        newCommentModalVisible: state.newCommentModal.visible,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openNewLessonModal() {
            dispatch(changeNewLessonModalState(true));
        },
        openHeartRateModal() {
            dispatch(changeHeartRateModalState(true));
        },
        openNewCommentModal() {
            dispatch(changeNewCommentModalState(true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarButtons);