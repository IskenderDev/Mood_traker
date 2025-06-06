import { AppThunk } from '../store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SigninValues, SignupValues, UserValues } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

// Signup
export interface UserRegistration {
  user: SignupValues | null;
  success: boolean;
  loading: boolean;
  error: string;
}

const initialSignupState: UserRegistration = {
  user: null,
  success: false,
  loading: false,
  error: '',
};

// Signup slice
const signupSlice = createSlice({
  name: 'registration',
  initialState: initialSignupState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.success = false;
      state.error = '';
    },
    signupSuccess(state, action: PayloadAction<SignupValues>) {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    clearSignupState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, clearSignupState } =
  signupSlice.actions;
export const signupReducer = signupSlice.reducer;

export const signup =
  (userData: SignupValues): AppThunk =>
  (dispatch) => {
    dispatch(signupStart());
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      dispatch(signupSuccess(userData));
    } catch (error) {
      dispatch(signupFailure('Unable to register user'));
    }
  };

// Signin
export interface Signin {
  token: string | null;
  isAuthenticated: boolean;
  success: boolean;
  loading: boolean;
  error: string;
  expirationTime: number | null;
}

const initialSigninState: Signin = {
  token: null,
  isAuthenticated: false,
  success: false,
  loading: false,
  error: '',
  expirationTime: null,
};

// Signin slice
const signinSlice = createSlice({
  name: 'signin',
  initialState: initialSigninState,
  reducers: {
    signinStart(state) {
      state.loading = true;
      state.success = false;
      state.error = '';
      state.token = null;
      state.expirationTime = null;
    },
    signinSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.token = action.payload;
      state.isAuthenticated = true;

      const expiration = localStorage.getItem('expirationTime');
      state.expirationTime = expiration ? parseInt(expiration) : null;
    },

    signinFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.token = null;
      state.expirationTime = null;
    },

    clearSigninState(state) {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
    signout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.expirationTime = null;
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  clearSigninState,
  signout,
} = signinSlice.actions;
export const signinReducer = signinSlice.reducer;

// Async action creator for signin
export const signin =
  (userData: SigninValues): AppThunk =>
  (dispatch) => {
    dispatch(signinStart());
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u: SignupValues) =>
          u.email === userData.email && u.password === userData.password
      );
      if (user) {
        const token = uuidv4();
        const expirationTime = Math.floor(Date.now() / 1000) + 3600;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('expirationTime', expirationTime.toString());
        dispatch(signinSuccess(token));
      } else {
        dispatch(signinFailure('Invalid credentials'));
      }
    } catch (error) {
      dispatch(signinFailure('Unable to login'));
    }
  };

// Get User
export interface User {
  user: UserValues | null;
  error: string;
}

const initialUserState: User = {
  user: null,
  error: '',
};

// Signup slice
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    userStart(state) {
      state.error = '';
    },
    userSuccess(state, action: PayloadAction<UserValues>) {
      state.user = action.payload;
    },
    userFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { userStart, userSuccess, userFailure } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const getUser = (): AppThunk => (dispatch) => {
  dispatch(userStart());
  try {
    const user = localStorage.getItem('currentUser');
    if (user) {
      dispatch(userSuccess(JSON.parse(user)));
    }
  } catch (error) {
    dispatch(userFailure('Unable to fetch user'));
  }
};
