import React from 'react';
import axios from 'axios';
import '../styles/Articles.css'
import { Link } from '@reach/router';
import FullOneArticle from './FullOneArticle';

// API
// https://nc-mj-news.herokuapp.com/api/articles

class Articles extends React.Component {
    state = {
        clickedArticleId: null,
        isHidden: true,
        articles: [
            {
                article_id: 33,
                title: "Seafood substitutions are increasing",
                body: "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
                votes: 0,
                topic: "cooking",
                author: "weegembump",
                created_at: "2018-05-30T15:59:13.341Z",
                comment_count: "6"
                },
                {
                article_id: 28,
                title: "High Altitude Cooking",
                body: "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
                votes: 0,
                topic: "cooking",
                author: "happyamy2016",
                created_at: "2018-05-27T03:32:28.514Z",
                comment_count: "5"
                },
                {
                    article_id: 30,
                    title: "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
                    body: "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagine a world where presenting a platter of seasonal vegetables inspires the same amount of cooing that the turkey does. Welcome to the world of twice-baked butternut squash. Sure, you could just roast some squash wedges and call it a day. But where's the fun in that? To make this year's most impressive vegetable side, Epi's food director Rhoda Boone gave super-seasonal butternut squash the twice-baked potatoes treatment: Mash the inside of the vegetable with butter, cream, and anything else that might make it more delicious, then pile it back into the vegetable, bake it until golden and velvety. The result is a jaw-dropping, brightly colored sweet-meet-savory butternut squash side dish. Here are just a few more reasons this creation belongs on this year's Thanksgiving table:",
                    votes: 0,
                    topic: "cooking",
                    author: "jessjelly",
                    created_at: "2018-05-06T02:40:35.489Z",
                    comment_count: "8"
                    },
                    {
                        article_id: 6,
                        title: "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
                        body: "Functions are objects in JavaScript, as you should know by now, if you have read any of the prerequisite articles. And as objects, functions have methods, including the powerful Apply, Call, and Bind methods. On the one hand, Apply and Call are nearly identical and are frequently used in JavaScript for borrowing methods and for setting the this value explicitly. We also use Apply for variable-arity functions; you will learn more about this in a bit.",
                        votes: 0,
                        topic: "coding",
                        author: "grumpy19",
                        created_at: "2018-03-14T10:27:39.137Z",
                        comment_count: "11"
                        },
                        {
                        article_id: 16,
                        title: "History of FC Barcelona",
                        body: "The history of Futbol Club Barcelona goes from the football club's founding in 1899 and up to current time. FC Barcelona, also known simply as Barcelona and familiarly as Barça, is based in Barcelona, Catalonia, Spain. The team was founded in 1899 by a group of Swiss, English and Spanish footballers led by Joan Gamper. The club played amateur football until 1910 in various regional competitions. In 1910, the club participated in their first of many European competitions, and has since amassed ten UEFA trophies and a sextuple. In 1928, Barcelona co-founded La Liga, the top-tier in Spanish football, along with a string of other clubs. As of 2016, Barcelona has never been relegated from La Liga, a record they share with Athletic Bilbao and arch-rival Real Madrid. The history of Barcelona has often been politically. Though it is a club created and run by foreigners, Barcelona gradually became a club associated with Catalan values. In Spain's transition to autocracy in 1925, Catalonia became increasingly hostile towards the central government in Madrid. The hostility enhanced Barcelona's image as a focal point for Catalonism, and when Francisco Franco banned the use of the Catalan language, the stadium of Barcelona became one of the few places the people could express their dissatisfaction. The Spanish transition to democracy in 1978 has not dampened the club's image of Catalan pride. In the 2000s – a period of sporting success in the club and an increased focus on Catalan players – club officials have openly called for Catalonia to become an independent state.",
                        votes: 0,
                        topic: "football",
                        author: "weegembump",
                        created_at: "2018-02-17T20:38:43.448Z",
                        comment_count: "16"
                        },
                        {
                        article_id: 4,
                        title: "Making sense of Redux",
                        body: "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
                        votes: 0,
                        topic: "coding",
                        author: "jessjelly",
                        created_at: "2017-12-24T05:38:51.240Z",
                        comment_count: "9"
                        },
                        {
                        article_id: 11,
                        title: "Designing Better JavaScript APIs",
                        body: "At some point or another, you will find yourself writing JavaScript code that exceeds the couple of lines from a jQuery plugin. Your code will do a whole lot of things; it will (ideally) be used by many people who will approach your code differently. They have different needs, knowledge and expectations.",
                        votes: 0,
                        topic: "coding",
                        author: "tickle122",
                        created_at: "2017-11-10T16:41:01.780Z",
                        comment_count: "5"
                        },
                        {
                        article_id: 31,
                        title: "What to Cook This Week",
                        body: "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste, and not including lunch because really when it comes to the midday hours you should get out of the office or the house and walk around. If you get something to eat, great, but the most important thing is to be outside where the stories are. There’s nothing happening at your desk but a screen. Anyway! I’m thinking chicken paprikash for dinner tonight, a nod toward the coming fall, served over buttery egg noodles, with green beans on the side. If you have the time, make an apple cake for dessert.",
                        votes: 0,
                        topic: "cooking",
                        author: "tickle122",
                        created_at: "2017-11-05T07:22:43.519Z",
                        comment_count: "12"
                        }
        ]
    }

    paragraphShortener = p => {
        if (p.length > 100) return p.substring(0, 100)
    }

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    handleChangeClickedArticleId = e => {
        console.log('hello i was clicked!')
        console.log(e, '<<< e')
    }
    //onClick={(x)=> this.handleChangeClickedArticleId(this, article.article_id)} 
    // onClick={(x)=> this.handleChangeClickedArticleId(this, x)} 

    render() { 
        const articles = this.state.articles.map(article => {
            return (
                <div className="single-article" key={article.article_id}>
                    <Link className="article-title" to="/articles/:id"><h3>{article.title}</h3></Link>
                    <p className="paragraph">{this.paragraphShortener(article.body)} <em><strong><Link className="read-more" to="/articles/:id">...read more</Link></strong></em></p>
                </div>
            )
        })
        return (
            <div className="articles-container">
              {articles}
              <FullOneArticle path="/articles/:id"/>
            </div>
         );
    }
    
    componentDidMount () {
        axios.get('https://nc-mj-news.herokuapp.com/api/articles')
           .then(res => {
               console.log(res.data);
               this.setState({
                   articles: res.data.articles
               })
           })
           .catch(err => {
               console.log(err, '<< error')
           })
    }
}
 
export default Articles;