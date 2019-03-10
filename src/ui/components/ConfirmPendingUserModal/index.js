import React from 'react';
import PropTypes from 'prop-types';

//Api
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

export default class ConfirmPendingUserModal extends React.Component {
    state = {
        loading: false,
    };

    render() {
        const { visible, hideModal } = this.props;
        const { loading } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                onOk={this.handleConfirm}
                okText={'Taip'}
                okButtonProps={{ style: { backgroundColor: 'rgb(97, 218, 251)', border: '1px solid rgb(97, 218, 251)' } }}
                cancelText={'Atšaukti'}
                width={'600px'}
            >
                <div className="heart-rate-modal-container">
                    {loading && (
                        <div className='spinner-overlay-container'>
                            <Spin/>
                        </div>
                    )}
                    <div>
                        <div>
                            <h2>Ar tikrai Norite Patvirtinti šį vartotoją ir leisti jam jungtis prie sistemos?</h2>
                        </div>

                    </div>

                </div>
            </Modal>
        )
    }

    handleConfirm = async () => {
        const { user } = this.props;
        this.setState({ loading: true });
        const { error } = await API.confirmPendingUser({ uid: user.id });
        if (error) {
            Message.error('Failed Confirm');
            this.setState({ loading: false });
        } else {
            Message.success('Vartotojas Patvirtintas Sėkmingai');
            this.props.hideModal();
            this.props.refreshData();
        }
    }

};

ConfirmPendingUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};