import React from 'react';
import styled from 'styled-components';
import { BsHouseDoorFill } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import { IoMail } from "react-icons/io5";
import PostCreater from '../common/create-post/PostCreater';

const Wrapper = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

const InfoSection = styled.div`
  width: 100%;
  padding: 10px 10px;
  margin: 5px auto;
  border-radius: 10px;
  box-sizing: border-box;
`;

const InfoUnit = styled.div`
  padding: 5px 0px;
  margin: 0px 0px 5px 0px; 
  display: flex;
  align-items: center;
  judtify-content: left;
`;

const InfoIcon = styled.div`
  margin: 0px 20px 0px 0px;
  padding: 5px;
  align-self: left;
  background: grey;
`;

const InfoText = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 5px 0px;
  align-self: left;
  font-size: 14px;
`;

const ProfileMidSection = (props) => {
  const { profile } = props;
  return (
    <Wrapper>
      <PostCreater />
      {<InfoSection>
        {[profile.profile.address].map((value, index) => <InfoUnit key={index}>
          <InfoIcon><BsHouseDoorFill /></InfoIcon>
          <InfoText>Email : {value}</InfoText>
        </InfoUnit>)}
        {[profile.profile.school].map((value, index) => <InfoUnit key={index}>
          <InfoIcon><MdSchool /></InfoIcon>
          <InfoText>School : {value}</InfoText>
        </InfoUnit>)}
        {[profile.profile.college].map((value, index) => <InfoUnit key={index}>
          <InfoIcon><IoMail /></InfoIcon>
          <InfoText>College : {value}</InfoText>
        </InfoUnit>)}
      </InfoSection>}
    </Wrapper>
  )
}
export default ProfileMidSection
