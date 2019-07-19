import React from 'react';
import { getCommentsByArticleId, deleteComment, voteForComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'
import { log } from 'util';

class Comments extends React.Component {
    state = {
        comments: []
    }

    deleteCommentHandler = commentId => {
        console.log('delete')
        deleteComment(commentId)
        this.setState(prevState => ({
            comments: prevState.comments.filter(comm => {
                return comm.comment_id !== commentId
            })
        }))
    }

    handleVoteUp = id => {
        console.log('up')
        voteForComment(id, { inc_votes : 1 })
    }

    handleVoteDown = id => {
        console.log('down')
        voteForComment(id, { inc_votes : -1 })
    }

    render() { 
        const { user } = this.props
        // user.username for username
        let commentsToShow
        if (this.state.comments) {
            commentsToShow = this.state.comments.map(comment => {
                return (
                    <div className="one-comment" key={comment.comment_id}>
                        <p className="posted-by-comment-author">Posted by {comment.author}</p> on
                        <p>{comment.created_at}</p>
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
        console.log('forever?')
        console.log(prevState, 'prevestate')
        if (prevState.comments.comment_id !== this.state.comments.comment_id) {
            this.fetchComments()
        }
    }
}
 
export default Comments;