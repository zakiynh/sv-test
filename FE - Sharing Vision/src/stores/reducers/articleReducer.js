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
} from '../actions/actionType';

const initialState = {
  data: [],
  totalArticles: 0,
  loading: false,
  error: null,
};

const articleReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        data: action.payload.posts,
        totalArticles: action.payload.totalArticles,
        error: null,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SUBMIT_ARTICLE_REQUEST:
    case DELETE_ARTICLE_REQUEST:
    case UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, action.payload],
        loading: false,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: state.articles.filter(article => article.id !== action.payload),
        loading: false,
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        ),
        loading: false,
      };
    case SUBMIT_ARTICLE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
    case UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default articleReducer;
