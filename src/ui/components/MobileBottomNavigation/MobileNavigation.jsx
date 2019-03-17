import React from 'react';
import { Link } from 'react-router-dom';

//Antd
import Icon from 'antd/lib/icon';

//Styles
import './mobile-navigation.css';

//Menu Items
const navigationItems = [
    {
        labelComponent:
            (
                <div className='mobile-navigation-item-button'>
                    <Icon type="home" style={{ fontSize: '30px', color: 'color: rgb(97, 218, 251)' }}/>
                    <p>Pagrindinis</p>
                </div>
            ),
        link: '/home'
    },
    {
        labelComponent:
            (
                <div className='mobile-navigation-item-button'>
                    <Icon type="line-chart" style={{ fontSize: '30px', color: 'color: rgb(97, 218, 251)' }}/>
                    <p style={{fontSize: '12px'}}>Širdies Ritmas</p>
                </div>
            ),
        link: '/heartRate',
    },
    {
        labelComponent:
            (
                <div className='mobile-navigation-item-button'>
                    <Icon type="schedule" style={{ fontSize: '30px', color: 'color: rgb(97, 218, 251)' }}/>
                    <p>Tvarkaraštis</p>
                </div>
            ),
        link: '/schedule',
    },
    {
        labelComponent:
            (
                <div className='mobile-navigation-item-button'>
                    <Icon type="user" style={{ fontSize: '30px', color: 'color: rgb(97, 218, 251)' }}/>
                    <p>Profilis</p>
                </div>
            ),
        link: '/profile',
    },

];

class MobileNavigation extends React.Component {
    render() {
        return (
            <div className='mobile-navigation-container'>
                <div className='mobile-navigation-wrapper'>
                    {navigationItems.map(({ labelComponent, link }, index) => {
                        const hasBorder = index !== navigationItems.length - 1 ? 'has-border' : '';
                        const active = window.location.pathname === link ? 'active' : '';
                        return (
                            <div
                                key={link}
                                className={`mobile-navigation-item ${hasBorder} ${active}`}
                            >
                                <Link to={link}>
                                    {labelComponent}
                                </Link>

                            </div>
                        )
                    })}
                </div>
                <div className="mobile-navigation-footer"/>
            </div>
        )
    }
}


export default MobileNavigation;