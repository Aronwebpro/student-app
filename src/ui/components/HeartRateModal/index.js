import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

//Redux Actions
import setHeartRate from '../../../redux/actions/setHeartRate';

//Api
import {
    getCurrentUser,
} from '../../../api/lookups';
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

//Styles
import './heart-rate-modal.css';

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

class HeartRateModal extends React.Component {
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
                                        onChange={this.handleHeartRate}
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
        const { heartRate } = this.props;
        if (user && !this.isUnmount) {
            this.setState({ heartRate: heartRate || '', loading: false });
        } else {
            this.setState({ heartRate: heartRate || '', loading: false });
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Handle Heart Rate Input
    handleHeartRate = (e) => this.setState({ heartRate: e.target.value });

    //Create Lesson Handler
    submitHeartRate = async () => {
        const { setHeartRate } = this.props;
        const { heartRate } = this.state;
        const date = Date.now();
        const momentObj = moment();
        const heartRateId = momentObj.format('YYYY-MM-DD');
        const month = momentObj.format('YYYY-MM');

        const { error } = await API.insertHeartRate({ heartRate, heartRateId, date, month });
        if (error) {
            Message.error('Failed To Insert Heart Rate');
        } else {
            Message.success('Širdies Ritmas Įvestas Sėkmingai');
            setHeartRate(heartRate);
            this.props.hideModal();
            this.props.refreshData();
        }
    };

}

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        heartRate: state.heartRate.heartRate,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setHeartRate(heartRate) {
            dispatch(setHeartRate(heartRate));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeartRateModal);
HeartRateModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
};