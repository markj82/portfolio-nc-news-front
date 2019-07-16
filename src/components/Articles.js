import React from 'react';
import axios from 'axios';
import '../styles/Articles.css'
import { Link } from '@reach/router';
import { getAllArticles } from '../api'


// API 
// https://nc-mj-news.herokuapp.com/api/articles

class Articles extends React.Component {
    state = {
        clickedArticleId: null,
        isLoading: true,
        isAllArticlesHidden: false,
        articles: null,
        sort_by: null,
        order: null
    }

    paragraphShortener = p => {
        if (p.length > 100) return p.substring(0, 100)
    }

    orderAndSortByHandler = e => {
        const { value } = e.target;
        if (value === "created_at_desc") {
            this.setState({
                sort_by: 'created_at',
                order: 'desc'
            })
        } else if (value === "created_at_asc") {
            this.setState({
                sort_by: 'created_at',
                order: 'asc'
            })
        } else if (value === "comment_count_desc") {
            this.setState({
                sort_by: 'comment_count',
                order: 'desc'
            })
        } else if (value === "comment_count_asc") {
            this.setState({
                sort_by: 'comment_count',
                order: 'asc'
            })
        } else if (value === "votes_desc") {
            this.setState({
                sort_by: 'votes',
                order: 'desc'
            })
        } else if (value === "votes_asc") {
            this.setState({
                sort_by: 'votes',
                order: 'asc'
            })
        }
    }

    render() {
        let articlesToShow
        if (this.state.articles) {
            articlesToShow = this.state.articles.map(article => {
                return (
                    <div className="single-article" key={article.article_id}>
                        <span className="sub-heading-one-article">
                            <p className="sub-heading-date">Posted by <Link to={`/author/${article.author}`}>{article.author}</Link> on </p>
                            <p className="sub-heading-date">{article.created_at}</p></span>

                        <span className="sub-heading-topic">
                        <Link to={`/topic/${article.topic}`}> #{article.topic}</Link>
                        </span>
                        <Link
                            className="article-title" to={`/articles/${article.article_id}`}><h3>{article.title}</h3>
                        </Link>
                            <p className="paragraph">{this.paragraphShortener(article.body)} <em><strong>
                        <Link
                            className="read-more" to={`/articles/${article.article_id}`}>...read more
                        </Link></strong></em></p>
                    </div>
                )
            })
        }
        
        return (
            <div className="articles-container">
                <select className="select-to-sort" onChange={this.orderAndSortByHandler}>
                    <option disabled selected value> -- Sort -- </option>
                    <option value="created_at_desc">Created Date - Newest First</option>
                    <option value="created_at_asc">Created Date - Oldest First</option>
                    <option value="comment_count_desc">Comment Count - Descending</option>
                    <option value="comment_count_asc">Comment Count - Ascending</option>
                    <option value="votes_desc">Votes - Descending</option>
                    <option value="votes_asc">Votes - Ascending</option>
                </select>

              {articlesToShow ? articlesToShow : <h4>Loading content...</h4>}
            </div>
         );
    }
    
    fetchArticles = () => {
        getAllArticles(this.props, this.state.sort_by, this.state.order)
        .then(res => {
            console.log(res, '<<< res from component did mount')
            this.setState({
                articles: res.articles
            })
        })
        .catch(err => {
            console.log(err, '<< error')
        })
    }

    componentDidMount () {
        this.fetchArticles()
    }

    // preventing infinite loop...
    componentDidUpdate (prevProps, prevState) {
        // make a new request when url changes,
        if (prevProps.topic !== this.props.topic || prevProps.author !== this.props.author) {
            this.fetchArticles();
        } else if(prevState.sort_by !== this.state.sort_by || prevState.order !== this.state.order) {
            this.fetchArticles();
        }
    }
}
 
export default Articles;