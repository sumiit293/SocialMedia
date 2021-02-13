import React, { useEffect } from 'react';
import styled from 'styled-components';
import RenderedField from '../common/primary-input/PrimaryInput';
import Button from './../common/button/Button';
import { Field, reduxForm } from 'redux-form';
import { validEmail, validPassword } from './../common/validation-redux/validation';
import { connect } from 'react-redux';
import { loginUser } from './action';
import { withRouter } from 'react-router-dom';

const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 30px auto 0px auto;
  pading: 0px;
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

const Login = (props) => {
    const { handleSubmit, userLogin, login: { loggedInUser }, history } = props;

    useEffect(() => {
        if (!!loggedInUser) {
            history.push("/profile");
        }
        //eslint-disable-next-line
    }, [loggedInUser])

    return (
        <LoginFormWrapper>
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

            <Button label="Sign In" className="primary" onClick={handleSubmit((value) => { console.log(value); userLogin(value); })} />
            <Infospan onClick={() => history.push("/signup")}>Not having account ? <u>Sign up now </u></Infospan>
        </LoginFormWrapper>
    )
}
const mapStateToProps = (state) => ({
    login: state.loginReducer
})

const mapDispatchToProps = (dispatch) => ({
    userLogin: (value) => dispatch(loginUser(value))
})
export default withRouter(reduxForm({ form: "form_login" })(connect(mapStateToProps, mapDispatchToProps)(Login)))
