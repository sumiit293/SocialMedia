import React from 'react';
import styled from 'styled-components';
import CarouselCommon from '../carousel/Carousel';
import Button from '../button/Button';
import { createNewPost } from './action';
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
  font-size: 17px;
  font-weight: 600;
  align-self: left;
  margin-left: 20px;
`;

const LikeCommentDiv = styled.div`
  margin: 0px;
  padding: 5px 0px;
`;

const Unit = styled.div`
  width: 40%;
  padding: 5px;
  text-align: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const PostPreview = (props) => {

  const { onClose, formDataToBeSent: { heading, content, files }, createNewPost1 } = props;

  const newFormData = (heading, content, files) => {
    const formData = new FormData();
    formData.append("title", heading);
    formData.append("content", content);
    files.map((file) => {
      formData.append("photo", file)
    })
    return formData;
  }

  const handleClickPost = () => {
    const token = localStorage.getItem("token");
    createNewPost1(newFormData(heading, content, files), token);
  }

  return (

    <PostWrapper>
      <PostHeader className="d-flex">
        <UserImage />
        <UserName>Jhon Doe</UserName>
      </PostHeader>
      <Heading>
        {heading}
      </Heading>
      <Content>
        {content}
      </Content>
      <CarouselCommon files={files} />
      <LikeCommentDiv className="between-flex">
        <Unit><Button className="primary" label="Cancel" onClick={() => !!onClose & onClose()} /></Unit>
        <Unit><Button className="primary" label="Post" onClick={() => handleClickPost()} /></Unit>
      </LikeCommentDiv>
    </PostWrapper>
  )
}
const mapStateToProps = (state) => ({
  postStatusState: state.creatPostReducer
})
const mpaDispatchToProps = (dispatch) => ({
  createNewPost1: (value, token) => dispatch(createNewPost(value, token))
})
export default connect(mapStateToProps, mpaDispatchToProps)(PostPreview)
