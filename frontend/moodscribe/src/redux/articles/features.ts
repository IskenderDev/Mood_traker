import { ArticleValues } from '../../utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { articles as defaultArticles } from '../../utils/constants/articles';

// Get Articles
export interface ArticlesState {
  articles: ArticleValues[];
  success: boolean;
  loading: boolean;
  error: string;
}

const ArticlesInitialState: ArticlesState = {
  articles: defaultArticles,
  success: false,
  loading: false,
  error: '',
};

// Get Articles slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState: ArticlesInitialState,
  reducers: {
    articlesStart(state) {
      state.loading = true;
      return state;
    },
    articlesSuccess(state, action: PayloadAction<ArticleValues[]>) {
      state.loading = false;
      state.success = true;
      state.articles = action.payload;
    },
    articlesFailure(state, action) {
      state.error = action.payload;
      return state;
    },

    clearArticlesState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const {
  articlesStart,
  articlesSuccess,
  articlesFailure,
  clearArticlesState,
} = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;

export const getArticles = (): AppThunk => (dispatch) => {
  dispatch(articlesStart());
  try {
    dispatch(articlesSuccess(defaultArticles));
  } catch (error) {
    dispatch(articlesFailure('Unable to load articles'));
  }
};

//Search for articles
export interface ArticlesSearchState {
  articlesSearch: ArticleValues[];
  success: boolean;
  loading: boolean;
  error: string;
}

const ArticlesSearchInitialState: ArticlesSearchState = {
  articlesSearch: [],
  success: false,
  loading: false,
  error: '',
};

// Search Articles slice
const articlesSearchSlice = createSlice({
  name: 'articles',
  initialState: ArticlesSearchInitialState,
  reducers: {
    articlesSearchStart(state) {
      state.loading = true;
      return state;
    },
    articlesSearchSuccess(state, action: PayloadAction<ArticleValues[]>) {
      state.loading = false;
      state.success = true;
      state.articlesSearch = action.payload;
    },
    articlesSearchFailure(state, action) {
      state.error = action.payload;
      return state;
    },

    clearArticlesSearchState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const {
  articlesSearchStart,
  articlesSearchSuccess,
  articlesSearchFailure,
  clearArticlesSearchState,
} = articlesSearchSlice.actions;
export const articlesSearchReducer = articlesSearchSlice.reducer;

export const searchArticles =
  (data: string): AppThunk =>
  (dispatch) => {
    dispatch(articlesSearchStart());
    try {
      const results = defaultArticles.filter((article) =>
        article.title.toLowerCase().includes(data.toLowerCase())
      );
      dispatch(articlesSearchSuccess(results));
    } catch (error) {
      dispatch(articlesSearchFailure('Unable to search articles'));
    }
  };
