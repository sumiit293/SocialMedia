import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from './../button/Button';
import { connect } from 'react-redux';
import { addReplyToCommentApi } from './api';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 10px;
  margin: 10px 0px;
`;

const CommentInput = styled.textarea.attrs({ placeholder: "Write your reply" })`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background: lightgrey;
  border-radius: 10px;
  display: block;
  border: none;
`;


const ButtonContainer = styled.div`
 margin: 5px;
 display: flex;
 justify-content: space-between;
`;

const ButtonHolder = styled.div`
  width: 60px;
  .small-font{
    font-size: 10px;
    padding: 5px;
    border-radius: 5px;
    text-transform: capitalize;
  }
`;

const CommenterForReply = (props) => {
  const inputRef = useRef();
  const { comment_id, addReplyToUi, mySelf } = props;

  const add_reply_to_post = async (reply) => {
    const value = { comment_id: comment_id, reply: reply };
    try {
      const res = await addReplyToCommentApi(value, localStorage.getItem("token"))
      const replyToBeAdded = {
        _id: res.data.comment_id,
        name: {
          name: mySelf.name,
          email: mySelf.email
        },
        value: reply
      }
      addReplyToUi(replyToBeAdded);
      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }

  }

  return <Wrapper>
    <CommentInput ref={inputRef} />
    <ButtonContainer>
      <ButtonHolder>
        <Button label="Cancel" className="primary small-font" />
      </ButtonHolder>
      <ButtonHolder>
        <Button label="Reply" className="primary small-font" onClick={() => !!inputRef.current && inputRef.current.value && add_reply_to_post(inputRef.current.value)} />
      </ButtonHolder>
    </ButtonContainer>
  </Wrapper>
}
const mapStateToProps = (state) => ({
  mySelf: state.loginReducer.user
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(CommenterForReply)

