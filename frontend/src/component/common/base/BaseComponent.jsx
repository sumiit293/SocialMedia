import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../header/Header';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { withRouter } from 'react-router-dom';

const GlobalWrapper = styled.div`
  max-width: 100%;
  overflow-X: hidden;
  position: relative;
  height: 100vh;
`;

const SlideMenu = styled.div`
  position: fixed;
  width: 250px;
  border: 1px solid teal;
  background: teal;
  top: 0;
  bottom: 0;
  right: -255px;
  z-index: 100;
  transition: all ease-in 0.3s;
  &.into-frame {
      right: 0px;
  }
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 10px 10px;
  background: teal;
  color: white;
  weight: 600;
  border: 1px solid white;
  margin: 10px 0px;
  cursor: pointer;
  &.big-font{
      font-size: 30px;
  }
  &.border-remove{
      border: none;
  }
  &:hover{
    background: white;
    color: teal;
  }
`;

const Children = styled.div`
`;

const Overlay = styled.div`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0,181,181,0.3);
 z-index: 10;
`;

const BaseComponent = (props) => {
    const [extended, setExtended] = useState(false);
    const Menu = [{ name: "test", path: "/test" }, { name: "Home", path: "/home" }, { name: "Profile", path: "/profile" }, { name: "Chat", path: "/chat" }, { name: "Account Setting", path: "/account-setting" }];
    const handleClick = (value) => {
        setExtended(false);
        props.history.push(value.path);
    }
    return (
        <GlobalWrapper>
            <Header setExtended={() => setExtended(!extended)} />
            <SlideMenu className={extended ? "into-frame" : ""}>
                <MenuItem className="big-font border-remove" onClick={() => setExtended(false)}>
                    <AiOutlineMenuUnfold />
                </MenuItem>
                {Menu.map((value, index) => <MenuItem onClick={() => handleClick(value)} key={index}>{value.name}</MenuItem>)}
            </SlideMenu>
            <Children>
                {props.children}
                {extended && <Overlay onClick={() => setExtended(!extended)} />}
            </Children>
        </GlobalWrapper>
    )
}

export default withRouter(BaseComponent)
