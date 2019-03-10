import React from 'react';
import PropTypes from 'prop-types';


export default class UsersListItem extends React.PureComponent {
    render() {
        const { userName, userAvatar, roles, handleBtnClick, handleRemove, isPendingUser } = this.props;
        return (
            <div className='user-section card-container user-row-section'>
                <div className='user-row-section'>
                    <img src={userAvatar} alt=""/>
                </div>
                <div className='user-row-section'>
                    {userName}
                </div>
                <div className='user-row-section'>
                    {roles.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
                </div>
                <div className='user-row-section' style={{color: isPendingUser ? 'red' : 'yellowGreen'}}>
                    {isPendingUser ? 'Pending' : 'Confirmed'}
                </div>
                <div className='user-section-button-container update-btn'>
                    <button
                        className='btn'
                        onClick={handleBtnClick}
                    >
                        {isPendingUser ? 'Patvirtinti Vartotoją' : 'Pakeisti Roles'}
                    </button>
                </div>
                <div className='user-section-button-container remove-btn'>
                    <button
                        className='btn'
                        onClick={handleRemove}
                    >
                        Ištrinti Vartotoją
                    </button>
                </div>
            </div>
        )
    }
}

UsersListItem.propTypes = {
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleBtnClick: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    isPendingUser: PropTypes.bool.isRequired,
};
