import React from 'react';
import { Redirect } from 'react-router-dom';

//Api
import { signIn } from '../../../api/auth';

//Components
// import { FlashMessage } from '../../../../../../student-lesson_card/src/components/mixins/FlashMessage/FlashMessage';
// import { FlashMessageHandler } from '../../../../../../student-lesson_card/src/utils/FlashMessageHandler';

//Styles
import './css/login.css';


export default class Login extends React.Component {
    render() {
        const { user } = this.props;
        console.log(user);
        return user ? (
            <Redirect to={'/home'}/>
        ) : (
            <div className="container">
                <div className="login-wrapper">
                    <h1>Prisijungti: </h1>
                    <div className="form-wrapper">
                        <form onSubmit={this.handleLogin}>
                            <label htmlFor="email">Elektroninis Paštas:</label>
                            <input type="text" name="email" ref={input => this.email = input}/>
                            <label htmlFor="">Slaptažodis:</label>
                            <input type="password" name="password" ref={input => this.password = input}/>
                            <button className="btn" type="submit" name="submit">Prisijungti</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

    //Login User
    handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this;
        try {
            //Sign In User and get user's data
            const user = await signIn(email.value, password.value);
            //Set Flash message and save to DB
            if (user) {
                // const msg = 'Welcome back ' + user.displayName + '! You\'ve logged in successfully!';
                // FlashMessageHandler.create(msg, 'success');
                this.setState({ redirect: true });
            }
        }
        catch (error) {
            this.password.value = '';
            this.setState({ displayFlashMessage: true, flashMessage: { msg: error.message, status: 'error' } });
        }
    };
}
