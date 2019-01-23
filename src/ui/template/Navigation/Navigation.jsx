import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//Api
import {signOut} from "../../../api/auth";


class Navigation extends React.PureComponent {
    render() {
        const {user} = this.props;
        return (
            <div className="navigation-wrapper">
                <nav className={!user || (user && !user.authorAvatar) ? 'nav-logged-out' : undefined} >
                    {user && (
                        <div>
                            <Link to="/home">Pirmas Puslapis</Link>
                            <Link to="/profile" className="theme-color_txt log-out">Profile</Link>
                            <a className="log-out" onClick={this.logOut} style={{cursor: 'pointer'}}>Atsijungti</a>
                        </div>
                    )}
                    {!user && <Link to="/register">Sign Up</Link>}

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