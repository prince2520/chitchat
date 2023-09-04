import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";

import Button from "../../../../components/Button/Button";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import CustomInput from "../../../../components/CustomInput/CustomInput";

import {createGroup} from "../../../../api/api";
import {UserActions} from "../../../../store/user";
import {compressImageHandler, saveImageIntoFirebase} from "../../common_function";

import AuthContext from "../../../../context/auth";

import './CreateGroup.css';

const CreateGroup = () => {
    const imageRef = useRef();
    const [preview, setPreview] = useState(null);
    const [groupImage, setGroupImage] = useState(null);
    const authData = useSelector(state => state.user);
    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (groupImage) {
            const readImg = new FileReader();
            readImg.onloadend = () => {
                setPreview(readImg.result);
            }
            readImg.readAsDataURL(groupImage)
        } else {
            setPreview(null)
        }
    }, [groupImage]);


    const createGroupHandler = async (groupName, groupImg) => {
        let firebaseUrl = await saveImageIntoFirebase(groupImg)

        createGroup(authCtx?.token, groupName, authData.username, authCtx?.userId, firebaseUrl).then((res) => {
            if(res.success){
                dispatch(UserActions.addGroupHandler(res.groupData));
                navigate('/chat');
            }
        }).catch(err=>console.log(err));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let groupName = event.target[1].value;

        await createGroupHandler(groupName, groupImage);
    }


    return (
        <form className='create-group-container' onSubmit={(event)=>submitHandler(event)}>
            <div className='heading'>
                Create a Group
            </div>
            <div className={'image-edit-container'}>
                <ImageContainer src={preview}/>
                <input accept='image/*'
                       ref={imageRef} type="file"
                       style={{display: "none"}}
                       onChange={(event) => {
                           compressImageHandler(event, setGroupImage);
                       }}/>
                <div className={'edit-btn box-shadow'} onClick={()=>imageRef.current?.click()}>
                    <Icon
                        icon="material-symbols:edit"
                        fontSize={'1.5rem'}
                        color={`var(--primary)`}/>
                </div>
            </div>
            <CustomInput label={'Name'} icon={'material-symbols:edit'}/>
            <div className='create-group-btn'>
                <Button title={'Create'}/>
            </div>
        </form>
    );
};

export default CreateGroup;