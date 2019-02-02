import React from 'react';
import PropTypes from 'prop-types';

//Api
import { getSingleLesson, getCommentsForLesson } from '../../../api/lookups';

//AntD
import Message from 'antd/lib/message';

//Components
import LessonDetail from '../../components/LessonDetail';
import CommentCard from '../../components/CommentCard';
import NewCommentModal from '../../components/NewCommentModal';


export default class Lesson extends React.Component {
    state = {
        lesson: {},
        comments: [],
        user: {},
        lessonId: '',
        loading: true,
        replyText: {},
        replyStyle: { width: '0', height: '0' },
        replyStyleInit: { display: 'none' },
        clickedComment: '',
        showCreateCommentView: false,
        quoteText: '',
        quoteAuthorName: '',
        commentModalVisible: false,
    };

    render() {
        const {
            lesson,
            comments,
            lessonId,
            clickedComment,
            replyStyle,
            replyStyleInit,
            quoteText,
            quoteAuthorName,
            user,
        } = this.state;
        const { sideBarButtonState, sideBarButtonActions } = this.props;

        return (
            <div className="container">
                <div className="lesson-container">
                    <LessonDetail {...lesson} />
                    <div className="post-title forum-header" style={{ marginTop: '20px' }}>
                        <h2>{comments.length || 0} Komentarai </h2>
                    </div>
                    <div className="comments-wrapper">
                        {comments.map((comment, index) => (
                            <CommentCard
                                key={index.toString()}
                                {...comment}
                                {...{ clickedComment, replyStyle, replyStyleInit, index }}
                                addQuoteToComment={this.addQuoteToComment}
                                handleQuoteClick={this.handleQuoteClick}
                            />
                        ))}
                    </div>
                </div>
                <div
                    style={{ height: '20px', marginTop: '-50px' }}
                    ref={input => this.respondDiv = input}
                />
                <NewCommentModal
                    visible={sideBarButtonState.newCommentModalVisible}
                    hideModal={sideBarButtonActions.handleNewCommentModal}
                    getPageData={this.getPageData}
                    {...{ user, quoteText, quoteAuthorName, lessonId }}
                />
            </div>
        );
    }

    async componentDidMount() {
        //Scroll Page to Top
        window.scrollTo(0, 0);
        //Add Event Listeners
        document.addEventListener('click', this.comClick);
        document.addEventListener('keydown', this.escClick);
        //Get Data for Page
        await this.getPageData();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.comClick);
        document.removeEventListener('keydown', this.escClick);
        //Setup Flag to know is component Unmounted
        this.isUnmounted = true;
    }

    getPageData = async () => {
        const lessonId = this.getLessonId();
        const [lesson, comments ] = await Promise.all([
            getSingleLesson(lessonId),
            getCommentsForLesson(lessonId),
        ]);
        this.setState({ lesson, lessonId, comments });
    };

    getLessonId = () => {
        const { params } = this.props;
        if (params) {
            const { pathname } = params.location;
            return pathname.split('/lesson/').join('');
        }
    };

    clearReply = () => {
        this.setState({ replyText: '' });
    };

    handleReplyClick = (user) => {
        this.setState({
            user,
            showCreateCommentView: true,
        });
        setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
    };

    handleQuoteClick = (clickedComment) => {
        this.setState({
            replyStyle: { width: '100%', height: '100%' },
            replyStyleInit: { display: 'block' },
            clickedComment,
        });
    };

    addQuoteToComment = ({ clickedComment, text, authorName }) => {
        if (!this.isUnmounted) {
            const {sideBarButtonActions} = this.props;
            sideBarButtonActions.handleNewCommentModal();
            this.setState({
                quoteText: text,
                quoteAuthorName: authorName,
                reply: false,
                replyStyleInit: { display: 'none' }
            });
            // setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
        }
    };


    comClick = (e) => {
        if (e.target.classList.value === 'container' || e.target.classList.value === 'content') {
            this.setState({ reply: false, replyStyleInit: { display: 'none' } });
        }
    };

    escClick = (e, obj) => {
        if (e.keyCode === 27) {
            this.setState({ reply: false, replyStyleInit: { display: 'none' } });
        }
    };
}

PropTypes.Post = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

