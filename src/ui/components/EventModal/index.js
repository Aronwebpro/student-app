import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';
import DatePicker from 'antd/lib/date-picker';

//Styles
import './event-modal.css';

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
};

export default class EventModal extends React.Component {
    state = {
        loading: false,
        title: '',
        start: null,
        end: null,
    };

    render() {
        const { visible, hideModal } = this.props;
        const { loading, title } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<Footer {...{ hideModal }} createLesson={this.submitHeartRate}/>}
            >
                {loading ? (
                    <div className="event-modal-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="event-modal-container">
                        <form>
                            <div>
                                <h3>Pavadinimas:</h3>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            <div>
                                <h3>Pradžios laikas:</h3>
                                <DatePicker
                                    onChange={this.handleStartTime}
                                    showTime
                                />
                            </div>
                            <div>
                                <h3>Pabaigos laikas:</h3>
                                <DatePicker
                                    onChange={this.handleEndTime}
                                    showTime
                                />
                            </div>
                            <div>
                                <input type="checkbox" name="allDay" value="allDay" onChange={this.handleIsAllDay}/>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        )
    }

    async componentDidMount() {

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    handleTitleChange = (e) => this.setState({ title: e.target.value });

    handleStartTime = (date, dateString) => this.setState({ start: date });

    handleStartTime = (date, dateString) => this.setState({ end: date });

    handleIsAllDay = (e) => this.setState({ isAllDay: e.target.value });

    //Create Lesson Handler
    submitSubmit = async () => {

    }
};

EventModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};