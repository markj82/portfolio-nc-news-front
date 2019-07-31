import React from 'react';
import { getCommentsByArticleId, deleteComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'

import CommentCard from './CommentCard';

class Comments extends React.Component {
    state = {
        comments: []
    }

    deleteSingleCommentHandler = commentId => {
        deleteComment(commentId)
        this.setState(prevState => ({
            comments: prevState.comments.filter(comm => {
                return comm.comment_id !== commentId
            })
        }))
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
}
 
export default Comments;