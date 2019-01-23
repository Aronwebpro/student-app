import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//Styles
import './side-bar.css';
//Components
import SidebarButtons from '../../components/SidebarButtons';

//Api
export default class SideBar extends React.Component {
    state = {
        categories: [],
    };
    render() {
        const {
            respond,
            page,
            clearReply,
            user,
            params,
        } = this.props;

        let active = 'all';
        if (params) {
            active = params.location.pathname.split('/category/').join('');
        }

        return (
            <div ref={(input) => this.categoryBar = input}>
                <SidebarButtons {...{page, user, respond, clearReply}}/>
                <div className="search-filter">
                    <h5>Menu</h5>

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

PropTypes.SideBar = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    categories: PropTypes.array.isRequired,
};