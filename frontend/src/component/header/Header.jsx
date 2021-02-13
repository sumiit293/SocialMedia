import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import logo from './../common/assets/icons/logo.png';
import { AiOutlineMenuFold } from "react-icons/ai";
import { connect } from 'react-redux';
import { checkAuthentication } from './../login/action';
import ContentForDropDown from './ContentForDropDown';
import { searchUser, showDD, hideDD, setCurrentSearchPage } from './../search-user/action';
import { withRouter } from 'react-router-dom';

const HeaderWrapper = styled.div`
  margin: 0px;
  padding: 0px 0px;
  background: lightgrey;
  max-height: 60px;
  min-height: 60px;
`;

const Logo = styled.img.attrs({ src: logo })`
  display: block;
  max-height: 50px;
  width: 200px;
`;

const HambergerMenu = styled.div`
  padding: 10px;
  margin: 0px;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
`;

const InputSearchDiv = styled.div`
  position: relative;
  width: 40%;
  max-height: 60px;
`;

const InputSearch = styled.input.attrs({ placeholder: "Search friends..." })`
  padding: 10px 10px;
  display: block;
  font-size: 15px;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 10px;
  color: grey;
  box-sizing: border-box;
`;

const SearchDropDownDiv = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
`;

const Header = (props) => {
  const { userLoggedIn,
    setLoggedInState,
    setExtended,
    searchResult,
    searchUser,
    showDD,
    hideDD,
    history,
    setCurrentSearchPage
  } = props;
  const header = useRef();
  useEffect(() => {
    //dealing with authenntication
    const token = localStorage.getItem("token");
    if (!userLoggedIn) {
      setLoggedInState(token);
    }
    //getting the path name 
    if (history.location.pathname === "/test") {
      setCurrentSearchPage();
    }
    //eslint-disable-next-line
  }, [history.location.pathname, userLoggedIn])
  return (
    <HeaderWrapper className="between-flex">
      <Logo />
      <InputSearchDiv ref={header}>
        <InputSearch
          onChange={(e) => searchUser(e.target.value)}
          onFocus={showDD}
        />
        <SearchDropDownDiv>
          {!searchResult.current_page_search && searchResult.show_dd &&
            <ContentForDropDown
              searchResult={searchResult}
              hideDD={() => hideDD()}
              header={header}
            />}
        </SearchDropDownDiv>
      </InputSearchDiv>
      <HambergerMenu>
        <AiOutlineMenuFold onClick={setExtended} />
      </HambergerMenu>
    </HeaderWrapper>
  )
}
const mapStateToProps = (state) => ({
  userLoggedIn: state.loginReducer.loggedInUser,
  authenticating: state.loginReducer.isLoading,
  searchResult: state.searchUserReducer
})
const mapDispatchToProps = (dispatch) => ({
  setLoggedInState: (value) => dispatch(checkAuthentication(value)),
  searchUser: (value) => dispatch(searchUser(value)),
  showDD: () => dispatch(showDD()),
  hideDD: () => dispatch(hideDD()),
  setCurrentSearchPage: () => dispatch(setCurrentSearchPage())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
