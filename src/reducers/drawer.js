import { DRAWER } from '../actions/types';

const initialState = {
	isDrawerOpen: true
}

export default function (state = initialState, action) {
	switch(action.type) {
		case DRAWER.DRAWER_CLOSED:
			return {
				...state,
				isDrawerOpen: false
			}
		case DRAWER.DRAWER_OPEN:
			return initialState;
		default:
			return state;
	}
}