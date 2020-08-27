import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:5000";

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