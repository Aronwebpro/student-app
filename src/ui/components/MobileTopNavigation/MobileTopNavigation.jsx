import React from 'react';
import { Link } from 'react-router-dom';
//Styles
import './mobile-top-navigation.css';
import Icon from 'antd/lib/icon';


//Menu Items
const menu = [
    {
        title: 'Pagrindinis',
        url: '/home',
    },
    {
        title: 'Širdies Ritmas',
        url: '/heartRate',
    },
    {
        title: 'Tvarkaraštis',
        url: '/schedule',
    },
];

export default class MobileTopNavigation extends React.PureComponent {
    render() {
        const { visible } = this.props;
        return (
            <div className={`mobile-top-navigation-container ${visible && 'active'}`}>
                {visible ? (
                    <Icon
                        type="menu-unfold"
                        style={{fontSize: '35px', color: '#fff', cursor: 'pointer'}}
                        onClick={this.menuToggle}
                    />
                ) : (
                    <Icon
                        type="menu-fold"
                        style={{fontSize: '35px', color: '#fff', cursor: 'pointer'}}
                        onClick={this.menuToggle}
                    />
                )}
                <div className='mobile-top-navigation-menu-container'>
                    <ul>
                        {menu.map(({ title, url }) => (
                            <Link to={url} key={url}>
                                <li>
                                    {title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}