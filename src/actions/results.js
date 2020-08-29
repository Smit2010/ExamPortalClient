import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getResults = () => {
	return(dispatch) => {
	axios.get(`${SERVER_URL}/get-all-results`, {}).then(res => {
        dispatch({type: "GET_RESULTS", results: res.data});
    })
    .catch(err => {
      console.log(err)
    });

	}
}