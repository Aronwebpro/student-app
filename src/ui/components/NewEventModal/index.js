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
import './new-event-modal.css';

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
//TODO: 
export default class NewEventModal extends React.Component {
    state = {
        user: {},
        discipline: '',
        loading: true,
        heartRate: '',
    };

    render() {
        const { visible, hideModal } = this.props;
        const { loading, heartRate } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<Footer {...{ hideModal }} createLesson={this.submitHeartRate}/>}
            >
                {loading ? (
                    <div className="heart-rate-modal-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="heart-rate-modal-container">

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


    //Create Lesson Handler
    submitSubmit = async () => {

    }
};

NewEventModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};