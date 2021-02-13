import React, { useEffect } from 'react';
import styled from 'styled-components';
import RenderedField from '../common/primary-input/PrimaryInput';
import Button from './../common/button/Button';
import { Field, reduxForm } from 'redux-form';
import { validEmail, validPassword, validName } from './../common/validation-redux/validation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from './../login/action';

const SignUpWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 30px auto 0px auto;
  pading: 5px;
  box-sizing: border-box;
  padding: 10px;
`;

const Infospan = styled.span`
  display: block;
  width: 100%;
  box-sizing: border-box;
  color: red;
  font-size: 12px;
  color: teal;
  cursor: pointer;
`;

const SignUp = (props) => {
    const { handleSubmit, signUpUser, login: { loggedInUser }, history } = props;

    useEffect(() => {
        if (loggedInUser) {
            history.push("/profile");
        }
        //eslint-disable-next-line
    }, [loggedInUser])

    return (
        <SignUpWrapper>
            <Field
                name="name"
                component={RenderedField}
                label="Name"
                type="text"
                placeholder="Enter your email"
                validate={[validName]}
            />

            <Field
                name="email"
                component={RenderedField}
                label="Email"
                type="text"
                placeholder="Enter your email"
                validate={[validEmail]}
            />

            <Field
                name="password"
                component={RenderedField}
                label="Password"
                type="password"
                placeholder="Enter your password"
                validate={[validPassword]}
            />

            <Button label="Sign Up" className="primary" onClick={handleSubmit((value) => { signUpUser(value) })} />
            <Infospan onClick={() => history.push("/login")}>All ready having account ? <u>Sign in now </u></Infospan>

        </SignUpWrapper>
    )
}
const mapDispatchToProps = (dispatch) => ({
    signUpUser: (value) => dispatch(signupUser(value))
})

const mapStateToProps = (state) => ({
    login: state.loginReducer
})

export default withRouter(reduxForm({ form: "form_signup" })(connect(mapStateToProps, mapDispatchToProps)(SignUp)));
