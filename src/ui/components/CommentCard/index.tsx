import * as React from 'react';
import * as PropTypes from 'prop-types';

// Utils
import { formatToDateAndTimeString } from '../../../utils/index';

// Components
import UserView from '../UserView';

// Styles
import './comment-card.css';

// @types
type addQuoteToCommentParams = {
    clickedComment: number
    text: string
    authorName: string
}

type Props = {
    date: number
    text: string
    replyStyle: {
        width: string,
        height: string
        display?: string
    }
    replyStyleInit: {
        display: string
    }
    index: number
    clickedComment: number
    quoteText: string
    quoteAuthorName: string
    userAvatar: string
    userName: string
    handleCreateNewCommentWithQuote: ({ clickedComment, text, authorName }: addQuoteToCommentParams ) => void
    handleQuoteClick: (index: number) => void
}

//Comment Layout Component
export default class CommentCard extends React.PureComponent<Props, {}> {
    static propTypes = {
        date: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        clickedComment: PropTypes.number,
        respondText: PropTypes.string,
        quoteText: PropTypes.string,
        replyStyle: PropTypes.object,
        replyStyleInit: PropTypes.object,
        userName: PropTypes.string,
        userAvatar: PropTypes.string,
        quoteAuthorName: PropTypes.string,
        handleCreateNewCommentWithQuote: PropTypes.func.isRequired,
        handleQuoteClick: PropTypes.func.isRequired,
    };

    render() {
        const {
            date,
            text,
            clickedComment,
            replyStyle,
            replyStyleInit,
            index,
            quoteText,
            quoteAuthorName,
            userAvatar,
            userName,
        } = this.props;

        //Date and time comments was date
        const cretedString = formatToDateAndTimeString(date);

        return (
            <div className="comment-container">
                <div className="comment-card">
                    <div className="reply-to-this" style={index === clickedComment ? replyStyleInit : { display: 'none' }}>
                        <div className="reply-to-this_text">
                            <div className="reply-to-this-text-inner" style={replyStyle} onClick={this.handleQuoteClick}>
                                Cituoti šį komentarą?
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <div className="comment-row-left">

                            <div className="comment-meta-data"><p><span
                                className="theme-color_txt">Data:</span> {cretedString}</p>
                            </div>

                            <div className="comment-text">
                                {quoteText && (
                                    <div className="quote">
                                        <p className="theme-color_txt quote-authorName"><span>{quoteAuthorName}</span> rašė: </p>
                                        <p>"{quoteText}"</p>
                                    </div>
                                )}
                                <p>{text}</p>
                            </div>
                            <div className="quote-comment-container">
                                <button
                                    onClick={this.handleReplyClick}
                                    className="theme-color_txt"
                                >
                                    Cituoti Komentara
                                </button>
                            </div>
                        </div>
                        <div className="comment-row-right">
                            <div className="comment-author-info">
                                <UserView {...{ userAvatar, userName, }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Handle Reply button click
    handleReplyClick = () => {
        const { handleQuoteClick, index } = this.props;
        handleQuoteClick(index);
    };

    // Handle Qoute button click
    handleQuoteClick = () => {
        const { text, userName, handleCreateNewCommentWithQuote, index } = this.props;
        handleCreateNewCommentWithQuote({
            text,
            authorName: userName,
            clickedComment: index,
        });
    }
};
