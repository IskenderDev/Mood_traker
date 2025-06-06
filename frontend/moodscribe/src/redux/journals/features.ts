import axios from 'axios';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JournalItem, JournalValues } from '../../utils/types';
import { AppThunk } from '../store';
import { handleErrors } from '..';
import { authHeader } from '../../axiosHelper/services/auth-header';
import { baseUrlApi } from '../../axiosHelper';

const base = axios.create({
  baseURL: baseUrlApi,
});

// Add a Journal
export interface Journal {
  journal: JournalItem | null;
  success: boolean;
  loading: boolean;
  error: string;
}

const journalInitialState: Journal = {
  journal: null,
  success: false,
  loading: false,
  error: '',
};

// Add a Journal slice
const addJournalSlice = createSlice({
  name: 'journal',
  initialState: journalInitialState,
  reducers: {
    addJournalStart(state) {
      state.loading = true;
      return state;
    },
    addJournalSuccess(state, action: PayloadAction<JournalItem>) {
      state.loading = false;
      state.success = true;
      state.journal = action.payload;
    },
    addJournalFailure(state, action) {
      state.error = action.payload;
      return state;
    },

    clearJournalState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const {
  addJournalStart,
  addJournalSuccess,
  addJournalFailure,
  clearJournalState,
} = addJournalSlice.actions;
export const addJournalReducer = addJournalSlice.reducer;

export const addJournal =
  (journal: JournalItem): AppThunk =>
  async (dispatch) => {
    dispatch(addJournalStart());
    try {
      const response = await base.post<JournalItem>(
        '/journal',
        journal,
        authHeader()
      );
      dispatch(addJournalSuccess(response.data));
    } catch (error) {
      dispatch(addJournalFailure(handleErrors(error)));
    }
  };

// Get Journals
export interface Journals {
  journals: JournalValues;
  success: boolean;
  loading: boolean;
  error: string;
}
const defaultJournal = {
  journals: [],
};

const JournalsInitialState: Journals = {
  journals: defaultJournal,
  success: false,
  loading: false,
  error: '',
};

// Get Journals slice
const journalsSlice = createSlice({
  name: 'journals',
  initialState: JournalsInitialState,
  reducers: {
    journalsStart(state) {
      state.loading = true;
      return state;
    },
    journalsSuccess(state, action: PayloadAction<JournalValues>) {
      state.loading = false;
      state.success = true;
      state.journals = action.payload;
    },
    journalsFailure(state, action) {
      state.error = action.payload;
      return state;
    },

    clearJournalsState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
    deleteJournalSuccess: (state, action: PayloadAction<string>) => {
      state.journals.journals = state.journals.journals.filter(
        (journal) => journal._id !== action.payload
      );
    },
  },
});

export const {
  journalsStart,
  journalsSuccess,
  journalsFailure,
  clearJournalsState,
} = journalsSlice.actions;
export const journalsReducer = journalsSlice.reducer;

export const getJournals = (): AppThunk => async (dispatch) => {
  dispatch(journalsStart());
  try {
    const response = await base.get('/journals', authHeader());
    dispatch(journalsSuccess(response.data));
  } catch (error) {
    dispatch(journalsFailure(handleErrors(error)));
  }
};

//Delete Journal
interface DeleteJournalValues {
  journal: JournalItem | null;
  loading: boolean;
  success: boolean;
  error: string;
}
const DeleteJournalState: DeleteJournalValues = {
  journal: null,
  loading: false,
  success: false,
  error: '',
};

const deleteJournalSlice = createSlice({
  name: 'delete',
  initialState: DeleteJournalState,
  reducers: {
    deleteJournalRequest: (state) => {
      state.loading = true;
      return state;
    },
    deleteJournalSuccess: (state) => {
      state.success = true;
      return state;
    },
    deleteJournalFailure: (state, action) => {
      state.error = action.payload;
      return state;
    },
  },
});

export const {
  deleteJournalRequest,
  deleteJournalSuccess,
  deleteJournalFailure,
} = deleteJournalSlice.actions;
export const deleteJournalReducer = deleteJournalSlice.reducer;

export const deleteJournal =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await base.delete(`/journal/${id}`, authHeader());
      dispatch(deleteJournalSuccess(response.data));
      dispatch(journalsSlice.actions.deleteJournalSuccess(id));
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };
