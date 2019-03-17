import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CompactPicker } from 'react-color';

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
    const { submit, hideModal, id, handleRemove } = props;
    return (
        <div className='student-modal-footer-container'>
            {id && (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <button
                        className="btn btn-animation-on modal-confirm-button modal-remove-button"
                        onClick={handleRemove}
                        style={{}}
                    >
                        Ištrinti Įrašą
                    </button>
                </div>
            )}
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
        start: moment().startOf('hour'),
        end: moment().add('hour', 1).startOf('hour'),
        isAllDay: false,
        createEventLoading: false,
        id: undefined,
        color: '#61dafb',
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
                footer={
                    <ModalFooter
                        {...{ hideModal, id }}
                        submit={id ? this.handleUpdate : this.handleSubmit}
                        handleRemove={this.handleRemove}
                    />
                }
            >
                {loading ? (
                    <div className="event-modal-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="event-modal-container">
                        <div className="event-modal-header">
                            <h2 style={{ color: '#61dafb' }}>{`${title ? 'Atnaujinti' : 'Įvesti'} `}Pamoką</h2>
                        </div>
                        <div className="event-modal-body">
                            {createEventLoading && (
                                <div className="event-modal-spin-layer">
                                    <Spin size={'large'}/>
                                </div>
                            )}
                            <form>
                                <div>
                                    <h3>Pamokos Pavadinimas:</h3>
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
                                <div className="event-modal-color-picker">
                                    <h3>Parinkite Pamokos Spalvą</h3>
                                    <p>(Ši spalva bus atvaizuota kaliandoriuje)</p>
                                    <div className="color-container">
                                        <div className="color-title-container">
                                            <div
                                                className="color-box"
                                                style={{ backgroundColor: this.state.color }}
                                            />
                                        </div>
                                        <div className="color-picker">
                                            <CompactPicker
                                                color={this.state.color}
                                                onChangeComplete={this.handleChangeComplete}
                                            />
                                        </div>
                                    </div>
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
                color,
            } = event;
            this.setState(
                {
                    id,
                    title,
                    start: moment(start),
                    end: moment(end),
                    isAllDay: isAllDay || false,
                    color: color || '#61dafb'
                }
            );
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Update Event
    handleUpdate = async () => {
        this.setState({ createEventLoading: true });
        const { hideModal, updateScreen } = this.props;
        const { title, start, end, isAllDay, id, color } = this.state;
        const { error } = await API.updateEvent({
            title,
            start: start.toDate(),
            end: end.toDate(),
            isAllDay,
            id,
            color,
        });

        if (error) {
            Message.error('Atnaujinti Nepavyko');
            this.setState({ createEventLoading: false });
        } else {
            Message.success('Atnaujinta Sėkmingai.');
            hideModal();
            updateScreen();
        }
    };

    //Create Event
    handleSubmit = async () => {
        this.setState({ createEventLoading: true });
        const { hideModal, updateScreen } = this.props;
        const { title, start, end, isAllDay, color } = this.state;
        if (!title) {
            Message.error(' Įveskite Pamokos Pavadinimą');
            this.setState({ createEventLoading: false });
            return
        }
        const { error } = await API.createEvent({
            title,
            start: start.toDate(),
            end: end.toDate(),
            isAllDay,
            color,
        });
        if (error) {
            Message.error('Įvesti Nepavyko');
            this.setState({ createEventLoading: false });
        } else {
            Message.success('Įvesta Sėkmingai.');
            hideModal();
            updateScreen();
        }
    };

    handleRemove = async () => {
        const { hideModal, updateScreen } = this.props;
        const { id } = this.state;
        const { error } = await API.removeEvent({ id });
        if (error) {
            Message.error('Ištrinti Nepavyko');
            this.setState({ createEventLoading: false });
        } else {
            Message.success('Įrašas Ištrintas Sėkmingai.');
            hideModal();
            updateScreen();
        }
    };

    //Event Input Handlers
    handleTitleChange = (e) => this.setState({ title: e.target.value });
    handleStartTime = (date, dateString) => this.setState({ start: date });
    handleEndTime = (date, dateString) => this.setState({ end: date });
    handleIsAllDay = () => {
        const { isAllDay } = this.state;
        this.setState({ isAllDay: !isAllDay });
    };

    //Handle Color Change
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };
};

EventModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    updateScreen: PropTypes.func.isRequired,
};