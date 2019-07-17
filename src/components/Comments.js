import React from 'react';
import { getCommentsByArticleId, deleteComment, voteForComment } from '../api'
import CommentAdder from './CommentAdder';
import '../styles/Comments.css'

class Comments extends React.Component {
    state = {
        comments: [
            {
                comment_id: 115,
                author: "happyamy2016",
                article_id: 33,
                votes: 12,
                created_at: "2018-01-19T14:47:14.514Z",
                body: "Neque dolor sint illum id consequuntur debitis qui nam eum. Nam adipisci similique consequatur officiis. Totam qui enim at iste dolorem ullam. Tenetur laudantium sed facilis aspernatur occaecati. Provident rerum quia consectetur et. Molestiae eligendi commodi."
                },
                {
                comment_id: 272,
                author: "tickle122",
                article_id: 33,
                votes: 17,
                created_at: "2017-09-26T21:34:42.072Z",
                body: "Distinctio excepturi laboriosam eos aperiam quis amet eum animi minima. Officiis in quia. Est consequatur optio atque nostrum iusto impedit harum quod asperiores."
                }
            ]
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
        const commentsToShow = this.state.comments.map(comment => {
            return (
                <div key={comment.comment_id}>
                    
                    <p className="comment-body">{comment.body}</p>
                    <p>votes: {comment.votes}</p>

                    {(user === "" ? <p>Only logged in users can vote and post comments</p> :
                    <>
                        <button onClick={()=> this.handleVoteUp(comment.comment_id)}>🔼</button>
                        <button onClick={()=> this.handleVoteDown(comment.comment_id)}>🔽</button>
                    </>
                    )}
                    {(user === comment.author ?
                        <button className="delete-button" onClick={() =>this.deleteCommentHandler(comment.comment_id)}>❌</button> : '')}

                    <hr></hr>
                </div>
            )
        })

        return (
            <div className="comments-section">
                <CommentAdder user={this.props.user} id={this.props.id}/>
                {commentsToShow}
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