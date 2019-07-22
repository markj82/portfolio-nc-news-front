import React from 'react';
import { getArticleById, voteForArticle } from '../api';
import '../styles/FullOneArticle.css'
import { Link } from '@reach/router';
import Comments from './Comments';
import ErrorPage from './ErrorPage';
import { datePrettier } from '../utils/utils';

class FullOneArticle extends React.Component {

    state = {
        oneArticle: null,
        isCommentVisible: false,
        err: null,
        votesCount: 0,
        isButtonUpDisabled: false,
        isButtonDownDisabled: false
    }

    handleShowComments = () => {
        this.setState(prevState => ({
            isCommentVisible: !prevState.isCommentVisible
        }))
    }

    handleVote = arrow => {
        const {votesCount} = this.state;
            voteForArticle(this.props.id, {inc_votes: arrow})
            this.setState(prevState => ({
                oneArticle: {...prevState.oneArticle, votes: prevState.oneArticle.votes + arrow},
                votesCount: prevState.votesCount + arrow
            }))
            if (votesCount < 0) {
                this.setState({
                    isButtonDownDisabled: true,
                    isButtonUpDisabled: false
                })
            } else {
                this.setState({
                    isButtonDownDisabled: false,
                    isButtonUpDisabled: true
                })
            }
    }

    render() {
        const { oneArticle, isCommentVisible, isButtonDownDisabled, isButtonUpDisabled } = this.state;
        const { user } = this.props;
        
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
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${oneArticle.author}`}>{oneArticle.author}</Link> </p><p className="sub-heading-date">{datePrettier(oneArticle.created_at)}</p></span>
                <h2>{oneArticle.title}</h2>
                <p>{oneArticle.body}</p>

                <Link to={`/topic/${oneArticle.topic}`}><p>#{oneArticle.topic}</p></Link>

                <p>Votes: {oneArticle.votes}</p>
                <p>Comments: {oneArticle.comment_count}</p>

                {(user.username === "" ? <p>Only logged in users can vote and post comments</p> :
                <>
                <button disabled={isButtonUpDisabled} className="button-voteup-article" onClick={()=>this.handleVote(1)}>Thumbs Up <span role="img" aria-label="thumbup">👍</span></button>
                <button disabled={isButtonDownDisabled} className="button-votedown-article" onClick={()=>this.handleVote(-1)}>Thumbs Down <span role="img" aria-label="thumbdown">👎</span></button>
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
            .catch(err => {
                this.setState({err})
            })
    }

    componentDidMount () {
        this.fetchArticleById()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.fetchArticleById()
        }
    }
}
 
export default FullOneArticle;