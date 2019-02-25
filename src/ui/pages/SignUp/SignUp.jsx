import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//Components
import PageSpinner from '../../components/PageSpinner';

//AntD
import Message from 'antd/lib/message';

//Api
import API from '../../../api/transactions';
import { signOut } from '../../../api/auth';


//Styles
import './sign-up.css';

export default class SignUp extends React.Component {
    state = {
        selectedType: '',
        loading: false,
        isUserSubmitted: false,
    };

    render() {
        const {
            pendingUser
        } = this.props;
        const {
            selectedType,
            loading,
            isUserSubmitted,
        } = this.state;
        const {
            userName,
            userAvatar,
            userStatus
        } = pendingUser || {};

        return pendingUser ? (
            <div>
                {userStatus || isUserSubmitted ? (
                    <div className='sign-up-body'>
                        <div className='card-container header-container'>
                            <h3>Jūsų Vartotojo Anketa Priimta</h3>
                        </div>
                        <div className='card-container section'>
                            <div className='sign-up-user-info-wrapper'>
                                <h4>Laukite kol sistemos administratorius patvirtins jūsų anketą ir galėsite prisijungti.</h4>
                            </div>
                        </div>
                        <div className='card-container section'>
                            <div className='sign-up-user-info-wrapper'>
                                <h4>Dabar galite uždaryti šį langą arba grįžti į prisijungimo puslapį</h4>
                            </div>
                        </div>
                        <div className='section'>
                            <div className='log-out-button-container'>
                                <button onClick={this.handleLogOut} className='btn'>Atgal</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='sign-up-body'>
                        <PageSpinner visible={loading}/>
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

    componentDidMount() {
        //Scroll Page to Top on Start
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    handleTypeClick = (selectedType) => this.setState({ selectedType });

    handleSubmit = async () => {
        const { selectedType } = this.state;
        if (!selectedType) {
            Message.error('Pasirinkite vartotojo Tipą');
            return;
        }
        const { pendingUser } = this.props;
        this.setState({ loading: true });
        await API.submitPendingUser({ uid: pendingUser.uid, type: selectedType });
        this.setState({ loading: false, isUserSubmitted: true });
    };

    handleLogOut = async () => {
        await signOut();
    }
}

SignUp.propTypes = {
    pendingUser: PropTypes.shape({
        userAvatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        userStatus: PropTypes.string,
    }),
};