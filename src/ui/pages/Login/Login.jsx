import React from 'react';
import { Redirect } from 'react-router-dom';

//Api
import { signIn } from '../../../api/auth';

//Antd
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

//Styles
import './login.css';

export default class Login extends React.Component {
    state = {
        buttonActive: false,
    };

    render() {
        const { user } = this.props;
        const { buttonActive } = this.state;
        return user ? (
            <Redirect to={'/home'}/>
        ) : (
            <div className="container">
                <div className="login-wrapper">
                    <h1>Prisijungti</h1>
                    <div className="form-wrapper">
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
                    <div className="form-wrapper facebook-login">
                        <h3>Arba prisijungite su</h3>
                        <div onClick={this.facebookLogin} className='facebook-logo'>
                            <img src="https://www.carlalbert.edu/wp-content/uploads/2018/03/facebook_logos_PNG19751.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //Login User
    handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this;
        this.setState({ buttonActive: true });
        try {
            //Sign In User and get user's data
            const user = await signIn(email.value, password.value);
            //Set Flash message and save to DB
            if (user) {
                this.setState({ redirect: true });
                Message.success('Prisijungta sėkmingai!');
            }
        }
        catch (error) {
            this.password.value = '';
            Message.error(error.message);
            this.setState({ buttonActive: false });
        }
    };

    facebookLogin = async () => {
        Message.error('Ši funkcija bus įdiegta šiektiek vėliau');
    }
}
