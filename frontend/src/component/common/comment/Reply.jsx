import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 10px;
  margin: 10px 0px;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background: white;
  border-radius: 10px;
  display: block;
  border: none;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid teal;
  margin-left: 10px;
  background: teal;
`;

const Image = styled.img`
 height: 20px;
 width: 20px;
 border-radius: 50%;
`;


const UserName = styled.p`
  font-size: 10px;
  font-weight: 600;
  margin-left: 20px;
`;

const DeleteIcon = styled.div`
  font-size: 10px;
  font-weight: 600;
  margin-left: auto;
  margin-right: 10px;
`;

const Reply = (props) => {

  const { name, reply, deleteReply, user, email, profilePic} = props;
  return <Wrapper>
    <PostHeader>
      <UserImage>{!!profilePic && <Image src={profilePic}/>}</UserImage>
      <UserName>{name}</UserName>
      {email === user.email && <DeleteIcon onClick={() => deleteReply(reply)}>Delete</DeleteIcon>}
    </PostHeader>
    <CommentInput value={reply} disabled="true" />
  </Wrapper>
}
const mapStateToProps = (state) => ({
  user: state.loginReducer.user
})
export default connect(mapStateToProps, null)(Reply);

