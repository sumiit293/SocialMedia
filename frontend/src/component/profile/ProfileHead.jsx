import React,{useState,useRef,useEffect } from 'react';
import styled from 'styled-components';
import { FcEditImage } from "react-icons/fc";
import { changeProfilePhotoApi,changeCoverPhotoApi } from './api';
import { toast } from 'react-toastify';

const ProfileHeadWrapper = styled.div`
  width: 100%;
`;

const CoverPic = styled.div`
 position: relative;
 background: black;
 min-height: 250px;
 max-height: 250px;
 overflow: hidden;
 z-index: 10;
`;

const ProfilePic = styled.div`
  width: 150px;
  position: relative;
  height: 150px;
  border-radius: 50%;
  border: 1px solid teal;
  margin: -120px auto 10px auto;
  overflow: hidden;
  z-index: 10;
  background: white;
`;

const NameSection = styled.h1`
  text-align: center;
`;

const ProfileChangeIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: white; 
  right: 20px;
  bottom: 20px;
  z-index: 11;
  cursor: pointer;
`;

const CoverChangeIcon = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: white; 
  right: 20px;
  top: 20px;
  z-index: 11;
  cursor: pointer;
`;

const ImageCover = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ImageProfile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const EditDiv = styled.div`
  position: absolute;
  width: 120px;
  background: white; 
  z-index: 12;
  cursor: pointer;
  top: ${props=> !!props.top ? props.top : "40%"};
  left: ${props=> !!props.left ? props.left : "10%"};
`;

const LabelPara = styled.p`
  margin: 0px 0px;
  padding: 5px;
  font-size: 12px;
  border: 1px solid teal;
  &:hover {
    background: black;
    color: white;
  }
`;

const PhotAddButton = styled.input.attrs({type: "file"})`
  height: 0px;
  width: 0px;
  overflow: hidden;
`;

const ProfileHead = (props) => {

  const [showProfileChange,setShowProfileChange] = useState(false);
  const [showCoverChange,setShowCoverChange] = useState(false);
  const [currentProfileToBeSent,setCurrentProfileToBeSent] = useState(null);
  const [currentCoverToBeSent,setCurrentCoverToBeSent] = useState(null);
  const photoButtonRef1 = useRef();
  const photoButtonRef2 = useRef();
  const { profile , setProfileRefresher,profileRefresher} = props;

  const changeProfilePhoto = async ()=>{
    if(currentProfileToBeSent){
      const value = new FormData();
      value.append("profile_photo",currentProfileToBeSent)
      try {
        await changeProfilePhotoApi(value,localStorage.getItem("token"));
        setCurrentProfileToBeSent(null);
        setProfileRefresher(!profileRefresher)
        toast.success("Updated succesfully");
      } catch (error) {
        console.log(error);
        setCurrentProfileToBeSent(null)
        toast.error("Sorry Something went wrong !")
      }
    }
  }

  const changeCoverPhoto = async ()=>{
    if(currentCoverToBeSent){
      const value = new FormData()
      value.append("cover_photo",currentCoverToBeSent)
      try {
        await changeCoverPhotoApi(value,localStorage.getItem("token"));
        setCurrentCoverToBeSent(null);
        setProfileRefresher(!profileRefresher)
        toast.success("Updated succesfully");
      } catch (error) {
        console.log(error);
        setCurrentCoverToBeSent(null);
        toast.error("Sorry Something went wrong !")
      }
    }
  }
  //effect for changin the profilephoto
  useEffect(()=>{
    changeProfilePhoto();
    return ()=> setCurrentProfileToBeSent(null)
    //eslint-disable-next-line
  },[currentProfileToBeSent])

  //Efffect for changin the coverphoto
  useEffect(()=>{
    changeCoverPhoto();
    return ()=> setCurrentCoverToBeSent(null)
    //eslint-disable-next-line
  },[currentCoverToBeSent])

  return (
    <ProfileHeadWrapper>
      <CoverPic>
        <ImageCover src={!!profile && !!profile.profile.coverPic ? profile.profile.coverPic: '/common-pic/profile.png'} />
        <CoverChangeIcon>
          <FcEditImage onClick={()=> setShowCoverChange(!showCoverChange)}/>
        </CoverChangeIcon>
        {showCoverChange && <EditDiv top={"40px"} left={`calc(100% - 120px)`}>
          <LabelPara onClick= {()=>photoButtonRef2.current.click()}>Change Photo</LabelPara>
        </EditDiv>}
      </CoverPic>
      <ProfilePic>
        <ImageProfile src={(!!profile && !!profile.profile.profilePic) ? profile.profile.profilePic : '/common-pic/profile.png'} />
        <ProfileChangeIcon>
          <FcEditImage onClick={()=> setShowProfileChange(!showProfileChange)} />
        </ProfileChangeIcon>
        {showProfileChange && <EditDiv>
          <LabelPara onClick = {()=>photoButtonRef1.current.click()}>Change Photo</LabelPara>
        </EditDiv>}
      </ProfilePic>
      <NameSection>
        {profile.profile.name}
      </NameSection>
      <PhotAddButton ref={photoButtonRef1} onChange={(e)=> setCurrentProfileToBeSent(e.target.files[0])}/>
      <PhotAddButton ref={photoButtonRef2} onChange={(e)=> setCurrentCoverToBeSent(e.target.files[0])}/>

    </ProfileHeadWrapper>
  )
}
export default ProfileHead
