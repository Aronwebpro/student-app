import React from 'react';
import { Redirect } from 'react-router-dom';

//Api
import { signIn, signInWithFacebook } from '../../../api/auth';

//Antd
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

//Components
import PageSpinner from '../../components/PageSpinner';

//Styles
import './login.css';
import dancer from '../../../assets/img/main_background2.png';

export default class Login extends React.Component {
    state = {
        buttonActive: false,
        loadingPageActive: false,
    };

    render() {
        const { user } = this.props;
        const { buttonActive, loadingPageActive } = this.state;

        return user ? (
            <Redirect to={'/home'}/>
        ) : (
            <div className="container  login-container">
                <PageSpinner visible={loadingPageActive}/>
                <div className="login-wrapper">
                    <div className="form-wrapper facebook-login">
                        <div className="logo-wrapper">
                            <img src={dancer} alt=""/>
                        </div>
                        <h3>Prisijungite su Facebook</h3>
                        <div onClick={this.facebookLogin} className='facebook-logo'>
                            <img src="https://www.carlalbert.edu/wp-content/uploads/2018/03/facebook_logos_PNG19751.png" alt=""/>
                        </div>
                    </div>
                    <h1>Arba</h1>
                    <div className="form-wrapper email-login">
                        <h3>Prisijungite su El. Paštu</h3>
                        <form onSubmit={this.handleLogin}>
                            <label htmlFor="email">Elektroninis Paštas:</label>
                            <input type="text" name="email" ref={input => this.email = input}/>
                            <label htmlFor="">Slaptažodis:</label>
                            <input type="password" name="password" ref={input => this.password = input}/>
                            <button className="btn" type="submit" name="submit">
                                Prisijungti
                                {buttonActive && (
                                    <span className='spin-container'><Spin size="small"/></span>
                                )}
                            </button>
                        </form>
                    </div>
                    {/*<h1>Testavimui</h1>*/}
                    {/*<div className="form-wrapper test-login">*/}
                    {/*<h3>Prisijungite kaip</h3>*/}
                    {/*<div className="tes-login-links">*/}
                    {/*<div className='login-box-wrapper'>*/}
                    {/*<div onClick={this.loginAsParent} className='btn login-box'>*/}
                    {/*<h4>Tevai</h4>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className='login-box-wrapper'>*/}
                    {/*<div onClick={this.loginAsStudent} className='btn login-box'>*/}
                    {/*<h4>Mokinys</h4>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className='login-box-wrapper'>*/}
                    {/*<div onClick={this.loginAsTeacher} className='btn login-box'>*/}
                    {/*<h4>Mokytojas</h4>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

    componentDidMount() {
        //Scroll Page to Top on Start
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Login User With Email
    handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this;
        this.setState({ buttonActive: true });
        try {
            //Sign In User and get user's data
            const user = await signIn(email.value, password.value);
            //Set Flash message and save to DB
            if (user) {
                Message.success('Prisijungta sėkmingai!');
                if (!this.isUnmount) {
                    this.setState({ redirect: true });
                }
            }
        }
        catch (error) {
            this.password.value = '';
            Message.error(error.message);
            if (!this.isUnmount) {
                this.setState({ buttonActive: false });
            }
        }
    };

    //Login With Facebook Handler
    facebookLogin = async () => {
        this.setState({ loadingPageActive: true });
        const result = await signInWithFacebook();
        if (result.error) {
            Message.error('Prisijungti Nepavyko.');
            if (!this.isUnmount) {
                this.setState({ loadingPageActive: false });
            }
        }
    };

    // //TODO: Temp Login Method for TESTING
    // login = async ({ email, password }) => {
    //     try {
    //         //Sign In User and get user's data
    //         const user = await signIn(email, password);
    //         if (user) {
    //             Message.success('Prisijungta sėkmingai!');
    //             if (!this.isUnmount) {
    //                 this.setState({ redirect: true });
    //             }
    //         }
    //     }
    //     catch (error) {
    //         Message.error('Sistemos Klaida');
    //     }
    // };
    // //TODO: Test Handlers
    // loginAsParent = async () => {
    //     this.setState({ loadingPageActive: true });
    //     await this.login({ email: 'tevai@email.com', password: '123456' });
    // };
    // loginAsStudent = async () => {
    //     this.setState({ loadingPageActive: true });
    //     await this.login({ email: 'mokinys@email.com', password: '123456' })
    // };
    // loginAsTeacher = async () => {
    //     this.setState({ loadingPageActive: true });
    //     await this.login({ email: 'treneris@email.com', password: '123456' })
    // }
}
