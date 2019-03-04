import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Api
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';
import DatePicker from 'antd/lib/date-picker';

//Styles
import './event-modal.css';

const ModalFooter = (props) => {
    const { submit, hideModal, id } = props;
    return (
        <div className='student-modal-footer-container'>
            <div className='student-modal-footer-btn-container'>
                <button className="btn modal-cancel-btn" onClick={hideModal} style={{ marginTop: '20px' }}>Atšaukti</button>
            </div>
            <div className='student-modal-footer-btn-container'>
                <button
                    className="btn btn-animation-on modal-confirm-button"
                    onClick={submit}
                    style={{ marginTop: '20px' }}
                >
                    {id ? 'Atnaujinti' : 'Įvesti'}
                </button>
            </div>
        </div>
    )
};

export default class EventModal extends React.Component {
    state = {
        loading: false,
        title: '',
        start: moment(),
        end: moment(),
        isAllDay: false,
        createEventLoading: false,
        id: undefined,
    };

    render() {
        const {
            visible,
            hideModal
        } = this.props;
        const {
            loading,
            title,
            createEventLoading,
            start,
            end,
            id,
            isAllDay,
        } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<ModalFooter {...{ hideModal, id }} submit={id ? this.handleUpdate : this.handleSubmit}/>}
            >
                {loading ? (
                    <div className="event-modal-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="event-modal-container">
                        <div className="event-modal-header">
                            <h2>Įvesti Naują Įvykį</h2>
                        </div>
                        <div className="event-modal-body">
                            {createEventLoading && (
                                <div className="event-modal-spin-layer">
                                    <Spin size={'large'}/>
                                </div>
                            )}
                            <form>
                                <div>
                                    <h3>Pavadinimas:</h3>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={this.handleTitleChange}
                                    />
                                </div>
                                <div className="event-modal-time-input">
                                    <div className="event-modal-time-input-column">
                                        <h3>Pradžios data ir laikas:</h3>
                                        <DatePicker
                                            onChange={this.handleStartTime}
                                            showTime
                                            defaultValue={start}
                                        />
                                    </div>
                                    <div className="event-modal-time-input-column">
                                        <h3>Pabaigos data ir laikas:</h3>
                                        <DatePicker
                                            onChange={this.handleEndTime}
                                            showTime
                                            defaultValue={end}
                                        />
                                    </div>
                                </div>
                                <div className="event-modal-all-day-checkbox">
                                    <h3>Visa Diena:</h3>
                                    <input
                                        type="checkbox"
                                        name="allDay"
                                        value="isAllDay"
                                        onChange={this.handleIsAllDay}
                                        checked={isAllDay}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        )
    }

    componentDidMount() {
        const { event } = this.props;
        if (event) {
            const {
                id,
                title,
                start,
                end,
                isAllDay,
            } = event;
            this.setState({id, title, start: moment(start), end: moment(end), isAllDay: isAllDay || false });
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Update Event
    handleUpdate = async () => {
        //TODO: Validation
        this.setState({ createEventLoading: true });
        const { hideModal } = this.props;
        const { title, start, end, isAllDay, id } = this.state;
        const { error } = await API.updateEvent({
            title,
            start: start.toDate(),
            end: end.toDate(),
            isAllDay,
            id,
        });

        if (error) {
            Message.error('Atnaujinti Nepavyko');
            this.setState({ createEventLoading: false });
        } else {
            Message.success('Atnaujinta Sėkmingai.');
            hideModal();
        }
    };

    //Create Event
    handleSubmit = async () => {
        //TODO: Validation
        this.setState({ createEventLoading: true });
        const { hideModal } = this.props;
        const { title, start, end, isAllDay } = this.state;
        const { error } = await API.createEvent({
            title,
            start: start.toDate(),
            end: end.toDate(),
            isAllDay
        });
        if (error) {
            Message.error('Įvesti Nepavyko');
            this.setState({ createEventLoading: false });
        } else {
            Message.success('Įvesta Sėkmingai.');
            hideModal();
        }
    };

    //Event Input Handlers
    handleTitleChange = (e) => this.setState({ title: e.target.value });
    handleStartTime = (date, dateString) => this.setState({ start: date });
    handleEndTime = (date, dateString) => this.setState({ end: date });
    handleIsAllDay = () => {
        const { isAllDay } = this.state;
        this.setState({ isAllDay: !isAllDay });
    }
};

EventModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};