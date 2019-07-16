import React from 'react';
import { getArticleById, voteForArticle } from '../api';
import '../styles/FullOneArticle.css'
import { Link } from '@reach/router';
import Comments from './Comments';

class FullOneArticle extends React.Component {

    state = {
        oneArticle: null,
        isCommentVisible: false,
        buttonShowHideComments: ['Show all comments', 'Hide all comments'],
        err: null
    }

    handleShowComments = () => {
        console.log('show comments button')
        this.setState(prevState => ({
            isCommentVisible: !prevState.isCommentVisible
        }))
    }

    handleVoteUp = id => {
        voteForArticle(id, {inc_votes: 1})
    }

    handleVoteDown = id => {
        voteForArticle(id, {inc_votes: -1})
    }

    render() {
        const { oneArticle } = this.state
        // if (this.state.err) return <h3>Something went wrong</h3>
        return (
           
        oneArticle ? (
           
            <div className="full-one-article">
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${oneArticle.author}`}>{oneArticle.author}</Link> on </p><p className="sub-heading-date">{oneArticle.created_at}</p></span>
                <h2>{oneArticle.title}</h2>
                <p>{oneArticle.body}</p>

                <Link to={`/topic/${oneArticle.topic}`}><p>#{oneArticle.topic}</p></Link>

                <p>Votes: {oneArticle.votes}</p>
                <p>Comments: {oneArticle.comment_count}</p>

                <button onClick={()=> this.handleVoteUp(this.props.id)}>Thumbs Up 👍</button>
                
                <button onClick={()=> this.handleVoteDown(this.props.id)}>Thumbs Down 👎</button>
                
                <button onClick={this.handleShowComments}>{this.state.buttonShowHideComments[0]}</button>
                {this.state.isCommentVisible && <Comments user={this.props.user} id={this.props.id}/>}
            </div>
         ) : null
        )
        
        }

    fetchArticleById = () => {
        getArticleById(this.props.id)
            .then(res => {
                this.setState({
                    oneArticle: res.article
                })
            })
            // lecture
            .catch(err => {
                this.setState({err})
            })
    }

    componentDidMount () {
        this.fetchArticleById()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.oneArticle !== this.state.oneArticle) {
            this.fetchArticleById()
        }
    }
}
 
export default FullOneArticle;