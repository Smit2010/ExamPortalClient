import {AUTH} from './types';

export const logoutUser = (history) => dispatch => {
    dispatch({
        type: AUTH.LOGOUT
      });
};