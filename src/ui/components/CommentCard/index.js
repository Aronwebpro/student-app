import React from 'react';
import PropTypes from 'prop-types';
import { formatToDateAndTimeString } from '../../../utils';

//Components
import UserView from '../UserView';

//Styles
import './comment-card.css';

//Comment Layout Component
export default class CommentCard extends React.PureComponent {
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

        //Show Comment overlay style if somebody clicked to quote
        let clickedStyle = { display: 'none' };
        if (index === clickedComment) clickedStyle = replyStyleInit;

        //Date and time comments was date
        const cretedString = formatToDateAndTimeString(date);

        return (
            <div className="comment-container">
                <div className="comment-card">
                    <div className="reply-to-this" style={clickedStyle}>
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

    handleReplyClick = () => {
        const { handleQuoteClick, index } = this.props;
        handleQuoteClick(index);
    };

    handleQuoteClick = () => {
        const { text, userName, commentId, addQuoteToComment, index } = this.props;
        addQuoteToComment({
            text,
            commentId,
            authorName: userName,
            clickedComment: index,
        });
    }
};

PropTypes.Comment = {
    commentId: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    postedDate: PropTypes.number.isRequired,
    clickedComment: PropTypes.string,
    respondText: PropTypes.string,
    replyStyleInit: PropTypes.object,
    replyStyle: PropTypes.object
};
