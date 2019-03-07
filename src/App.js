import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './redux/store';
//import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter, Redirect,
    Route,
    Switch,
} from 'react-router-dom';

//Api
import AuthenticatedRoute from './ui/components/AuthenticatedRoute';

//Layout
import PageLayout from './ui/template/PageLayout';

//Styles
import 'antd/dist/antd.css';
import './assets/css/theme.css';

//Template parts
import Header from './ui/template/Header/Header';
import Footer from './ui/template/Footer/Footer';
import SideBar from './ui/template/SideBar/SideBar';
import MobileNavigation from './ui/components/MobileBottomNavigation/MobileNavigation';


//Page Components
import Login from './ui/pages/Login/Login';
import Home from './ui/pages/Home/Home';
import Schedule from './ui/pages/Schedule/Schedule';
import Lesson from './ui/pages/Lesson/Lesson';
import HeartRate from './ui/pages/HeartRate/HeartRate';
import SignUp from './ui/pages/SignUp/SignUp';
import PrivacyPolicy from './ui/pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './ui/pages/TermsOfService/TermsOfService';
import Profile from './ui/pages/Profile/Profile';


//Pages
const LoginPage = PageLayout({
    PageComponent: Login,
    pageId: 'login',
});

const HomePage = PageLayout({
    PageComponent: Home,
    pageId: 'home',
    layout: 'withSidebar',
    SideBarComponent: SideBar,
});

const SchedulePage = PageLayout({
    PageComponent: Schedule,
    pageId: 'schedule',
    layout: 'withSidebar',
    SideBarComponent: SideBar,
});

const LessonPage = PageLayout({
    PageComponent: Lesson,
    pageId: 'lesson',
    layout: 'withSidebar',
    SideBarComponent: SideBar,
});

const HeartRatePage = PageLayout({
    PageComponent: HeartRate,
    pageId: 'heartRate',
    layout: 'withSidebar',
    SideBarComponent: SideBar,
});

const SignUpPage = PageLayout({
    PageComponent: SignUp,
    pageId: 'sign-up-page',
    layout: 'default'
});

const PrivacyPolicyPage = PageLayout({
    PageComponent: PrivacyPolicy,
    pageId: 'privacyPolice',
    layout: 'default'
});

const TermsOfServicePage = PageLayout({
    PageComponent: TermsOfService,
    pageId: 'termsOfServicePage',
    layout: 'default'
});

const ProfilePage = PageLayout({
    PageComponent: Profile,
    pageId: 'profile',
    layout: 'withSidebar',
    SideBarComponent: SideBar,
});

const LoginRouter = ({ user, pendingUser }) => {
    if (user) {
        return <Redirect to={'/home'}/>;
    } else if (pendingUser) {
        return <Redirect to={'/sign-up'}/>;
    } else {
        return <LoginPage {...{ user }}/>;
    }
};

export default class App extends React.Component {
    render() {
        const { user, pendingUser } = this.props;
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className='page'>
                        <Header {...{ user }} />
                        <div className='content'>
                            <Switch>
                                <AuthenticatedRoute
                                    {...{ user }}
                                    exact
                                    path='/home'
                                    render={(params) => <HomePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    {...{ user }}
                                    exact
                                    path='/schedule'
                                    render={(params) => <SchedulePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    {...{ user }}
                                    exact
                                    path='/lesson/:lessonId'
                                    render={(params) => <LessonPage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    {...{ user }}
                                    exact
                                    path='/heartRate'
                                    render={(params) => <HeartRatePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    {...{ user }}
                                    exact
                                    path='/profile'
                                    render={(params) => <ProfilePage {...{ params, user, }}/>}
                                />
                                <Route exact path='/sign-up' render={() => <SignUpPage {...{ pendingUser }} />}/>
                                <Route exact path='/terms-of-service' render={() => <TermsOfServicePage/>}/>
                                <Route exact path='/privacy-policy' render={() => <PrivacyPolicyPage/>}/>
                                <Route exact path='/' render={() => <LoginRouter {...{ user, pendingUser }} />}/>
                            </Switch>
                        </div>
                        {user && (
                            <MobileNavigation/>
                        )}
                    </div>
                </Provider>
            </BrowserRouter>
        )
    }
}

App.propTypes = {
    user: PropTypes.object,
    pendingUser: PropTypes.object,
};