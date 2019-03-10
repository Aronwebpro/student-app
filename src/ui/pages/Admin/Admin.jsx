import React from 'react';

//Api
import {
    getAllUsersAdmin,
    getAllPendingUsersAdmin,
} from '../../../api/lookups';

//Components
import Spinner from '../../components/Spinner';
import UsersListItem from '../../components/UsersListItem';
import ChangeRolesModal from '../../components/ChangeRolesModal';
import RemoveUserModal from '../../components/RemoveUserModal';
import ConfirmPendingUserModal from '../../components/ConfirmPendingUserModal';

//Styles
import './admin.css';

export default class Admin extends React.Component {
    state = {
        users: [],
        selectedUser: {},
        isPageLoading: true,
        isPendingUser: false,
        updateRolesModalVisible: false,
        removeUserModalVisible: false,
        confirmPendingUserModalVisible: false,
    };

    render() {
        const {
            users,
            isPageLoading,
            isPendingUser,
            updateRolesModalVisible,
            removeUserModalVisible,
            selectedUser,
            confirmPendingUserModalVisible,
        } = this.state;
        return (
            <div className="admin-page-container">
                <div className="forum-header">
                    <div className="forum-title">
                        <div className='user-row-section'><h2>Nuotrauka</h2></div>
                        <div className='user-row-section'><h2>Vartotojo Vardas</h2></div>
                        <div className='user-row-section'><h2>Vartotojo Tipai</h2></div>
                        <div className='user-row-section'><h2>Vartotojo Statusas</h2></div>
                        <div className='user-section-button-container'/>
                    </div>
                </div>
                <div className='admin-page-body'>
                    {isPageLoading ? (
                        <div>
                            <Spinner/>
                        </div>
                    ) : (
                        <div>
                            {users.length > 0 ? users.map((user, index) => (
                                    <UsersListItem
                                        {...user}
                                        key={index.toString()}
                                        handleBtnClick={
                                            isPendingUser ?
                                                this.handleConfirmPendingUser.bind(this, user) :
                                                this.handleRolesUpdateClick.bind(this, user)
                                        }
                                        isPendingUser={isPendingUser}
                                        handleRemove={this.handleRemoveUser.bind(this, user)}
                                    />
                                )
                            ) : (
                                <div>
                                    <h2>Vartotojų Nėra.</h2>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {updateRolesModalVisible && (
                    <ChangeRolesModal
                        visible={updateRolesModalVisible}
                        hideModal={this.hideChangeRoleModal}
                        roles={selectedUser.roles}
                        user={selectedUser}
                        refreshData={this.getScreenData}
                        isPendingUser={isPendingUser}
                    />
                )}
                {removeUserModalVisible && (
                    <RemoveUserModal
                        visible={removeUserModalVisible}
                        hideModal={this.hideRemoveUserModal}
                        user={selectedUser}
                        refreshData={this.getScreenData}
                        isPendingUser={isPendingUser}
                    />
                )}
                {confirmPendingUserModalVisible && (
                    <ConfirmPendingUserModal
                        visible={confirmPendingUserModalVisible}
                        hideModal={this.hideConfirmPendingUserModal}
                        user={selectedUser}
                        refreshData={this.getScreenData}
                    />
                )}
            </div>
        )
    }

    async componentDidMount() {
        await this.getScreenData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.params.location.pathname.split('/admin/')[1] !== this.props.params.location.pathname.split('/admin/')[1]) {
            await this.getScreenData();
        }
    }

    getScreenData = async () => {
        const { params } = this.props;
        this.setState({ isPageLoading: true });
        let users = [];
        let isPendingUser;
        switch (params.location.pathname.split('/admin/')[1]) {
            case 'users' :
                users = await getAllUsersAdmin();
                isPendingUser = false;
                break;
            case 'pending-users' :
                users = await getAllPendingUsersAdmin();
                isPendingUser = true;
                break;
            default :
        }
        this.setState({ users, isPageLoading: false, isPendingUser });
    };

    handleRolesUpdateClick = (user) => this.setState({ selectedUser: user, updateRolesModalVisible: true });
    hideChangeRoleModal = () => this.setState({ selectedUser: {}, updateRolesModalVisible: false });

    handleRemoveUser = (user) => this.setState({ selectedUser: user, removeUserModalVisible: true });
    hideRemoveUserModal = () => this.setState({ selectedUser: {}, removeUserModalVisible: false });

    handleConfirmPendingUser = (user) => this.setState({ selectedUser: user, confirmPendingUserModalVisible: true });
    hideConfirmPendingUserModal = () => this.setState({ selectedUser: {}, confirmPendingUserModalVisible: false })

}
