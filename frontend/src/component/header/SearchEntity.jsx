import React from 'react';
import styled from 'styled-components';

const SearchUserThumbnailWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0px auto;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background: teal;
  border: 1px solid grey;
  padding: 10px;
  cursor: pointer;
  color: white;
  &:hover{
    background: white;
    color: teal;
  }
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

const SearchEntity = (props) => {
  const { individualSearch: { _source: { name, address } } } = props;
  return (
    <SearchUserThumbnailWrapper>
      <ThumbnailContainer>
        <PicDiv>
        </PicDiv>
        <InfoDiv>
          <ProfileNameContainer>
            {name}
          </ProfileNameContainer>
          <AdditionalInfoDiv>
            {address}
          </AdditionalInfoDiv>
        </InfoDiv>
      </ThumbnailContainer>
    </SearchUserThumbnailWrapper>
  )
}
export default SearchEntity;
