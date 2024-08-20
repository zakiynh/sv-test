import axios from 'axios';
import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SUBMIT_ARTICLE_REQUEST,
  SUBMIT_ARTICLE_SUCCESS,
  SUBMIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
} from './actionType';
const BASE_URL = 'http://localhost:3000';
import showError from '../../helpers/swal';

export const fetchArticles = (limit, offset, status) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/article`, {
      params: { limit, offset, status },
    });
    console.log("response: ", response.data);
    dispatch({
      type: FETCH_ARTICLES_SUCCESS,
      payload: {
        posts: response.data.posts,
        totalArticles: response.data.totalArticles,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error.message });
  }
};

export const submitArticleRequest = () => ({
  type: SUBMIT_ARTICLE_REQUEST,
});

export const submitArticleSuccess = (article) => ({
  type: SUBMIT_ARTICLE_SUCCESS,
  payload: article,
});

export const submitArticleFailure = (error) => ({
  type: SUBMIT_ARTICLE_FAILURE,
  payload: error,
});

export const submitArticle = (articleData) => {
  return async (dispatch) => {
    dispatch(submitArticleRequest());
    try {
      const response = await axios.post(`${BASE_URL}/article/`, articleData);
      dispatch(submitArticleSuccess(response.data));
      showError('Article created successfully!', 'success');
    } catch (error) {
      dispatch(submitArticleFailure(error.message));
    }
  };
};

export const deleteArticleRequest = () => ({
  type: DELETE_ARTICLE_REQUEST,
});

export const deleteArticleSuccess = (id) => ({
  type: DELETE_ARTICLE_SUCCESS,
  payload: id,
});

export const deleteArticleFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
});

export const deleteArticle = (id) => {
  return async (dispatch) => {
    dispatch(deleteArticleRequest());
    try {
      await axios.delete(`${BASE_URL}/article/${id}`);
      dispatch(deleteArticleSuccess(id));
      showError('success', 'Article deleted successfully'); // Notifikasi sukses
    } catch (error) {
      dispatch(deleteArticleFailure(error.message));
      showError('error', error.message); // Notifikasi kesalahan
    }
  };
};

export const updateArticleRequest = () => ({
  type: UPDATE_ARTICLE_REQUEST,
});

export const updateArticleSuccess = (article) => ({
  type: UPDATE_ARTICLE_SUCCESS,
  payload: article,
});

export const updateArticleFailure = (error) => ({
  type: UPDATE_ARTICLE_FAILURE,
  payload: error,
});

export const updateArticle = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(updateArticleRequest());
    try {
      const response = await axios.put(`${BASE_URL}/article/${id}`, updatedData);
      dispatch(updateArticleSuccess(response.data));
      showError('success', 'Article updated successfully');
    } catch (error) {
      dispatch(updateArticleFailure(error.message));
      showError('error', error.message);
    }
  };
};