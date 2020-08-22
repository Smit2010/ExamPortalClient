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

const names = [
    "System Software",
    "Software Engineering",
    "Machine Learning",
    "DBMS",
    "CNS",
    "DSA"
];

const SERVER_URL = "http://127.0.0.1:5000";

function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const MultipleSelect = ({user}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleBlur = (event) => {
        let flag = window.confirm("Please make sure to select all courses!!")
        if(flag) {
            //upload faculty courses
            // axios.post(`${SERVER_URL}/select-courses-faculty`, {course : event.target.value, id : user._id})
            // .then(res => console.log(res))
            // .catch(err => console.log(err))
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
                value={personName}
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
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(MultipleSelect)