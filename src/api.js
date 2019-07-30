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
    const {data} = await axios.delete(`${BASE_URL}/api/comments/${comment_id}`)
    return data;
}

export const addVote = async (type, id, inc) => {
    const {data} = await axios.patch(`${BASE_URL}/api/${type}s/${id}`, {inc_votes: inc})
    return data
}