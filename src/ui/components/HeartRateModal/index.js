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

export default class HeartRateModal extends React.Component {
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
                footer={<Footer {...{ hideModal }} createLesson={this.createLesson}/>}
            >
                {loading ? (
                    <div className="create-lesson-spin-body">
                        <Spin size={'large'}/>
                    </div>
                ) : (
                    <div className="create-lesson-container">
                        <div className="post-title forum-header">
                            <h2>Įvesti Dienos Širdies Ritmą</h2>
                        </div>
                        <div className="create-lesson-body">
                            <form>
                                <div className="heart-rate-input-container">
                                    <h3>Širdies Ritmas:</h3>
                                    <input
                                        type="text"
                                        name="heartRate"
                                        value={heartRate}
                                        onChange={() => {}}
                                        ref={(input) => this.heartRate = input}
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
        const { heartRate } = await getDayHeartRate();
        if (user && !this.isUnmount) {
            this.setState({ heartRate, loading: false });
        } else {
            this.setState({ loading: false });
        }

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    handleHeartRate = (heartRate) => this.setState({ heartRate: heartRate.target.value});


    //Create Lesson Handler
    createLesson = async () => {

        const date = Date.now();
        const heartRateId = moment().format('YYYY-MM-DD');
        const heartRate = this.heartRate.value;

        const { error } = await API.insertHeartRate({ heartRate, heartRateId, date });

        if (error) {
            Message.error('Failed To Insert Heart Rate');
        } else {
            Message.success('Širdies Ritmas Įvestas Sėkmingai');
            this.props.hideModal();
            this.props.refreshData();
        }
    };

};

HeartRateModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};