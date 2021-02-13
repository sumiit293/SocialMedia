import React from 'react';
import styled from 'styled-components';
import Button from '../common/button/Button';


const ProfilePic = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: white;
  border: 1px solid teal;
`;

const LeftHalf = styled.div`
    display: flex;
    max-width: 350px;
    align-items: center;
    justify-content: space-between;
`;

const NameBox = styled.div`
    font-size: 24px;
    margin-left: 20px;
    font-weight: 600;
`;


const ButtonDiv = styled.div`
  &.corner-smooth {
      border-radius: 20%;
      font-size: 10px;
  }
`;

const LogOutSection = ({ logout ,profilePic,name}) => {
    return (
        <div className="between-flex">
            <LeftHalf><ProfilePic src={profilePic} /><NameBox>{name}</NameBox></LeftHalf>
            <ButtonDiv className="corner-smooth">
                <Button label="log out" className="corner-smooth primary" onClick={logout} />
            </ButtonDiv>
        </div>
    )
}

export default LogOutSection
