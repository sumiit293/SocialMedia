import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import CommenterForReply from './CommenterForReply';
import Reply from './Reply';
import { getReplyToCommentApi, deleteReplyApi } from './api';

const CommentWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid lightgrey;
  padding: 5px 0px 15px 0px;
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

const CommentInputHolder = styled.textarea.attrs({ disabled: true })`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background: lightgrey;
  display: block;
  border: none;
`;

const ButtonHolder = styled.div`
  width: 60px;
  margin-left: auto;
  .small-font{
    font-size: 10px;
    padding: 5px;
    border-radius: 5px;
    text-transform: capitalize;
  }
`;

const ReplyHolder = styled.div`
  width: 80%;
  margin: 0px 0px 0px 20%;
`;

const DeleteIcon = styled.div`
  font-size: 10px;
  font-weight: 600;
  margin-left: auto;
  margin-right: 10px;
`;

const IndividualComment = (props) => {

  const [showReply, SetShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const { comment: { comment, _id, profile }, post_id, deleteComment } = props;

  const commentsYeild = async () => {
    try {
      const res = await getReplyToCommentApi(_id, localStorage.getItem("token"));
      setReplies(res.data.replies.replies);
    } catch (error) {
      console.log(error);
    }
  }

  const addReplyToUi = (value) => {
    setReplies([value, ...replies])
  }

  const deleteReply = async (reply) => {
    const value = {
      comment_id: _id,
      reply: reply,
      post_id: post_id
    }
    try {
      await deleteReplyApi(value, localStorage.getItem("token"));
      const newReplies = replies.filter((individualReply) => individualReply.value !== reply);
      console.log(newReplies);
      setReplies([...newReplies]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (showReply) {
      commentsYeild();
    }
    return ()=> setReplies([])
  }, [showReply])

  return (<CommentWrapper>
    <PostHeader>
      <UserImage><Image src={profile.profilePic} /></UserImage>
      <UserName>{!!profile && profile.name}</UserName>
      <ButtonHolder onClick={() => SetShowReply(!showReply)}>
        <Button label={!showReply ? "replies" : "hide"} className="primary small-font" />
      </ButtonHolder>
      <DeleteIcon onClick={() => deleteComment(_id)}>Delete</DeleteIcon>
    </PostHeader>
    <CommentInputHolder value={comment} />
    {showReply && <ReplyHolder>
      <CommenterForReply comment_id={_id} addReplyToUi={addReplyToUi} />
      {replies.map((value) => <Reply name={value.name.name} profilePic={value.name.profilePic} email={value.name.email} reply={value.value} deleteReply={deleteReply} />)}
    </ReplyHolder>}
  </CommentWrapper>)
}


export default IndividualComment
