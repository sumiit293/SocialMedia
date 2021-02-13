import React, { useEffect , useState} from 'react';
import ProfileHead from './ProfileHead';
import styled from 'styled-components';
import ProfileMidSection from './ProfileMidSection';
import ProfileLowerSection from './ProfileLowerSection';
import { connect } from 'react-redux';
import { fetchProfile } from './action';

const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  padding: 0px 5px;
`;

const Profile = (props) => {

    const { fetchProfile, profile, fetchingProfileInProgress } = props;
    const [profileRefresher,setProfileRefresher] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchProfile(token);
        //eslint-disable-next-line
    }, [profileRefresher])
    return (
        !!(fetchingProfileInProgress && profile != null) ? <h1 style={{ textAlign: "center", marginTop: "30px" }}>Fetching Details</h1> : <ProfileWrapper className="no-scroll::-webkit-scrollbar">
            {!!profile && <ProfileHead profile={profile} setProfileRefresher={setProfileRefresher} profileRefresher={profileRefresher}/>}
            {!!profile && <ProfileMidSection profile={profile} />}
            {!!profile && <ProfileLowerSection profile={profile} />}
        </ProfileWrapper>
    )
}
const mapStateToProps = (state) => ({
    profile: state.profileReducer.profile,
    errMsg: state.profileReducer.errMsg,
    fetchingProfileInProgress: state.profileReducer.fetchingProfileInProgress
});
const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (value) => dispatch(fetchProfile(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
