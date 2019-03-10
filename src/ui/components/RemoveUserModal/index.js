import React from 'react';
import PropTypes from 'prop-types';

//Api
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

export default class RemoveUserModal extends React.Component {
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
                onOk={this.handleRemove}
                okText={'Taip'}
                okButtonProps={{ style: { backgroundColor: '#d81315', border: '1px solid #d81315' } }}
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
                            <h2>Ar tikrai Norite Ištrinti šį vartotoją?</h2>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    handleRemove = async () => {
        const { user, isPendingUser } = this.props;
        this.setState({ loading: true });
        const { error } = await API.removeUser({ uid: user.id, isPendingUser });
        if (error) {
            Message.error('Failed Remove');
            this.setState({ loading: false });
        } else {
            Message.success('Vartotojas Pašalintas Sėkmingai');
            this.props.hideModal();
            this.props.refreshData();
        }
    }
};

RemoveUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isPendingUser: PropTypes.bool.isRequired,
};