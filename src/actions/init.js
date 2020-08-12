import axios from 'axios'

import setAuthToken from "../utils/SetAuthToken";
//import { SERVER_URL } from '../utils/constants'
import {setCurrentUser} from './auth';

const SERVER_URL = "http://127.0.0.1:5000"

export const init = (history) => {
	return(dispatch) => {
        var authToken = localStorage.getItem('jwtToken');
		if(!authToken) {
			history.replace('/home')
		}
		axios.get(`${SERVER_URL}/users/me`).then(res => {
			// Save to localStorage
			const { token, user } = res.data;
			// Set token to ls
			// Set token to Auth header
			setAuthToken(token);
	  
			dispatch(setCurrentUser(user));
	  
			history.replace('/dashboard');
		})
		.catch(err => {
			localStorage.removeItem("jwtToken");
		});
	}
}