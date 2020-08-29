import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchExams } from '../../actions/auth';
import { addRegisteredCourse } from '../../actions/courses';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const SERVER_URL = "http://127.0.0.1:5000";

function getStyles(name, personName, theme) {
    if(personName){
        return {
            fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        };
    }
}

const MultipleSelect = ({user, courses, fetchExams, registeredCourses}) => {

    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(registeredCourses);
    const names = courses;

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleBlur = (event) => {
        let flag = window.confirm("Please make sure to select all courses!!")
        if(flag) {
            //upload faculty courses
            let temp = names.filter(name => event.target.value.includes(name.courseName))
            axios.post(`${SERVER_URL}/register-courses`, {courses: temp, user: user})
            .then(
                res => {toast.info(res.data)
                fetchExams(user)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <FormControl className={classes.formControl} style={{marginLeft: "40px"}}>
                <InputLabel id="demo-mutiple-chip-label">Courses</InputLabel>
                <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName ? personName : []}
                onChange={handleChange}
                onBlur={handleBlur}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem key={name.courseName} value={name.courseName} style={getStyles(name.courseName, personName, theme)}>
                    {name.courseName}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    courses: state.auth.courses
});

const mapDispatchToProps = (dispatch) => {
	return {
        fetchExams: (user) => dispatch(fetchExams(user)),
        addCourse: (courseName) => dispatch(addRegisteredCourse(courseName))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelect)