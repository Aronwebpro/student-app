import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//Api
import { getLessons } from '../../../api/lookups';

//Components
import Spinner from '../../components/Spinner';
import Index from '../../components/DayLessons';


export default class Home extends React.Component {
    state = {
        lessons: [],
        categories: [],
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        hideLoadBtn: true,
        amount: 10,
        empty: false,
        postsLoading: false,
    };

    render() {
        const { lessons, empty, postsLoading } = this.state;
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                <div className="forum">
                    <div className="forum-header">
                        <div className="forum-title">
                            <h2>Savaites Pamokos</h2>
                        </div>
                    </div>
                    <div className="fl_c"/>
                    <div className="forum-content">
                        <div className="forum-content-inner">
                            {!postsLoading && lessons.length > 0 ? lessons.map(dayLessons => (
                                <Index {...dayLessons} />
                            )) : (
                                <div>
                                    {empty ? (
                                        <div style={{ textAlign: 'center', fontSize: '2em' }}>
                                            No Posts
                                        </div>
                                    ) : (
                                        <Spinner/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="load-more-wrapper">
                    {!this.state.hideLoadBtn && (
                        <button className="btn" onClick={this.handleLoadMoreClick}>Load More</button>)}
                </div>
            </div>
        )
    }

    async componentDidMount() {
        //Retrieve Topics from DB
        this.getScreenData();

        if (window) {
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            (this.props.params &&
                prevProps.params &&
                this.props.params.match.url &&
                prevProps.params.match.url &&
                this.props.params.match.url !== prevProps.params.match.url) ||
            this.props.params !== prevProps.params
        ) {
            window.scrollTo(0, 0);
            this.getScreenData();
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Retrieve Topics and categories from DB
    getScreenData = async (limit) => {
        if (!this.isUnmount) {
            this.setState({ postsLoading: true });
        }
        const lessons = await getLessons();

        this.setState({ lessons, postsLoading: false });
    };

}

Home.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
