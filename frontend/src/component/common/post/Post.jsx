import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CarouselCommon from '../carousel/Carousel';
import { AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import Comment from './../comment/Comment';
import { LikeUnlikeApi } from './api';
import { connect } from 'react-redux';

const PostWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0px 0px 1px  1px teal;
  margin: 20px 0px;
`;

const Heading = styled.h4`
  padding: 5px;
  margin: 0px;
`;

const Content = styled.p`
  padding: 5px;
  margin: 0px;
  line-height: 1.5;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 1px solid teal;
  background: teal;
  align-self: left;
`;

const UserName = styled.p`
  font-size: 22px;
  font-weight: 600;
  align-self: left;
  margin-left: 20px;
`;

const ImgProfile = styled.img`
height: 80px;
width: 80px;
border-radius: 50%;
`;

const LikeCommentDiv = styled.div`
  margin: 0px;
  padding: 5px 0px;
`;

const Unit = styled.div`
  width: 40%;
  padding: 10px;
  background: teal;
  border: 1px solid grey;
  text-align: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const Post = (props) => {
  const [showComment, setShowComment] = useState(false);
  const [liked, setLiked] = useState(null);
  const [currentPostLiked, setCurrentPostLiked] = useState(false);
  const { postContent, mySelf } = props;

  const changeLikes = async () => {
    const value = { post_id: postContent._id, profile_id: mySelf.id, liked: currentPostLiked }
    console.log(value)
    try {
      const res = await LikeUnlikeApi(value, localStorage.getItem("token"));
      setLiked(res.data.like);
      setCurrentPostLiked(!currentPostLiked)

    } catch (error) {
      console.log(error);
    }
  }

  const checkWeatherPostisLiked = () => {
    if (!!postContent.likes && postContent.likes.includes(mySelf.id)) {
      setCurrentPostLiked(true);
      setLiked(postContent.likes.length);
    } else {
      setCurrentPostLiked(false)
      setLiked(postContent.likes.length);
    }
  }

  useEffect(() => {
    checkWeatherPostisLiked();
  }, []);

  return (
    <PostWrapper>
      <PostHeader className="d-flex">
        <UserImage>{!!postContent.profile && postContent.profile.profilePic && <ImgProfile src={postContent.profile.profilePic} />}</UserImage>
        <UserName>{!!postContent.profile && postContent.profile.name}</UserName>
      </PostHeader>
      <Heading>
        {postContent.title}
      </Heading>
      <Content>
        {postContent.content}
      </Content>
      <CarouselCommon files={postContent.images} />
      <LikeCommentDiv className="between-flex">
        <Unit onClick={changeLikes}><BiLike /> {liked}</Unit>
        <Unit onClick={() => setShowComment(!showComment)}><AiOutlineComment /></Unit>
      </LikeCommentDiv>
      {showComment &&
        <Comment
          showComment={showComment}
          setShowComment={(arg) => setShowComment(arg)}
          post_id={postContent._id}
        />}
    </PostWrapper>
  )
}
const mapStateToProps = (state) => ({
  mySelf: state.loginReducer.user
})
export default connect(mapStateToProps, null)(Post);
