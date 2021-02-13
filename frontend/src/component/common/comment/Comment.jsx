import React, { Fragment, useState, useEffect } from 'react';
import Commenter from './Commenter';
import IndividualComment from './IndividualComment';
import { connect } from 'react-redux';
import { getCommentApi, addCommentApi, deleteCommentApi } from './api';


const Comment = (props) => {
    const { setShowComment, showComment, post_id, mySelf } = props;

    const [commentInLocal, setCommentInLocal] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(props);
    const runOnStart = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token");
            const res = await getCommentApi(post_id, token);
            setCommentInLocal(res.data.comment);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setCommentInLocal([]);
            setLoading(false);
        }
    }

    const addCommentToUi = (name, email, value, _id) => {
        const comment = {
            _id: _id,
            profile: { name: name, email: email },
            comment: value,
            replies: []
        }
        setCommentInLocal([comment, ...commentInLocal]);
    }

    const addComment = async (comment) => {
        try {
            const reqObject = {
                post_id: post_id,
                profile_id: mySelf.id,
                comment: comment
            }
            const token = localStorage.getItem("token");
            const res = await addCommentApi(reqObject, token);
            addCommentToUi(mySelf.name, mySelf.email, comment, res.data.comment_id);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (comment_id) => {
        const value = {
            comment_id: comment_id,
            post_id: post_id
        }
        try {
            await deleteCommentApi(value, localStorage.getItem("token"));
            setCommentInLocal(commentInLocal.filter((comment) => comment._id !== comment_id))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        runOnStart();
    }, [])

    return (
        <Fragment>
            <Commenter
                setShowComment={setShowComment}
                showComment={showComment}
                user_name={mySelf.name}
                profile_pic={mySelf.profilePic}
                addComment={addComment}
            />
            {!!commentInLocal.length > 0 && commentInLocal.map((comment) => <IndividualComment comment={comment} post_id={post_id} deleteComment={deleteComment} />)}
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    mySelf: state.loginReducer.user
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
