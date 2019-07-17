import React from 'react';
import { getArticleById, voteForArticle } from '../api';
import '../styles/FullOneArticle.css'
import { Link } from '@reach/router';
import Comments from './Comments';
import ErrorPage from './ErrorPage';
import { datePrettier } from '../utils/datePrettier';

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

    handleVoteUp = () => {
        voteForArticle(this.props.id, {inc_votes: 1})
    }

    handleVoteDown = () => {
        voteForArticle(this.props.id, {inc_votes: -1})
    }

    render() {
        const { oneArticle } = this.state
        if (this.state.err) return <ErrorPage details={this.state.err}/>
        return (
           
        oneArticle ? (
           
            <div className="full-one-article">
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${oneArticle.author}`}>{oneArticle.author}</Link> on </p><p className="sub-heading-date">{datePrettier(oneArticle.created_at)}</p></span>
                <h2>{oneArticle.title}</h2>
                <p>{oneArticle.body}</p>

                <Link to={`/topic/${oneArticle.topic}`}><p>#{oneArticle.topic}</p></Link>

                <p>Votes: {oneArticle.votes}</p>
                <p>Comments: {oneArticle.comment_count}</p>

                <button onClick={this.handleVoteUp}>Thumbs Up 👍</button>
                
                <button onClick={this.handleVoteDown}>Thumbs Down 👎</button>
                
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
                console.log({err})
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