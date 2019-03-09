import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Api
import { signOut } from '../../../api/auth';

//Components
import Navigation from '../Navigation/Navigation';

//AntD
import Icon from 'antd/lib/icon';

//Styles
import './header.css';

//Logo Img
import logo from '../../../assets/img/logo.png';

export default class Header extends PureComponent {
    state = {
        headerMenuVisible: false,
    };

    render() {
        const { user } = this.props;
        return (
            <header id="header" ref={input => this.header = input}>
                <div className='app-header'>
                    <Link to="/">
                        <img
                            src={logo}
                            alt=""/>
                        <h1 className='app-title'>Magic&nbsp;<span className="theme-color_txt">Skating</span></h1>
                    </Link>
                </div>
                <div className='navigation-container'>
                    <Navigation user={user}/>
                </div>
                <div className='mobile-navigation-button-container'>
                    {user && (
                        <Icon
                            type="logout"
                            style={{ fontSize: '35px', color: '#fff', cursor: 'pointer' }}
                            onClick={this.logOut}
                        />
                    )}
                </div>
            </header>
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.shrinkHeader);
    }

    //shrink the Header when scroll down
    shrinkHeader() {
        const header = this.header;
        if (!header) return;
        const distanceY = window.pageYOffset;
        if (distanceY > 101) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    }

    menuToggle = () => {
        const { headerMenuVisible } = this.state;
        this.setState({ headerMenuVisible: !headerMenuVisible });
    };

    logOut = async () => {
        await signOut();
    }
}

PropTypes.Header = {
    user: PropTypes.object
};
