import React from 'react';
import '../styles/Articles.css'
import { Link } from '@reach/router';
import { getAllArticles } from '../api'
import ErrorPage from './ErrorPage';
import { datePrettier, paragraphShortener } from '../utils/utils';

class Articles extends React.Component {
    state = {
        clickedArticleId: null,
        isAllArticlesHidden: false,
        articles: null,
        sort_by: null,
        order: null,
        err: null
    }


    orderAndSortByHandler = e => {
        const { value } = e.target;

        const lookUpObj = {
            "created_at_desc": {
                sort_by: 'created_at',
                order: 'desc'
            },
            "created_at_asc": {
                sort_by: 'created_at',
                order: 'asc'
            },
            "comment_count_desc": {
                sort_by: 'comment_count',
                order: 'desc'
            },
            "comment_count_asc": {
                sort_by: 'comment_count',
                order: 'asc'
            },
            "votes_desc": {
                sort_by: 'votes',
                order: 'desc'
            },
            "votes_asc": {
                sort_by: 'votes',
                order: 'asc'
            }
        }

        for (let [key, val] of Object.entries(lookUpObj)) {
            if ( value === key) {
                this.setState(val)
            }
        }
    }

    render() {
        const { err } = this.state;
        if (err) return <ErrorPage details={err}/>
        let articlesToShow
        if (this.state.articles) {
            articlesToShow = this.state.articles.map(article => {
                return (
                    <div className="single-article" key={article.article_id}>
                        <span className="sub-heading-one-article">
                            <p className="sub-heading-date">Posted by <Link to={`/author/${article.author}`}>{article.author}</Link></p> <p className="sub-heading-date">{datePrettier(article.created_at)}</p></span>

                        <span className="sub-heading-topic">
                        <Link to={`/topic/${article.topic}`}> #{article.topic}</Link>
                        </span>
                        <Link
                            className="article-title" to={`/articles/${article.article_id}`}><h3>{article.title}</h3>
                        </Link>
                            <p className="paragraph">{paragraphShortener(article.body)} 
                        <Link
                            className="read-more" to={`/articles/${article.article_id}`}>...read more
                        </Link></p>
                    </div>
                )
            })
        }
        
        return (
            <div className="articles-container">
                <select className="select-to-sort" onChange={this.orderAndSortByHandler}>
                    <option disabled selected value> Sort By.. </option>
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
            this.setState({
                articles: res.articles,
                err: null
            })
        })
        .catch(err => {
            this.setState({err})
        })
    }

    componentDidMount () {
        this.fetchArticles()
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.topic !== this.props.topic || prevProps.author !== this.props.author) {
            this.fetchArticles();
        } else if(prevState.sort_by !== this.state.sort_by || prevState.order !== this.state.order) {
            this.fetchArticles();
        }
    }
}
 
export default Articles;