import React from 'react';
import { datePrettier } from '../utils/utils';
import { voteForComment } from '../api'

class CommentCard extends React.Component {
    state = {
        currentComment: this.props.singleComment,
        votesCount: 0,
        isButtonUpDisabled: false,
        isButtonDownDisabled: false
    }

    handleVote = (id, arrow) => {
        const {votesCount} = this.state;
        const comment = this.state.currentComment
        voteForComment(id, { inc_votes: arrow});
        this.setState(prevState => ({
            votesCount: prevState.votesCount + arrow,
            currentComment: {...comment, votes: prevState.currentComment.votes + arrow}
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

    deleteCommentHandler = commentId => {
        this.props.deleteSingleComment(commentId)
    }

    render() {
        const comment = this.state.currentComment;
        const {isButtonDownDisabled, isButtonUpDisabled} = this.state
        const { user } = this.props
        return ( 
            <div>
                 <span className="sub-heading-single-comment"><p className="posted-by-comment-author">Posted by {comment.author}</p> <p className="posted-on-comment-date">{datePrettier(comment.created_at)}</p></span>
                        <p className="comment-body">{comment.body}</p>
                        <p>votes: {comment.votes}</p>
    
                        {(user === "" ? <p>Only logged in users can vote and post comments</p> :
                        <>
                            <button disabled={isButtonUpDisabled} className="comment-vote-button" onClick={()=> this.handleVote(comment.comment_id, 1)}><span role="img" aria-label="thumbup">👍</span></button>
                            <button disabled={isButtonDownDisabled} className="comment-vote-button" onClick={()=> this.handleVote(comment.comment_id, -1)}><span role="img" aria-label="thumbdown">👎</span></button>
                        </>
                        )}
                        {(user.username === comment.author ?
                            <button className="delete-button" onClick={() =>this.deleteCommentHandler(comment.comment_id)}><span role="img" aria-label="cross">❌</span></button> : '')}
            </div>
         );
    }
}
 
export default CommentCard;