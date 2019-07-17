import axios from 'axios';

const BASE_URL = 'https://nc-mj-news.herokuapp.com'

export const getAllArticles = async ({topic, author}, sort_by, order) => {
    const { data } = await axios.get(`${BASE_URL}/api/articles`, {
        params:{
            topic,
            author,
            sort_by,
            order
        }
    });
    return data;
}

export const getArticleById = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/articles/${id}`);
    return data;
}

export const getCommentsByArticleId = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/articles/${id}/comments`);
    return data;
}

export const postComment = async (id, newComment) => {
    const { data } = await axios.post(`${BASE_URL}/api/articles/${id}/comments`, newComment);
    return data.comment;
}

export const deleteComment = async comment_id => {
    await axios.delete(`${BASE_URL}/api/comments/${comment_id}`)
    // console.log(comment_id, 'comment deleted')
}

export const voteForArticle = async (article_id, newVote) => {
    const { data } = await axios.patch(`${BASE_URL}/api/articles/${article_id}`, newVote);
    return data
}

export const voteForComment = async (comment_id, newVote) => {
    // console.log('comment_id:', comment_id)
    // console.log('newVote:', newVote)
    const { data } = await axios.patch(`${BASE_URL}/api/comments/${comment_id}`, newVote);
    return data
}