import axios from 'axios';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { quotes } from '../../utils/constants/quotes';
import { Quote, QuoteItem } from '../../utils/types';
import { AppThunk } from '../store';
import { handleErrors } from '..';
import { authHeader } from '../../axiosHelper/services/auth-header';
import { baseUrlApi } from '../../axiosHelper';

const base = axios.create({
  baseURL: baseUrlApi,
});

//GetQuotes State
interface GetQuotesValues {
  quotes: Quote;
  status: string;
  error: string;
}

const defaultQuote = {
  quote: [],
};

const getQuotesState: GetQuotesValues = {
  quotes: defaultQuote,
  status: 'idle',
  error: '',
};

//GetQuotes Slice
const quotesSlice = createSlice({
  name: 'quotes',
  initialState: getQuotesState,
  reducers: {
    fetchQuotesRequest: (state) => {
      state.status = 'loading';
    },
    fetchQuotesSuccess: (state, action: { payload: Quote }) => {
      state.status = 'succeeded';
      state.quotes = {
        quote: [...quotes.quote, ...action.payload.quote],
      };
    },
    fetchQuotesFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteQuoteSuccess: (state, action: PayloadAction<string>) => {
      state.quotes.quote = state.quotes.quote.filter(
        (quote) => quote._id !== action.payload
      );
    },
  },
});

export const { fetchQuotesRequest, fetchQuotesSuccess, fetchQuotesFailure } =
  quotesSlice.actions;
export const quotesReducer = quotesSlice.reducer;

export const fetchQuotes = (): AppThunk => async (dispatch) => {
  dispatch(fetchQuotesRequest());
  try {
    const response = await base.get('/quotes', authHeader());
    dispatch(fetchQuotesSuccess(response.data));
  } catch (error) {
    dispatch(fetchQuotesFailure(handleErrors(error)));
  }
};

//Add quote state
interface AddQuoteValues {
  quote: QuoteItem;
  status: string;
  error: string;
}
const AddQuoteState: AddQuoteValues = {
  quote: { quote: '', icon: '', color: '' },
  status: 'idle',
  error: '',
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState: AddQuoteState,
  reducers: {
    addQuoteRequest: (state) => {
      state.status = 'loading';
    },
    addQuoteSuccess: (state) => {
      state.status = 'succeeded';
      return state;
    },
    addQuoteFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { addQuoteRequest, addQuoteSuccess, addQuoteFailure } =
  quoteSlice.actions;

export const quoteReducer = quoteSlice.reducer;

export const addQuote =
  (quote: QuoteItem): AppThunk =>
  async (dispatch) => {
    dispatch(addQuoteRequest());
    try {
      const response = await base.post('/quote', quote, authHeader());
      dispatch(addQuoteSuccess(response.data));
      dispatch(addQuoteSuccess(response.data));
    } catch (error) {
      dispatch(addQuoteFailure(handleErrors(error)));
    }
  };

//Delete Quote
interface DeleteQuoteValues {
  quote: QuoteItem;
  loading: boolean;
  success: boolean;
  error: string;
}
const DeleteQuoteState: DeleteQuoteValues = {
  quote: { quote: '', icon: '', color: '' },
  loading: false,
  success: false,
  error: '',
};

const deleteQuoteSlice = createSlice({
  name: 'delete',
  initialState: DeleteQuoteState,
  reducers: {
    deleteQuoteRequest: (state) => {
      state.loading = true;
      return state;
    },
    deleteQuoteSuccess: (state) => {
      state.success = true;
      return state;
    },
    deleteQuoteFailure: (state, action) => {
      state.error = action.payload;
      return state;
    },
  },
});

export const { deleteQuoteRequest, deleteQuoteSuccess, deleteQuoteFailure } =
  deleteQuoteSlice.actions;
export const deleteQuoteReducer = deleteQuoteSlice.reducer;

export const deleteQuote =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await base.delete(`/quote/${id}`, authHeader());
      dispatch(deleteQuoteSuccess(response.data));
      dispatch(quotesSlice.actions.deleteQuoteSuccess(id));
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };
