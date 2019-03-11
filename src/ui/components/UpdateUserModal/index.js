import React from 'react';
import PropTypes from 'prop-types';


import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

import './update-user-modal.css';

const Footer = (props) => {
    const { updateUserRoles, hideModal } = props;
    return (
        <div className='student-modal-footer-container'>
            <div className='student-modal-footer-btn-container'>
                <button
                    className="btn modal-cancel-btn"
                    onClick={hideModal}
                    style={{ marginTop: '20px' }}
                >
                    Atšaukti
                </button>
            </div>
            <div className='student-modal-footer-btn-container'>
                <button className="btn btn-animation-on modal-confirm-button"
                        style={{ marginTop: '20px' }}
                        onClick={updateUserRoles}
                >
                    Patvirtinti
                </button>
            </div>
        </div>
    )
};

export default class UpdateUserModal extends React.Component {
    state = {
        roles: [],
        loading: false,
        discipline: '',
    };

    render() {
        const { visible, hideModal } = this.props;
        const { roles, loading, discipline } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<Footer {...{ hideModal }} updateUserRoles={this.updateUserRoles}/>}
            >
                <div className="update-user-modal-container">
                    {loading && (
                        <div className='spinner-overlay-container'>
                            <Spin/>
                        </div>
                    )}
                    <div>
                        <div className='update-user-modal-section-title'>
                            <h2>Pažymėk Vartotojo Roles</h2>
                        </div>
                        <div className="create-lesson-body">
                            <form>
                                <div className="heart-rate-input-container">
                                    <h2>Admin</h2>
                                    <input
                                        type="checkbox"
                                        name="admin"
                                        value="admin"
                                        onChange={this.handleAdminCheck}
                                        checked={roles.includes('admin')}
                                    />
                                </div>
                                {['teacher', 'parent', 'student'].map((role) => (
                                    <div
                                        className="roles-input-container"
                                        key={role}
                                    >
                                        <h2>{role}</h2>
                                        <input
                                            type="radio"
                                            name={role}
                                            value={role}
                                            onChange={this.changeUserRoles.bind(this, role)}
                                            checked={roles.includes(role)}
                                        />
                                    </div>
                                ))}
                            </form>
                        </div>
                        {roles.includes('teacher') && (
                            <div>
                                <div className='update-user-modal-section-title'>
                                    <h2>Mokytojo Disciplina</h2>
                                </div>
                                <div className="create-lesson-body">
                                    <div className="update-user-modal-input-container">
                                        <input
                                            type="text"
                                            value={discipline}
                                            onChange={this.handleDisciplineChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        )
    }

    componentDidMount() {
        const { roles, user } = this.props;
        this.setState({ roles, discipline: user.discipline || '' });

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    changeUserRoles = async (role) => {
        const roles = this.state.roles.slice();
        if (roles.includes('admin')) {
            this.setState({ roles: ['admin', role] });
        } else {
            this.setState({ roles: [role] })
        }

    };

    handleAdminCheck = () => {
        const roles = this.state.roles.slice();
        if (roles.includes('admin')) {
            roles.splice(roles.indexOf('admin'), 1);
        } else {
            roles.push('admin');
        }
        this.setState({ roles });
    };

    updateUserRoles = async () => {
        const { roles, discipline } = this.state;
        const { user } = this.props;
        this.setState({ loading: true });
        user.roles = roles;
        if (user.roles.includes('teacher')) {
            user.discipline = discipline;
        }
        const { error } = await API.updateUser({ uid: user.id, user });

        if (error) {
            Message.error('Failed To Update User');
        } else {
            Message.success('Vartotojo Roles Atnaujintos');
            this.props.hideModal();
            this.props.refreshData();
        }
    };

    handleDisciplineChange = (e) => this.setState({ discipline: e.target.value });

};

UpdateUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    refreshData: PropTypes.func.isRequired,
    isPendingUser: PropTypes.bool.isRequired,
};