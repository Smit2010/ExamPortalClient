import React from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Welcome from '../../Welcome/Welcome.js';
import SideBar from '../../SideBar';
import { createUser } from '../../../actions/auth';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const list = [
    {"icon" : "fas fa-bars fa-lg",
    "title" : "Profile"},
    {"icon" : "fas fa-bars fa-lg",
    "title" : "Create new exam"},
];

const FormRadio = ({
    field,
    form: { setFieldValue, setFieldTouched, values },
    ...props
}) => (
    <Radio
        checked={values.type===props.label}
        color="primary"
        onChange={() => setFieldValue("type", props.label)}
        onBlur={() => setFieldTouched("type", true)}
    />
);

class NormalSignUpForm extends React.Component {

    renderDrawer = () => {
        if(this.props.isDrawerOpen  && this.props.isAuthenticated){
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", padding: 0, marginTop: "7vh", width: "240px", marginLeft: "0px", transition: "margin 0.7s"}}>
                    <SideBar list = {list}/>
                </div>
            );
        } else{
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", padding: 0, marginTop: "7vh", width: "240px", marginLeft: "-240px", transition: "margin 0.7s"}}>
                    <SideBar list = {list}/>
                </div>
            );
        }
    }

	render() {
        if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />;
		}
		const { errors, touched } = this.props
		return (
			<div style={{backgroundColor: "#fff", height:"100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                {this.renderDrawer()}
                <div className="container">
                    <div className= "column is-offset-2 is-8">
                            <div className="column is-centered">
                                <Welcome/>
                            </div>
                            <Form>
                                <div className="column is-offset-3 is-centered is-6" style={{marginTop: 20}}>
                                    <div className="field">
                                        <label className="label">First Name</label>
                                        <div className="control">
                                            <Field className="input" name="firstName" type="text" placeholder="First Name" />
                                        </div>
                                        {touched.firstName && errors.firstName ? <p class="help is-danger">{errors.firstName}</p> : null }
                                    </div>
                                    <div className="field">
                                        <label className="label">Last Name</label>
                                        <div className="control">
                                            <Field className="input" name="lastName" type="text" placeholder="Last Name" />
                                        </div>
                                        {touched.lastName && errors.lastName ? <p class="help is-danger">{errors.lastName}</p> : null }
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <Field className="input" name="email" type="text" placeholder="Email" />
                                        </div>
                                        {touched.email && errors.email ? <p class="help is-danger">{errors.email}</p> : null }
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <Field className="input" name="password" type="password" placeholder="Password" />
                                        </div>
                                        {touched.password && errors.password ? <p class="help is-danger">{errors.password}</p> : null }
                                    </div>
                                    <div className="field">
                                        <label className="label">Confirm Password</label>
                                        <div className="control">
                                            <Field className="input" name="confirmPassword" type="password" placeholder="Re-type Password" />
                                        </div>
                                        {touched.confirmPassword && errors.confirmPassword ? <p class="help is-danger">{errors.confirmPassword}</p> : null }
                                    </div>
                                    <div class="field">
                                        <label class="label" style={{margin: 0}}>You are a</label>
                                        {touched.type && errors.type ? <p class="help is-danger">{errors.type}</p> : null }
                                        <div class="columns is-vcentered is-centered">
                                            <div class="column is-centered" style={{display: "flex", justifyContent: "center", padding: 10}}>
                                                <div class="control">
                                                    <Field
                                                        class="input"
                                                        name="type"
                                                        label="student"
                                                        component={FormRadio}
                                                    />
                                                    <label>Student</label>
                                                </div>
                                            </div>
                                            <div class="column is-centered" style={{display: "flex", justifyContent: "center", padding: 10}}>
                                                <div class="control">
                                                    <Field
                                                        class="input"
                                                        name="type"
                                                        label="faculty"
                                                        component={FormRadio}
                                                    />
                                                    <label>Faculty</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="column is-offset-3 is-centered is-6">
                                            <div class="control is-centered">
                                                <button
                                                    class="button is-rounded is-fullwidth"
                                                    onClick={this.handleForgetPassword} 
                                                    style={{backgroundColor: "DarkSlateBlue"}}>
                                                    <p style={{color: "white"}}>Sign Up</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                    </div>
                </div>
            </div>
		)
	}
}

const SignUp = withFormik({
	mapPropsToValues() {
		return ({
			firstName: '',
			lastName: '',
			confirmPassword: '',
			email: '',
            password: '',
            type: ''
		})
	},
	handleSubmit(values, { props, resetForm }) {
		props.createUser(values.email, values.password, values.firstName, values.lastName, values.type);
		resetForm();
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid Email').required('Please enter your Email'),
		password: Yup.string().required('Please enter your password').matches(
		  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
		),
		firstName: Yup.string().required('Please enter your First name'),
		lastName: Yup.string().required('Please enter your Last name'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        type: Yup.string().required('Please select any of the option')
	})
})(NormalSignUpForm);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isDrawerOpen: state.drawer.isDrawerOpen,
});

const mapDispatchToProps = (dispatch) => ({
	createUser: (email, password, firstName, lastName, type, history) => dispatch(createUser(email, password, firstName, lastName, type, history))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
