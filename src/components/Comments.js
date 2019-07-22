import React from 'react';
import { getCommentsByArticleId, deleteComment, voteForComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'
import { datePrettier } from '../utils/utils'

import CommentCard from './CommentCard';

class Comments extends React.Component {
    state = {
        comments: [],
        votesCount: 0,
        isButtonUpDisabled: false,
        isButtonDownDisabled: false
    }

    deleteSingleCommentHandler = commentId => {
        deleteComment(commentId)
        this.setState(prevState => ({
            comments: prevState.comments.filter(comm => {
                return comm.comment_id !== commentId
            })
        }))
    }

    handleVote = (id, arrow) => {
        const {votesCount} = this.state;
        voteForComment(id, { inc_votes: arrow});
        this.setState(prevState => ({
            votesCount: prevState.votesCount + arrow,
            comments: prevState.comments.map(comm => {
                if (comm.comment_id === id) {
                    return {...comm, votes: comm.votes + arrow}
                } else return comm
            })
        }))
        if (votesCount < 0) {
            this.setState({
                isButtonDownDisabled: true,
                isButtonUpDisabled: false
            })
        } else {
            this.setState({
                isButtonUpDisabled: true,
                isButtonDownDisabled: false
            })
        }
    }
   
    render() { 
        const { user } = this.props;
        let commentsToShow
        if (this.state.comments) {
            commentsToShow = this.state.comments.map(comment => {
                return (
                    <div className="one-comment" key={comment.comment_id}>
                        <CommentCard singleComment={comment} user={user} deleteSingleComment={this.deleteSingleCommentHandler}/>
                    </div>
                )
            })
        }

        return (
            <div className="comments-section">
                <CommentAdder user={this.props.user} id={this.props.id} addComment={this.addNewComment}/>
                {commentsToShow ? commentsToShow : <h4>Loading content...</h4>}
            </div>
         );
    }

    addNewComment = (newComment) => {
        this.setState(prevState => ({
            comments: [newComment, ...prevState.comments]
        }))
    }

    fetchComments = () => {
        getCommentsByArticleId(this.props.id)
        .then(res => {
            this.setState({
                comments: res.comments
            })
        })
    }

    componentDidMount() {
       this.fetchComments()
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.comments.comment_id !== this.state.comments.comment_id) {
            this.fetchComments()
        }
    }
}
 
export default Comments;