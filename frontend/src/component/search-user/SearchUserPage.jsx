import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from './../common/button/Button';
import { connect } from 'react-redux';
import { removeCurrentSearchPage } from './action';
import { addFriendApi } from './api';

const SearchUserThumbnailWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0px auto;
`;

const SerachUserContent = styled.div`
  margin-bottom: 20px;
  border: 1px solid grey;
  padding: 10px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background: white;
  padding: 10px;
  cursor: pointer;
  color: teal;
`;

const PicDiv = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid teal;
  border-radius: 50%;
  marin-left: 10px;
  background: white;
`;

const InfoDiv = styled.div`
    margin-left: 20px;
`;

const ProfileNameContainer = styled.div`
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AdditionalInfoDiv = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 10px;
  margin-left: 5px;
`;

const LowerSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoResultFound = styled.div`
  text-align: center;
  padding: 20px;
  margin: 0px;
  color: teal;
  font-weight: bold;
  border: 1px solid teal;
`;

const AddFriendButtonContainer = styled.div`
  width: 200px;
  @media screen and (max-width: 450px){
      width: 140px;
  }
`;

const ViewProfileButtonContainer = styled.div`
  width: 200px;
  @media screen and (max-width: 450px){
    width: 140px;
}
`;


const SearchUserPage = (props) => {
  const { users, removeCurrentSearchPage } = props;
  useEffect(() => {
    return () => {
      removeCurrentSearchPage();
    }
    //eslint-disable-next-line
  }, [])

  const handleClicKAddFriend = (id) => {
    const token = localStorage.getItem("token");
    addFriendApi(token, { friend_id: id });
  }

  return (
    <SearchUserThumbnailWrapper>
      {users.map((user, index) => <SerachUserContent key={index}>
        <ThumbnailContainer>
          <PicDiv>
          </PicDiv>
          <InfoDiv>
            <ProfileNameContainer>
              {user._source.name}
            </ProfileNameContainer>
            <AdditionalInfoDiv>
              {user._source.address}
            </AdditionalInfoDiv>
          </InfoDiv>
        </ThumbnailContainer>
        <LowerSection>
          <AddFriendButtonContainer>
            <Button label="Add friend" className="primary" onClick={() => handleClicKAddFriend(user._source.user)} />
          </AddFriendButtonContainer>
          <ViewProfileButtonContainer>
            <Button label="view Profile" className="primary" />
          </ViewProfileButtonContainer>
        </LowerSection>
      </SerachUserContent>)}
      {users.length === 0 && <NoResultFound>No result found</NoResultFound>}
    </SearchUserThumbnailWrapper>
  )
}
const mapStateToProps = (state) => ({
  users: state.searchUserReducer.search_result
})
const mapDispatchToprops = (dispatch) => ({
  removeCurrentSearchPage: () => dispatch(removeCurrentSearchPage())
})
export default connect(mapStateToProps, mapDispatchToprops)(SearchUserPage);
