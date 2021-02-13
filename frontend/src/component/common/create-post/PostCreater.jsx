import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { IoIosAddCircle, IoIosRemoveCircleOutline } from "react-icons/io";
import RenderFieldTextArea from './../../common/primary-input/TextInput';
import { } from './../../common/validation-redux/validation';
import Button from '../button/Button';
import PostPreview from '../post/PostPreview';
import PopUp from '../pop-up/PopUp';

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const PostForm = styled.form``;

const CreatePost = styled.div`
  background: lightgrey;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 10px 0px;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 5px teal;
  }
`;

const ImageButtonDiv = styled.div`
  margin: 20px 0px;
`;

const InvisibleFileInput = styled.input.attrs({ type: "file", name: "photo", id: "new" })`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const PostCreater = (props) => {

    const fileRef = useRef();
    const clickButton = () => {
        fileRef.current.click()
    }
    const { handleSubmit } = props;
    const [extendedForm, setExtendedForm] = useState(false);
    const [preview, setPreview] = useState(false);
    const [formDataToBeSent, setFormDataToBeSent] = useState({
        heading: null,
        content: null,
        files: null
    });
    return (
        <Fragment>
            {!!preview && <PopUp>
                <PostPreview onClose={() => setPreview(!preview)} formDataToBeSent={formDataToBeSent} />
            </PopUp>}
            <Wrapper>
                <CreatePost className="center-flex" onClick={() => setExtendedForm(!extendedForm)}>
                    <p>Share your thoughts </p> &nbsp; &nbsp; {!extendedForm ? <IoIosAddCircle /> : <IoIosRemoveCircleOutline />}
                </CreatePost>
                {extendedForm && <PostForm className={!!extendedForm ? "unhide" : ""}>
                    <Field
                        name="title"
                        component={RenderFieldTextArea}
                        label="Post Title"
                        placeholder="Title of your post"
                        rows={1}
                    />

                    <Field
                        name="content"
                        component={RenderFieldTextArea}
                        label="Post Content"
                        rows="4"
                        placeholder="Enter your post..."

                    />
                    <InvisibleFileInput ref={fileRef} multiple />
                    <ImageButtonDiv className="between-flex">
                        <div className="W-40" onClick={clickButton}>
                            <Button label="add image" className="primary" />
                        </div>
                        <div className="W-40">
                            <Button label="Preview" className="primary" onClick={handleSubmit((value) => {
                                console.log(value, [...fileRef.current.files])
                                setFormDataToBeSent({
                                    ...formDataToBeSent,
                                    heading: value.title,
                                    content: value.content,
                                    files: [...fileRef.current.files]
                                });
                                setPreview(true);
                            })} />
                        </div>
                    </ImageButtonDiv>
                </PostForm>}
            </Wrapper>
        </Fragment>
    )
}

export default reduxForm({ form: "post_form" })(PostCreater)
