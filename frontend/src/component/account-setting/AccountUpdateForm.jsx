import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import RenderFieldTextArea from '../common/primary-input/TextInput';
import Button from '../common/button/Button';

const FormWrapper = styled.div`
  max-width: 800px;
  padding: 0px;
  margin: 20px auto;
`;

const FormHeading = styled.h2`
  color: white;
  padding: 15px 10px;
  background: teal;
  margin: 10px 0px;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-gap: 20px 10px;
`;

const ButtonDiv = styled.div`
  margin: 20px auto;
  cursor: pointer;
`;

const AccountUpdateForm = (props) => {

  const { updateInfoInDb, updateInState, handleSubmit } = props;
  const submitTheform = handleSubmit((value) => {
    const token = localStorage.getItem("token");
    updateInfoInDb(value, token);
    updateInState(token);
  })

  return (
    <FormWrapper>
      <FormHeading>
        Update Your Profile
      </FormHeading>
      <Form>
        <Field
          name="bio"
          label="Bio"
          type="text"
          component={RenderFieldTextArea}
        />
        <Field
          name="address"
          label="Address"
          type="text"
          component={RenderFieldTextArea}
        />
        <Field
          name="school"
          label="School"
          type="text"
          component={RenderFieldTextArea}
        />
        <Field
          name="college"
          label="College"
          type="text"
          component={RenderFieldTextArea}
        />
      </Form>
      <ButtonDiv>
        <Button label="Add info" className="primary" onClick={submitTheform} />
      </ButtonDiv>
    </FormWrapper>
  )
}
export default reduxForm({ form: "account_update_form" })(AccountUpdateForm)
