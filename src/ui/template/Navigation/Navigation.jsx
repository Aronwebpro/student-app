import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Api
import { signOut } from "../../../api/auth";

//Template Parts

//Styles
import './navigation.css';

class Navigation extends React.PureComponent {
    render() {
        const { user } = this.props;
        return (
            <div className="navigation-wrapper">
                <nav className={!user || (user && !user.authorAvatar) ? 'nav-logged-out' : undefined}>
                    {user && (
                        <div className="links-wrapper">
                            <Link to="/home">Pagrindinis</Link>
                            <Link to="/profile" className="theme-color_txt log-out">Profilis</Link>
                            <button className="log-out" onClick={this.logOut} style={{ cursor: 'pointer' }}>Atsijungti</button>
                        </div>
                    )}
                </nav>
                {user && user.authorAvatar && (
                    <div className="header-avatar"><Link to="/profile"><img src={user.authorAvatar} alt=""/></Link>
                    </div>)}
            </div>
        );
    }

    logOut = async () => {
        try {
            await signOut();
        } catch (e) {

        }
        window.scrollTo(0, 0);
    }
};

PropTypes.Navigation = {
    user: PropTypes.object
}

export default Navigation;