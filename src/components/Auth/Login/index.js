import React from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { withRouter, Redirect } from "react-router-dom";
import Welcome from '../../Welcome/Welcome.js';

//import { login, sendResetPasswordEmail } from '../../../actions/auth';
import { toast } from "react-toastify";

class NormalLoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isForgotPassword: false,
			forgetEmail: "",
		};
	}

	handleForgetPassword = () => {
		const { forgetEmail } = this.state;
		if (!forgetEmail) {
			toast.error("please enter an valid email");
		}
		this.setState({ forgetEmail: "" });
		this.props.resetPassword(forgetEmail);
	};

	handleChange = (event) => {
		this.setState({ forgetEmail: event.target.value });
	};
	toggleForget = () => {
		this.setState((prevState) => {
			return {
				isForgotPassword: !prevState.isForgotPassword,
			};
		});
	};

	renderForgotPasswordPanel = () => {
		const { isForgotPassword } = this.state;
		if(isForgotPassword){
            return [
                <div class="field is-centered">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            name="forgetPassword"
                            type="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.forgetEmail} />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>,
                <div class="field">
                    <div className="column is-offset-3 is-centered is-6">
                        <div class="control is-centered">
                            <button
                                class="button is-rounded is-fullwidth"
                                onClick={this.handleForgetPassword} 
                                style={{backgroundColor: "DarkSlateBlue"}}>
                                <p style={{color: "white"}}>Send Reset Link</p>
                            </button>
                        </div>
                    </div>
                </div>,
            ];
        }
	};

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}
		const { errors, touched } = this.props;
		return (
            <div style={{backgroundColor: "#d6dbd7", height:"93vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="container">
                    <div className= "column is-offset-2 is-8">
                        <div className= "card" style={{height: "80vh", flexDirection: "column"}}>
                            <div className="column is-centered">
                                <Welcome/>
                            </div>
                            <Form>
                                <div className="column is-offset-3 is-centered is-6" style={{marginTop: 20}}>
                                    <div class="field">
                                        <label class="label">Email</label>
                                        <div class="control has-icons-left has-icons-right">
                                            <Field
                                                className="input"
                                                name="email"
                                                type="email"
                                                placeholder="Email" />
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                        </div>
                                        {touched.email && errors.email ? (
                                            <p class="help is-danger">{errors.email}</p>
                                        ) : null}
                                    </div>
                                    <div class="field">
                                        <label class="label">Password</label>
                                        <div class="control has-icons-left">
                                            <Field
                                                className="input"
                                                name="password"
                                                type="password"
                                                placeholder="Password" />
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <button
                                                class="button is-rounded"
                                                type="submit" 
                                                style={{backgroundColor: "DarkSlateBlue"}}>
                                                <p style={{color: "white", width: "150px"}}>Login</p>
                                            </button>
                                            <a className="is-pulled-right is-center"
                                                onClick={this.toggleForget} >
                                                {" "}
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            <div className="column is-offset-3 is-centered is-6" style={{marginTop: 20}}>
                                    {this.renderForgotPasswordPanel()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

const LoginForm = withFormik({
	mapPropsToValues() {
		return {
			email: "",
			password: "",
			forgetPassword: "",
		};
	},
	/* handleSubmit(values, {props, resetForm}) {
    props.login(values.email, values.password, props.history)
    resetForm()
  }, */
	validationSchema: Yup.object().shape({
		email: Yup.string().email("Please enter a valid email").required(),
		password: Yup.string().required(),
	}),
})(NormalLoginForm);

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
	return {
		//login: (email, password, history) => dispatch(login(email, password, history)),
		//resetPassword: (email) => dispatch(sendResetPasswordEmail(email))
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
