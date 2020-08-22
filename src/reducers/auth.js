import { AUTH } from '../actions/types';
import axios from 'axios'

const SERVER_URL = "http://127.0.0.1:5000";
const initialState = {
	isAuthenticated: false,
	user: {},
	exams: []
}

export default function (state = initialState, action) {
	switch(action.type) {
		case AUTH.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.user
			}
		case AUTH.LOGOUT:
			return initialState;
		case AUTH.GET_EXAMS:
			axios.get(`${SERVER_URL}/exams?id=${state.user._id}&type=${state.user.type}`)
			.then(res => {
				// console.log(state.user)
				// console.log(res.data)
				return {...state, exams: res.data}
			})
		default:
			return state;
	}

}