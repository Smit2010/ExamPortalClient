import { AUTH } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	user: {},
	courses: [],
	exams: [],
	pastExams: []
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
		case AUTH.SET_ALL_EXAMS:
			return {
				...state,
				exams: action.exams.currExams,
				pastExams: action.exams.pastExams
			}
		case AUTH.SET_COURSES:
			return {
				...state,
				courses: action.courses.courses
			}
		default:
			return state;
	}

}