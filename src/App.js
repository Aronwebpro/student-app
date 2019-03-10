import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
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
import AdminSideBar from './ui/template/SideBar/AdminSideBar';


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
import Error from './ui/pages/404/404';
import Admin from './ui/pages/Admin/Admin';

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

const ErrorPage = PageLayout({
    PageComponent: Error,
    pageId: '404',
    layout: 'default',
});

const AdminPage = PageLayout({
    PageComponent: Admin,
    pageId: 'admin',
    layout: 'withSidebar',
    SideBarComponent: AdminSideBar,
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

const AdminRouter = ({ user, params }) => {
      if (user.roles.includes('admin')) {
          return <AdminPage {...{ user, params }} />;
      } else {
          return <ErrorPage />;
      }
};

class App extends React.Component {
    render() {
        const { user, pendingUser } = this.props;
        return (
            <BrowserRouter>
                    <div className='page'>
                        <Header />
                        <div className='content'>
                            <Switch>
                                <AuthenticatedRoute
                                    exact
                                    path='/home'
                                    render={(params) => <HomePage {...{ params }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/schedule'
                                    render={(params) => <SchedulePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/lesson/:lessonId'
                                    render={(params) => <LessonPage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/heartRate'
                                    render={(params) => <HeartRatePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/profile'
                                    render={(params) => <ProfilePage {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/admin/users'
                                    render={(params) => <AdminRouter {...{ params, user, }}/>}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path='/admin/pending-users'
                                    render={(params) => <AdminRouter {...{ params, user, }}/>}
                                />
                                <Route exact path='/sign-up' render={() => <SignUpPage {...{ user, pendingUser }} />}/>
                                <Route exact path='/terms-of-service' render={() => <TermsOfServicePage/>}/>
                                <Route exact path='/privacy-policy' render={() => <PrivacyPolicyPage/>}/>
                                <Route exact path='/' render={() => <LoginRouter {...{ user, pendingUser }} />}/>
                                <Route path='/' render={() => <ErrorPage />}/>
                            </Switch>
                        </div>
                        {user && (
                            <MobileNavigation/>
                        )}
                    </div>
            </BrowserRouter>
        )
    }
}

//Redux Map to Props Handlers
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(App);

App.propTypes = {
    user: PropTypes.object,
    pendingUser: PropTypes.object,
};