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
import 'antd/dist/antd.css';
import './assets/css/theme.css';

//Template parts
import Header from './ui/template/Header/Header';
import Footer from './ui/template/Footer/Footer';
import SideBar from './ui/template/SideBar/SideBar';

//Components
import Login from './ui/pages/Login/Login';
import Home from './ui/pages/Home/Home';
import Schedule from './ui/pages/Schedule/Schedule';
import Lesson from './ui/pages/Lesson/Lesson';
import HeartRate from './ui/pages/HeartRate/HeartRate';

//Pages
const LoginPage = PageLayout({
    PageComponent: Login,
    pageId: 'login',
});

const HomePage = PageLayout({
    PageComponent: Home,
    pageId: 'home',
    SideBarComponent: SideBar,
    layout: 'withSidebar'
});

const SchedulePage = PageLayout({
    PageComponent: Schedule,
    pageId: 'schedule',
    SideBarComponent: SideBar,
    layout: 'withSidebar'
});

const LessonPage = PageLayout({
    PageComponent: Lesson,
    pageId: 'lesson',
    SideBarComponent: SideBar,
    layout: 'withSidebar'
});

const HeartRatePage = PageLayout({
    PageComponent: HeartRate,
    pageId: 'heartRate',
    SideBarComponent: SideBar,
    layout: 'withSidebar'
});

export default class App extends React.Component {
    state = {
        newLessonModalVisible: false,
        newCommentModalVisible: false,
    };

    handleNewLessonModal = () => {
        const currentState = this.state.newLessonModalVisible;
        this.setState({ newLessonModalVisible: !currentState });
    };

    handleNewCommentModal = () => {
        const currentState = this.state.newCommentModalVisible;
        this.setState({ newCommentModalVisible: !currentState });
    };

    render() {
        const { user } = this.props;
        const sideBarButtonActions = {
            handleNewLessonModal: this.handleNewLessonModal,
            handleNewCommentModal: this.handleNewCommentModal,
        };
        const sideBarButtonState = this.state;
        return (
            <BrowserRouter>
                <div className='page'>
                    <Header {...{ user }} />
                    <div className='content'>
                        <Switch>
                            <AuthenticatedRoute
                                {...{ user }}
                                exact
                                path='/home'
                                render={(params) => <HomePage {...{ params, user, sideBarButtonActions, sideBarButtonState }}/>}
                            />
                            <AuthenticatedRoute
                                {...{ user }}
                                exact
                                path='/schedule'
                                render={(params) => <SchedulePage {...{ params, user, sideBarButtonActions, sideBarButtonState }}/>}
                            />
                            <AuthenticatedRoute
                                {...{ user }}
                                exact
                                path='/lesson/:lessonId'
                                render={(params) => <LessonPage {...{ params, user, sideBarButtonActions, sideBarButtonState }}/>}
                            />
                            <AuthenticatedRoute
                                {...{ user }}
                                exact
                                path='/heartRate'
                                render={(params) => <HeartRatePage {...{ params, user, sideBarButtonActions, sideBarButtonState }}/>}
                            />
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