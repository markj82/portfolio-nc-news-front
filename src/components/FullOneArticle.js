import React from 'react';
import { getArticleById } from '../api';
import '../styles/FullOneArticle.css'
import { Link } from '@reach/router';
import Comments from './Comments';
import ErrorPage from './ErrorPage';
import { datePrettier } from '../utils/utils';
import Voter from './Voter'

class FullOneArticle extends React.Component {

    state = {
        oneArticle: null,
        isCommentVisible: false,
        err: null
    }

    handleShowComments = () => {
        this.setState(prevState => ({
            isCommentVisible: !prevState.isCommentVisible
        }))
    }

    render() {
        const { oneArticle, isCommentVisible } = this.state;
        const { user } = this.props;
        
        if (this.state.err) return <ErrorPage details={this.state.err}/>
      
        return (
           
        oneArticle ? (
           
            <div className="full-one-article">
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${oneArticle.author}`}>{oneArticle.author}</Link> </p><p className="sub-heading-date">{datePrettier(oneArticle.created_at)}</p></span>
                <h2>{oneArticle.title}</h2>
                <p>{oneArticle.body}</p>

                <Link to={`/topic/${oneArticle.topic}`}><p>#{oneArticle.topic}</p></Link>

                <p>Comments: {oneArticle.comment_count}</p>

                {(user.username === "" ? <p>Only logged in users can vote and post comments</p> :
                
                    <Voter votes={oneArticle.votes} id={oneArticle.article_id} type="article"/>

                )}
                
                <button onClick={this.handleShowComments} className="button-show-hide-comments">{isCommentVisible ? 'Hide' : 'Show'} all comments</button>
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