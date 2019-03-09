import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

//Components
import Spinner from "../../components/Spinner";

//Styles
import './profile.css';

class Profile extends React.Component {
    render() {
        const { user } = this.props;
        const { userAvatar, userName } = user || {};
        return (
            <div className='profile-page-container'>
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-wrapper">
                            <h2>Vartotojo Informacija:</h2>
                            <div className="user-info-row">
                                <div className="user-info-left">
                                    <ul>
                                        <li>Vardas:</li>
                                    </ul>
                                </div>
                                <div className="user-info-right">
                                    <ul>
                                        <li>{userName}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                <img src={userAvatar} alt=""/>
                            </div>
                        </div>
                    </div>
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

}

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(Profile)




