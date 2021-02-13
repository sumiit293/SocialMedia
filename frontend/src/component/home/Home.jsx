import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostCreater from '../common/create-post/PostCreater';
import Post from '../common/post/Post';
import { connect } from 'react-redux';
import { fetchPosts } from './action';

const HomeWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  padding: 0px 5px;
`;

const Home = (props) => {

    const { getAllPost, homePageReducer: { post, fetchingInProgress, errMsg } } = props;
    useEffect(() => {
        const token = localStorage.getItem("token");
        getAllPost(token);
        //eslint-disable-next-line
    }, [])

    return (
        <HomeWrapper>
            <PostCreater />
            {!!post.length > 0 && post.map((value) => <Post postContent={value} />)}
        </HomeWrapper>
    )
}

const mapStateToProps = (state) => ({
    homePageReducer: state.homePageReducer
})
const mapDispatchToProps = (dispatch) => ({
    getAllPost: (token) => dispatch(fetchPosts(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
