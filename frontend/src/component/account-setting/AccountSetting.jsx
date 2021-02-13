import React from 'react';
import AccountUpdateForm from './AccountUpdateForm';
import LogOutSection from './LogOutSection';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateInfo } from './action';
import { fetchProfile } from './../profile/action';
import { logout } from './../login/action';


const Wrapper = styled.div`
  max-width: 800px;
  padding: 0px;
  margin: 20px auto;
`;

const AccountSetting = (props) => {
    const { profileInfo: { bio, address, college, school,profilePic,name }, updateInfoInDb, updateInState, logout } = props;
    return (
        <Wrapper>
            <LogOutSection logout={logout} profilePic={profilePic} name={name} />
            <AccountUpdateForm
                initialValues={{ bio, address, college, school }}
                updateInfoInDb={updateInfoInDb}
                updateInState={updateInState}
            />
        </Wrapper>
    )
}
const mapStateToProps = (state) => ({
    profileInfo: state.profileReducer.profile.profile
})

const mapDispatchToProps = (dispatch) => ({
    updateInfoInDb: (value, token) => dispatch(updateInfo(value, token)),
    updateInState: (token) => dispatch(fetchProfile(token)),
    logout: () => dispatch(logout())
})
export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting)
