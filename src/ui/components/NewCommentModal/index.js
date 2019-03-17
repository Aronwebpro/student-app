import React from 'react';
import PropTypes from 'prop-types';

//Api
import { getCurrentUser } from '../../../api/lookups';
import API from '../../../api/transactions';

//AntD
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';

//Styles
import './new-comment-modal.css'

const Footer = (props) => {
    const { confirm, hideModal } = props;
    return (
        <div className='student-modal-footer-container'>
            <div className='student-modal-footer-btn-container'>
                <button className="btn modal-cancel-btn" onClick={hideModal} style={{ marginTop: '20px' }}>Atšaukti</button>
            </div>
            <div className='student-modal-footer-btn-container'>
                <button className="btn btn-animation-on modal-confirm-button" onClick={confirm}
                        style={{ marginTop: '20px' }}>Komentuoti
                </button>
            </div>
        </div>
    )
};

export default class NewCommentModal extends React.Component {
    state = {
        text: '',
        loading: false,
    };

    render() {
        const {
            visible,
            hideModal,
            quoteText,
            quoteAuthorName
        } = this.props;
        const { loading } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={hideModal}
                width={'600px'}
                footer={<Footer {...{ hideModal, loading }} confirm={this.createComment}/>}
            >
                <div className="container">
                    {loading && (
                        <div className='spinner-overlay-container'>
                            <Spin/>
                        </div>
                    )}
                    <div className="new-comment-body">
                        {quoteText && (
                            <div><span className="theme-color_txt">Cituoji...</span><br/>
                                <div className="quote">
                                    <p className="quote-authorName">{quoteAuthorName} rašė: </p>
                                    <p>"{quoteText}"</p></div>
                            </div>
                        )}
                        <form>
                            <label htmlFor=""><h2>Irašyk savo komentarą žemiau:</h2></label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="10"
                                ref={(input => this.text = input)}
                            />
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }

    async componentDidMount() {
        const user = await getCurrentUser();
        if (user && !this.isUnmount) {
            this.setState({ user, loading: false });
        } else {
            this.setState({ loading: false });
        }

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Create Lesson Handler
    createComment = async () => {
        const { user } = this.state;
        const {
            quoteText,
            quoteAuthorName,
            hideModal,
            lessonId,
            getPageData,
        } = this.props;
        if (!this.text.value) {
            Message.error('Komentaras negali būti tuščias.');
            return;
        } else if (!lessonId) {
            Message.error('Klaida');
            return
        }

        this.setState({ loading: true });
        const date = Date.now();


        const comment = {
            lessonId,
            date,
            text: this.text.value,
            quoteText,
            quoteAuthorName,
            userId: user.uid,
            userName: user.userName,
            userAvatar: user.userAvatar,

        };
        //Create new comment in DB
        const { error } = await API.createComment({ lessonId, comment, userId: user.uid });

        if (error) {
            Message.error('Komentaro Išsaugoti Nepavyko');
        } else {
            Message.success('Komentaras Išsaugotas Sėkmingai');
            await getPageData();
            this.text.value = '';
            hideModal();
        }

        this.setState({ loading: false });
    };

};

NewCommentModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    user: PropTypes.object,
    quoteText: PropTypes.string,
    quoteAuthorName: PropTypes.string,
    lessonId: PropTypes.string.isRequired,
    getPageData: PropTypes.func.isRequired,
};