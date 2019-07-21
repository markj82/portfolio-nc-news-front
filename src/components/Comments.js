import React from 'react';
import { getCommentsByArticleId, deleteComment, voteForComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'
import { datePrettier } from '../utils/utils'

class Comments extends React.Component {
    state = {
        comments: [],
        votesCount: 0,
        isButtonUpDisabled: false,
        isButtonDownDisabled: false
    }

    deleteCommentHandler = commentId => {
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
                console.log(comm, 'comm <<<')
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
        const {isButtonDownDisabled, isButtonUpDisabled} = this.state
        let commentsToShow
        if (this.state.comments) {
            commentsToShow = this.state.comments.map(comment => {
                return (
                    <div className="one-comment" key={comment.comment_id}>
                        <span className="sub-heading-single-comment"><p className="posted-by-comment-author">Posted by {comment.author}</p> on <p className="posted-on-comment-date">{datePrettier(comment.created_at)}</p></span>
                        <p className="comment-body">{comment.body}</p>
                        <p>votes: {comment.votes}</p>
    
                        {(user === "" ? <p>Only logged in users can vote and post comments</p> :
                        <>
                            <button disabled={isButtonUpDisabled} className="comment-vote-button" onClick={()=> this.handleVote(comment.comment_id, 1)}>👍</button>
                            <button disabled={isButtonDownDisabled} className="comment-vote-button" onClick={()=> this.handleVote(comment.comment_id, -1)}>👎</button>
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
        console.log(prevState, 'prevestate') // prevstate, array of objects
        if (prevState.comments.comment_id !== this.state.comments.comment_id) {
            this.fetchComments()
        }
    }
}
 
export default Comments;