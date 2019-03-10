import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const styles = {
    activeLink: {
        backgroundColor: '#6ab9d5',
        color: '#ededed',
        border: ' 2px solid #ededed'
    },
};

const menu = [
    {
        title: 'Users',
        url: '/admin/users',
    },
    {
        title: 'Pending Users',
        url: '/admin/pending-users',
    },
];
export default class AdminSideBar extends React.Component {
    state = {
        categories: [],
    };

    render() {
        const {
            params,
        } = this.props;

        let active = 'all';
        if (params) {
            active = params.location.pathname;
        }
        return (
            <div className='side-bar-container' ref={(input) => this.categoryBar = input}>
                <div className="side-bar-item-header">
                    <h3>Menu</h3>
                    <div className='menu-container'>
                        <ul>
                            {menu.map(({ title, url }) => (
                                <Link to={url} key={url}>
                                    <li style={active === url ? styles.activeLink : {}}>
                                        {title}
                                        <span className="filter-count" />
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.moveBar);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.moveBar);
        this.isUnmount = true;
    }

    moveBar = () => {
        const Header = this.categoryBar;
        if (!Header) return;
        const distanceY = window.pageYOffset;
        if (distanceY > 101) {
            Header.style.top = '60px';
        } else {
            Header.style.top = '94px';
        }
    }
}



PropTypes.AdminSideBar = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    categories: PropTypes.array.isRequired,
};