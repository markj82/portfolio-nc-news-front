import React from 'react';
import { getArticleById } from '../api';
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

    render() {
        const { oneArticle } = this.state
        // if (this.state.err) return <h3>Something went wrong</h3>
        return (
           
        oneArticle ? (
           
            <div className="full-one-article">
                <span className="sub-heading-one-article"><p className="sub-heading-date">Posted by <Link to={`/author/${this.state.oneArticle.author}`}>{this.state.oneArticle.author}</Link> on </p><p className="sub-heading-date">{this.state.oneArticle.created_at}</p></span>
                <h2>{this.state.oneArticle.title}</h2>
                <p>{this.state.oneArticle.body}</p>

                <Link to={`/topic/${this.state.oneArticle.topic}`}><p>#{this.state.oneArticle.topic}</p></Link>

                <p>Votes: {this.state.oneArticle.votes}</p>
                <p>Comments: {this.state.oneArticle.comment_count}</p>

                <button>Thumbs Up 👍</button><button>Thumbs Down 👎</button>
                
                <button onClick={this.handleShowComments}>{this.state.buttonShowHideComments[0]}</button>
                {this.state.isCommentVisible && <Comments user={this.props.user} id={this.props.id}/>}
            </div>
         ) : null
        )
        
        }

    componentDidMount () {
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
}
 
export default FullOneArticle;