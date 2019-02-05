import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//Styles
import './sign-up.css';

export default class SignUp extends React.Component {
    state = {
        selectedType: '',
    };

    render() {
        const {
            pendingUser
        } = this.props;
        const {
            selectedType
        } = this.state;
        const {
            userName,
            userAvatar,
            userStatus
        } = pendingUser || {};

        return pendingUser ? (
            <div>
                {userStatus ? (
                    <div>
                        {/*TODO:*/}
                    </div>
                ) : (
                    <div className='sign-up-body'>
                        <div className='card-container header-container'>
                            <h3>Dar keli žingsniai prisiregistruojant</h3>
                        </div>
                        <div className='card-container section'>
                            <div className='sign-up-user-info-container'>
                                <div className='sign-up-user-info-wrapper'>
                                    <h4>Vartotojo vardas</h4>
                                </div>
                                <div className='sign-up-user-info-wrapper'>
                                    <h4 className='bold'>{userName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className='card-container section'>
                            <div className='sign-up-user-info-container'>
                                <div className='sign-up-user-info-wrapper'>
                                    <div className='sign-up-user-avatar'>
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='section card-container'>
                            <h4 className='center'>Pasirink Vartotojo Tipą</h4>
                            <div className='sign-up-user-button-container'>
                                <div className='sign-up-user-button-wrapper'>
                                    <button
                                        className={`btn user-type-button ${selectedType === 'teacher' && 'active'}`}
                                        onClick={this.handleTypeClick.bind(this, 'teacher')}
                                    >
                                        Mokytojas
                                    </button>
                                </div>
                                <div
                                    className='sign-up-user-button-wrapper'
                                >
                                    <button
                                        className={`btn user-type-button ${selectedType === 'parent' && 'active'}`}
                                        onClick={this.handleTypeClick.bind(this, 'parent')}
                                    >
                                        Tėvai
                                    </button>
                                </div>
                                <div className='sign-up-user-button-wrapper'>
                                    <button
                                        className={`btn user-type-button ${selectedType === 'student' && 'active'}`}
                                        onClick={this.handleTypeClick.bind(this, 'student')}
                                    >
                                        Mokinys
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='section'>
                            <div className='submit-container'>
                                <button onClick={this.handleSubmit} className='btn'>Patvirtinti</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <Redirect to={'/'}/>
        )
    }

    handleTypeClick = (selectedType) => this.setState({ selectedType });

    handleSubmit = () => {
        //TODO:
    }
}

SignUp.propTypes = {
    pendingUser: PropTypes.shape({
        userAvatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        userStatus: PropTypes.string,
    }).isRequired,
};