import React, { Fragment } from 'react';
import styled from 'styled-components';
import Post from '../common/post/Post';

const LowerSectionWrapper = styled.div``;

const ProfileLowerSection = (props) => {
    const { profile } = props;
    return (
        <Fragment>
            {!!null && profile && <LowerSectionWrapper>
                {profile.profile.posts.map((value, index) => <Post key={index} value={value} />)}
            </LowerSectionWrapper>}
        </Fragment>
    )
}
export default ProfileLowerSection;
