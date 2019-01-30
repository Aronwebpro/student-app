import React from 'react';
import PropTypes from 'prop-types';

//Api
import { getSingleLesson } from '../../../api/lookups';
import API from '../../../api/transactions';

//AntD
import Message from 'antd/lib/message';

//Components
import LessonDetail from '../../components/LessonDetail';
import CommentCard from '../../components/CommentCard';
//import CommentCreateForm from '../../mixins/CommentCreateForm/index';


export default class Lesson extends React.Component {
    state = {
        lesson: {},
        comments: [],
        user: {},
        loading: true,
        replyText: {},
        replyStyle: { width: '0', height: '0' },
        replyStyleInit: { display: 'none' },
        clickedComment: '',
        showCreateCommentView: false,
        quoteText: '',
        quoteAuthorName: '',
    };

    render() {
        const {
            lesson,
            comments,
            clickedComment,
            replyStyle,
            replyStyleInit,
            quoteText,
            quoteAuthorName,
            loading,
            showCreateCommentView,
            user,
        } = this.state;
        return (
                <div className="container">
                    <div className="lesson-container">
                        <LessonDetail {...lesson} />
                        <div className="post-title forum-header" style={{ marginTop: '20px' }}>
                            <h2>{comments.length || 0} Kiti Komentarai </h2>
                        </div>
                        <div className="comments-wrapper">
                            {/*{comments.map((comment, index) => (*/}
                            {/*<CommentCard*/}
                            {/*key={index.toString()}*/}
                            {/*{...comment}*/}
                            {/*{...{ clickedComment, replyStyle, replyStyleInit, index }}*/}
                            {/*addQuoteToComment={this.addQuoteToComment}*/}
                            {/*handleQuoteClick={this.handleQuoteClick}*/}
                            {/*/>*/}
                            {/*))}*/}
                        </div>
                        <div>
                            {/*{showCreateCommentView && (*/}
                            {/*<CommentCreateForm*/}
                            {/*{...user}*/}
                            {/*{...{ quoteText, quoteAuthorName, loading }}*/}
                            {/*createComment={this.createComment}*/}
                            {/*/>*/}
                            {/*)}*/}
                        </div>
                    </div>
                    <div
                        style={{ height: '20px', marginTop: '-50px' }}
                        ref={input => this.respondDiv = input}
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
        const lesson = await getSingleLesson(lessonId);

        this.setState({ lesson });
    };

    getLessonId = () => {
        const { params } = this.props;
        if (params) {
            const { pathname } = params.location;
            return pathname.split('/lesson/').join('');
        }
    };

    createComment = async (text) => {
        // if (!text) {
        //     this.setState({
        //         displayFlashMessage: true,
        //         flashMessage: { msg: 'Comment Can\'t be empty!!', status: 'error' },
        //         showCreateCommentView: false,
        //     });
        //     window.scrollTo(0, 0);
        //     return
        // }
        //
        // this.setState({ loading: true });
        //
        // const created = Date.now();
        // const postId = this.getPostId();
        // const { quoteText, quoteAuthorName } = this.state;
        // const { user } = this.props;
        // const comment = {
        //     postId,
        //     created,
        //     text,
        //     quoteText,
        //     quoteAuthorName,
        //     userId: user.uid,
        // };
        // const { error } = await API.createComment({ postId, comment, userId: user.uid });
        //
        // if (error) {
        //     this.setState({
        //         displayFlashMessage: true,
        //         flashMessage: { msg: 'Creating The Comment Failed :( ', status: 'error', loading: false }
        //     });
        // } else {
        //     const comments = await getCommentsBelongingToPost(postId);
        //     if (!this.isUnmounted) {
        //         this.setState({
        //             comments,
        //             displayFlashMessage: true,
        //             flashMessage: { msg: 'Congrats! You just Commented this LessonCard!!! ', status: 'success' },
        //             showCreateCommentView: false,
        //             replyStyleInit: { display: 'none' },
        //             loading: false,
        //         });
        //         window.scrollTo(0, 0);
        //     }
        // }
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
            this.setState({
                showCreateCommentView: true,
                quoteText: text,
                quoteAuthorName: authorName,
                reply: false,
                replyStyleInit: { display: 'none' }
            });
            setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
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

