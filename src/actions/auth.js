import axios from 'axios';

import setAuthToken from "../utils/SetAuthToken";
import {AUTH} from './types';
import { toast } from 'react-toastify';

const SERVER_URL = "http://127.0.0.1:5000";

export const login = (email,password,history) => {
	return(dispatch) => {
	axios.post(`${SERVER_URL}/login`, {email, password}).then(res => {
      const { user, token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);

      dispatch(setCurrentUser(user));

      history.replace('/dashboard');
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		console.log(err)
      }
    });

	}
}

export const setCurrentUser = (user) => {
	return {
		type: AUTH.SET_CURRENT_USER,
		user
	}
}

export const sendResetPasswordEmail = (email) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/auth/reset-password`, {email}).then(res => {
      toast.success('Link Has Been Successfully send to Your email ')
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const resetPassword = (password,token,history) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/auth/reset-password/${token}`, {password}).then(res => {
      toast.success('Your Password Has Been Successfully changed')
      history.replace('/home')
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const createUser = (email, password, firstName, lastName, type, history) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/signup`, {email, password, firstName, lastName, type}).then(res => {
      //toast.success('User Has Been SuccessFully Created Please Verify Your Email');
      const { user, token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);

      dispatch(setCurrentUser(user));

      history.replace('/dashboard');
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const logoutUser = (history) => dispatch => {
   // Remove token from localStorage
   localStorage.removeItem("jwtToken");
   // Remove auth header for future requests
   setAuthToken(false);
   // Set current user to {} which will set isAuthenticated to false
   dispatch({
     type: AUTH.LOGOUT
   });
   history.replace('/home');
 };