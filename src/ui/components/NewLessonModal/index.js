import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Api
import {
    getCurrentUser,
    getDayHeartRate,
} from '../../../api/lookups';
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

//Styles
import './new-lesson-modal.css'

const Footer = (props) => {
    const { createLesson, hideModal } = props;
    return (
        <div className='student-modal-footer-container'>
            <div className='student-modal-footer-btn-container'>
                <button className="btn modal-cancel-btn" onClick={hideModal} style={{ marginTop: '20px' }}>Atšaukti</button>
            </div>
            <div className='student-modal-footer-btn-container'>
                <button className="btn btn-animation-on modal-confirm-button" onClick={createLesson}
                        style={{ marginTop: '20px' }}>Įvesti
                </button>
            </div>
        </div>
    )
}

export default class NewLessonModal extends React.Component {
    state = {
        user: {},
        discipline: '',
        loading: true,
        heartRate: '',
    };

    render() {
        const { visible, hideModal } = this.props;
        const { discipline, loading, heartRate } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<Footer {...{ hideModal }} createLesson={this.createLesson}/>}
            >
                {loading ? (
                    <div  className="create-lesson-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="create-lesson-container">
                        <div className="post-title forum-header">
                            <h2>Įvertinti Pamoką</h2>
                        </div>
                        <div className="create-lesson-body">
                            <div className='discipline-title-container'>
                                <h3>Disciplina: <span className="theme-color_txt">{` ${discipline}`}</span></h3>
                            </div>
                            <form>
                                {/*<div className="heart-rate-input-container">*/}
                                    {/*<h3>Širdies Ritmas:</h3>*/}
                                    {/*<input*/}
                                        {/*type="text"*/}
                                        {/*value={heartRate}*/}
                                        {/*onChange={this.handleHeartRate}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                <div className="grade-select">
                                    <h3>Pažymys</h3>
                                    <select name="grade" id="" ref={(input => this.grade = input)}>
                                        <option value="">Pasirinkti</option>
                                        <option value="10">10</option>
                                        <option value="9">9</option>
                                        <option value="8">8</option>
                                        <option value="7">7</option>
                                        <option value="6">6</option>
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="category-select">
                                    <label htmlFor=""><h3>Parašykite Pamokos Komentarą:</h3></label>
                                    <textarea
                                        name="Text" id=""
                                        cols="30" rows="10"
                                        ref={(input => this.note = input)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        )
    }

    async componentDidMount() {
        const user = await getCurrentUser();
        const heartRate  = await getDayHeartRate();
        if (user && !this.isUnmount) {
            this.setState({ user, heartRate: heartRate || '', discipline: user.discipline, loading: false });
        } else {
            this.setState({ loading: false });
        }

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    handleHeartRate = (event) => this.setState({ heartRate: event.target.value });

    //Create Lesson Handler
    createLesson = async () => {
        const { user, discipline, heartRate } = this.state;
        const { uid, userName, userAvatar } = user || {};
        const date = Date.now();
        const weekDay = moment(date).format('ddd');
        const firstDayOfWeek = moment(date).startOf('isoWeek').format('YYYY-MM-DD');

        //Lesson object to save to DB
        const lesson = {
            teacherId: uid,
            coachName: userName,
            coachAvatar: userAvatar,
            coachNote: this.note.value,
            date,
            weekDay,
            firstDayOfWeek,
            disciplineName: discipline,
            grade: this.grade.value,
            heartRate: heartRate,
            studentAvatar: '',
            studentId: '',
            studentName: '',
        };

        const { error } = await API.createLesson({ lesson });

        if (error) {
            Message.error('Failed To create New Lessons');
        } else {
            Message.success('Pamoka Įvesta Sėkmingai');
            this.props.hideModal();
            this.props.refreshData();

        }
    };

};

NewLessonModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};