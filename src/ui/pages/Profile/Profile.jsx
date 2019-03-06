import React from 'react';
import moment from 'moment';

//Components
import Spinner from "../../components/Spinner";

//Styles
import './profile.css';

export default class Profile extends React.Component {
    state = {}

    render() {
        const authorAvatar = '';
        const authorName = 'Petras';

        return (
            <div className='profile-page-container'>
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-wrapper">
                            <h2>User Information:</h2>
                            <div className="user-info-row">
                                <div className="user-info-left">
                                    <ul>
                                        <li>Vardas:</li>
                                    </ul>
                                </div>
                                <div className="user-info-right">
                                    <ul>
                                        <li>{authorName}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {authorAvatar ? (
                                <img src={authorAvatar} alt=""/>
                                ) : (
                                <Spinner/>
                                )}
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

    componentWillUnmount() {

    }

}




