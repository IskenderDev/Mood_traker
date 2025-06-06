import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { quotes } from '../../utils/constants/quotes';
import { Quote, QuoteItem } from '../../utils/types';
import { AppThunk } from '../store';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'quotes';

const getLocalQuotes = (): QuoteItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveQuotes = (list: QuoteItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};


//GetQuotes State
interface GetQuotesValues {
  quotes: Quote;
  status: string;
  error: string;
}

const defaultQuote = {
  quote: [...quotes.quote, ...getLocalQuotes()],
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
        quote: action.payload.quote,
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

export const fetchQuotes = (): AppThunk => (dispatch) => {
  dispatch(fetchQuotesRequest());
  try {
    const stored = getLocalQuotes();
    dispatch(fetchQuotesSuccess({ quote: [...quotes.quote, ...stored] }));
  } catch (error) {
    dispatch(fetchQuotesFailure('Не удалось загрузить цитаты'));
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
  (dispatch) => {
    dispatch(addQuoteRequest());
    try {
      const newQuote = { ...quote, _id: uuidv4() };
      const updated = [...getLocalQuotes(), newQuote];
      saveQuotes(updated);
      dispatch(addQuoteSuccess());
      dispatch(
        quotesSlice.actions.fetchQuotesSuccess({
          quote: [...quotes.quote, ...updated],
        })
      );
    } catch (error) {
      dispatch(addQuoteFailure('Не удалось добавить цитату'));
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
  (dispatch) => {
    try {
      const updated = getLocalQuotes().filter((q) => q._id !== id);
      saveQuotes(updated);
      dispatch(deleteQuoteSuccess());
      dispatch(quotesSlice.actions.deleteQuoteSuccess(id));
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };
