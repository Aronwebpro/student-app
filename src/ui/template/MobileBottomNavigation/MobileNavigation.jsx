import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Antd
import Icon from 'antd/lib/icon';

//Styles
import './mobile-navigation.css';


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
                    <p>Širdies Ritmas</p>
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
    }
];

class MobileNavigation extends React.Component {
    state = {};

    render() {
        return (
            <div className='mobile-navigation-container'>
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
        )
    }
}


export default MobileNavigation;