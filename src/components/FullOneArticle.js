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
        err: null,
        votesCount: 0
    }

    handleShowComments = () => {
        this.setState(prevState => ({
            isCommentVisible: !prevState.isCommentVisible
        }))
    }


    handleVoteUp = () => {
            console.log('up')
            voteForArticle(this.props.id, {inc_votes: 1})
            this.setState(prevState => ({
                oneArticle: {...prevState.oneArticle, votes: prevState.oneArticle.votes+1},
                votesCount: prevState.votesCount + 1
            }))
    }

    handleVoteDown = () => {
        voteForArticle(this.props.id, {inc_votes: -1})
        this.setState(prevState => ({
            oneArticle: {...prevState.oneArticle, votes: prevState.oneArticle.votes-1}
        }))
    }

    render() {
        const { oneArticle, isCommentVisible } = this.state;
        const { user } = this.props; // user.username for username
        
        if (this.state.err) return <ErrorPage details={this.state.err}/>
        let buttonShowHide;
        if(isCommentVisible) {
            buttonShowHide = <button className="button-show-hide-comments" onClick={this.handleShowComments}>Hide all comments</button>
        } else {
            buttonShowHide = <button className="button-show-hide-comments" onClick={this.handleShowComments}>Show all comments</button>
        }


        return (
           
        oneArticle ? (
           
            <div className="full-one-article">
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${oneArticle.author}`}>{oneArticle.author}</Link> on </p><p className="sub-heading-date">{datePrettier(oneArticle.created_at)}</p></span>
                <h2>{oneArticle.title}</h2>
                <p>{oneArticle.body}</p>

                <Link to={`/topic/${oneArticle.topic}`}><p>#{oneArticle.topic}</p></Link>

                <p>Votes: {oneArticle.votes}</p>
                <p>Comments: {oneArticle.comment_count}</p>

                {(user.username === "" ? <p>Only logged in users can vote and post comments</p> :
                <>
                <button className="button-voteup-article" onClick={this.handleVoteUp}>Thumbs Up 👍</button>
                <button className="button-votedown-article" onClick={this.handleVoteDown}>Thumbs Down 👎</button>
                </>
                )}
                
                {buttonShowHide}

                {this.state.isCommentVisible && <Comments user={user} id={this.props.id}/>}
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
        if (prevProps.id !== this.props.id) {
            console.log('article changed')
            this.fetchArticleById()
        }
    }
}
 
export default FullOneArticle;