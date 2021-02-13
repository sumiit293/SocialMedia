import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from './../button/Button';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid teal;
  border-bottom: 1px solid teal;
`;

const CommentInput = styled.textarea.attrs({ placeholder: "Write your comment " })`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background: lightgrey;
  display: block;
  border: none;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid teal;
  background: teal;
`;
const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
 margin: 5px;
 display: flex;
 justify-content: flex-end;
`;

const ButtonHolder = styled.div`
  width: 100px;
`;

const ButtonHolderFirst = styled.div`
  width: 120px;
  margin-left: auto;
  .small-font{
    font-size: 10px;
    padding: 5px;
    border-radius: 5px;
    text-transform: capitalize;
  }
`;

const Commenter = (props) => {
  const commentInputRef = useRef();
  const { setShowComment, showComment, user, addComment } = props;

  const commentAddFunc = () => {
    if (commentInputRef.current) {
      !!commentInputRef.current.value && addComment(commentInputRef.current.value);
      commentInputRef.current.value = "";
    }
  }

  return <Wrapper>
    <PostHeader>
      <UserImage><Image src={user.profilePic} /></UserImage>
      <UserName>{user.name}</UserName>
      <ButtonHolderFirst onClick={() => setShowComment(!showComment)}>
        <Button label="collapse comments" className="primary small-font" />
      </ButtonHolderFirst>
    </PostHeader>
    <CommentInput ref={commentInputRef} />
    <ButtonContainer>
      <ButtonHolder>
        <Button label="Post" className="primary" onClick={() => commentAddFunc()} />
      </ButtonHolder>
    </ButtonContainer>
  </Wrapper>
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Commenter)
