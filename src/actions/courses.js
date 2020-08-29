import axios from 'axios';
import { SERVER_URL } from '../utils/constants'

export const getRegisteredCourses = () => {
    return(dispatch) => {
        axios.get(`${SERVER_URL}/get-user-courses`, {}).then(res => {
            let courses = []
            for(var i=0; i<res.data.length; i++){
                courses = courses.concat(res.data[i].courseName);
            }
            dispatch({type: "GET_COURSES", userCourses: courses});
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const addRegisteredCourse = (courseName) => {
    return(dispatch) => {
        dispatch({type: "ADD_COURSE", courseName});
    }
}