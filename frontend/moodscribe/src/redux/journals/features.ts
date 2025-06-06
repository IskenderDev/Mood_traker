import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JournalItem, JournalValues } from '../../utils/types';
import { AppThunk } from '../store';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'journals';

const getLocalJournals = (): JournalItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveJournals = (journals: JournalItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
};

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


// Get Journals
export interface Journals {
  journals: JournalValues;
  success: boolean;
  loading: boolean;
  error: string;
}
const defaultJournal = {
  journals: getLocalJournals(),
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

export const addJournal =
  (journal: JournalItem): AppThunk =>
  (dispatch) => {
    dispatch(addJournalStart());
    try {
      const newJournal = { ...journal, _id: uuidv4() };
      const updated = [...getLocalJournals(), newJournal];
      saveJournals(updated);
      dispatch(addJournalSuccess(newJournal));
      dispatch(journalsSlice.actions.journalsSuccess({ journals: updated }));
    } catch {
      dispatch(addJournalFailure('Unable to add journal'));
    }
  };

export const getJournals = (): AppThunk => (dispatch) => {
  dispatch(journalsStart());
  try {
    const journals = getLocalJournals();
    dispatch(journalsSuccess({ journals }));
  } catch (error) {
    dispatch(journalsFailure('Unable to load journals'));
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
  (dispatch) => {
    try {
      const journals = getLocalJournals().filter((j) => j._id !== id);
      saveJournals(journals);
      dispatch(deleteJournalSuccess());
      dispatch(journalsSlice.actions.deleteJournalSuccess(id));
    } catch (error) {
      console.error('Failed to delete journal:', error);
    }
  };
