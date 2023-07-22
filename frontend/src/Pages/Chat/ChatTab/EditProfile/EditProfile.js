import './EditProfile.css';
import ImageContainer from "../../../../Helper/ImageContainer/ImageContainer";
import CustomInput from "../../../../Helper/CustomInput/CustomInput";
import Button from "../../../../Helper/Button/Button";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../../../Context/auth";
import {UserActions} from "../../../../store/user";
import {saveProfile} from "../../../../api";
import {compressImageHandler, saveImageIntoFirebase} from "../../common_function";


const EditProfile = () => {
    const authData = useSelector(state => state.user);
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch();

    const [profileImage, setProfileImage] = useState(null)
    const [preview, setPreview] = useState(null);
    const imageRef = useRef();

    useEffect(() => {
        if (profileImage) {
            const readImg = new FileReader();
            readImg.onloadend = () => {
                setPreview(readImg.result);
            }
            readImg.readAsDataURL(profileImage)
        } else {
            setPreview(null)
        }
    }, [profileImage]);

    const saveProfileBackend = async (username, status, profileImageUrl = null) => {
        let data = {
            userId: authCtx.userId,
            username: username,
            status: status,
        };
        if (profileImageUrl) {
            data.profileImageUrl = profileImageUrl;
        }
        return saveProfile(authCtx.token, data);
    };

    const saveProfileDetail = async (username, status) => {
        let firebaseUrl = await saveImageIntoFirebase(profileImage)

        saveProfileBackend(username, status, firebaseUrl).then(() => {
            dispatch(UserActions.saveUserData({
                username: username,
                status: status,
                profileImageUrl: firebaseUrl
            }));
        }).catch(err=>console.log(err));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let username, status;

        username = event.target[1].value;
        status = event.target[2].value;

        await saveProfileDetail(username, status)
    }

    return (
        <form className='create-group-container' onSubmit={(event) => submitHandler(event)}>
            <div className='heading'>
                My Profile
            </div>
            <div className={'image-edit-container'}>
                <ImageContainer src={preview ? preview : authData?.profileImageUrl}/>
                <input accept='image/*'
                       ref={imageRef} type="file"
                       style={{display: "none"}}
                       onChange={(event) => {
                           compressImageHandler(event, setProfileImage);
                       }}/>
                <div className={'edit-btn box-shadow'} onClick={() => {
                    imageRef.current.click()
                }}>
                    <Icon icon="material-symbols:edit" fontSize={'1.5rem'} color={`var(--primary)`}/>
                </div>
            </div>
            <CustomInput defaultValue={authData?.username} type={'text'} label={'Name'} icon={'material-symbols:edit'}/>
            <CustomInput defaultValue={authData?.status} type={'text'} label={'About Me'}
                         icon={'material-symbols:edit'}/>
            <div className='create-group-btn'>
                <Button title={'Save'}/>
            </div>
        </form>
    );
};
export default EditProfile;