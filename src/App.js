import React from 'react';
import PropTypes from 'prop-types';

//import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

//Api
import AuthenticatedRoute from './ui/components/AuthenticatedRoute';

//Layout
import PageLayout from './ui/template/PageLayout';

//Styles
import './assets/css/theme.css';

//Template parts
import Header from './ui/template/Header/Header';
import Footer from './ui/template/Footer/Footer';
//import SideBar from './ui/template/SideBar';

//Components
import Login from './ui/pages/Login/Login';
import Home from './ui/pages/Home/Home';

//Wrapped Components
const LoginPage = PageLayout({
    PageComponent: Login,
    pageId: 'login',
});

const HomePage = PageLayout({
    PageComponent: Home,
    pageId: 'home',
    //SideBarComponent: SideBar,
    //layout: 'withSidebar'
});

export default class App extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <BrowserRouter>
                <div className='page'>
                    <Header {...{ user }} />
                    <div className='content'>
                        <Switch>
                            <AuthenticatedRoute {...{ user }} exact path="/home" render={() => <HomePage {...{ user }}/>}/>
                            <Route exact path='/' render={() => <LoginPage {...{ user }}/>}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

App.propTypes = {
    user: PropTypes.object,
};