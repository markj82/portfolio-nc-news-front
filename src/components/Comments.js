import React from 'react';
import { getCommentsByArticleId, deleteComment, voteForComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'

class Comments extends React.Component {
    state = {
        comments: null
    }

    deleteCommentHandler = commentId => {

        deleteComment(commentId)
    }

    handleVoteUp = id => {
        voteForComment(id, { inc_votes : 1 })
    }

    handleVoteDown = id => {
        voteForComment(id, { inc_votes : -1 })
    }

    render() { 
        const { user } = this.props
        // user.username for username
        let commentsToShow
        if (this.state.comments) {
            commentsToShow = this.state.comments.map(comment => {
                return (
                    <div key={comment.comment_id}>
                        
                        <p className="comment-body">{comment.body}</p>
                        <p>votes: {comment.votes}</p>
    
                        {(user === "" ? <p>Only logged in users can vote and post comments</p> :
                        <>
                            <button onClick={()=> this.handleVoteUp(comment.comment_id)}>👍</button>
                            <button onClick={()=> this.handleVoteDown(comment.comment_id)}>👎</button>
                        </>
                        )}
                        {(user.username === comment.author ?
                            <button className="delete-button" onClick={() =>this.deleteCommentHandler(comment.comment_id)}>❌</button> : '')}
    
                        <hr></hr>
                    </div>
                )
            })
        }

        return (
            <div className="comments-section">
                <CommentAdder user={this.props.user} id={this.props.id}/>
                {commentsToShow ? commentsToShow : <h4>Loading content...</h4>}
            </div>
         );
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
        if (prevState.comments !== this.state.comments) {
            this.fetchComments()
        }
    }
}
 
export default Comments;