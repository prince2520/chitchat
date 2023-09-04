import {Icon} from "@iconify/react";
import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Button from "../Button/Button";
import DragAndDropFiles from "./DragAndDropFiles/DragAndDropFiles";
import DragAndDropNoFiles from "./DragAndDropNoFiles/DragAndDropNoFiles";

import {ChatActions} from "../../store/chat";
import {categoryState} from "../../common";
import {DragAndDropActions} from "../../store/dragAndDrop";
import {messageHandler} from "../../Pages/Chat/sendMessage";
import {getDragAndDropData, saveImageIntoFirebase} from "../../Pages/Chat/common_function";

import AuthContext from "../../context/auth";

import './DragAndDrop.css';

const DragAndDrop = () => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const chat = useSelector(state => state.chat);
    const user = useSelector(state => state.user);


    const files = useSelector(state => state.dragAndDrop.files);

    useEffect(() => {
        return () => {
            dispatch(DragAndDropActions.removeAllFiles());
        }
    }, [])

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropHelper = (dragFile) => {
        let data = getDragAndDropData(dragFile);

        if (!files.find(file => file.name === data.name) &&
            files.length <= 2 &&
            data.size <= 20 &&
            data.type
        )
            dispatch(DragAndDropActions.addFileHandler(data));
    }

    const handleDrop = (event) => {
        event.preventDefault();
        handleDropHelper(event.dataTransfer.files[0]);
    };

    const sendMessageHandler = (message, users, chatId, cb, isOpenAIMsg = false, messageType, size, url) => {
        let data, messageData;

        messageData = {
            chatId: chatId,
            username: user.username,
            message: message,
            profileImageUrl: user.profileImageUrl,
            isOpenAIMsg: isOpenAIMsg,
            messageType: messageType,
            size: size,
            url: url,
            createdAt: (new Date()).toISOString()
        }

        data = {
            sender_id: authCtx?.userId,
            users: users,
        }

        data['messageData'] = {...messageData};

        if(chat.type===categoryState[1]){
            messageData['chatId'] = chat._id;
        }

        dispatch(ChatActions.saveChatMessage(messageData));

        cb(data);
    }

    const uploadHandler = (event) => {
        event.preventDefault();

        files.map((file) => {
            saveImageIntoFirebase(file.fileData)
                .then((url) => {
                    messageHandler(
                        file.name,
                        authCtx,
                        chat,
                        false,
                        sendMessageHandler,
                        user,
                        file.type,
                        file.size,
                        url
                    );
                    dispatch(DragAndDropActions.removeSingleFile(file));
                })
                .catch(err => console.log(err));
        });
    };


    return (
        <form className={'drag-and-drop-container'} onSubmit={(event) => uploadHandler(event)}>
            <div className='drag-and-drop-overlay' onClick={() => dispatch(DragAndDropActions.closeDragAndDrop())}/>
            <div className={'drag-and-drop-box border box-shadow'}>
                <div className={'close-btn'}>
                    <Icon icon="mingcute:close-fill" onClick={() => dispatch(DragAndDropActions.closeDragAndDrop())}/>
                </div>
                <h1>
                    Uploads
                </h1>
                <div className={'drag-and-drop-box-condition'}>
                    <span>Max Size: 20MB</span>
                    <span>Max Files: 3</span>
                </div>
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={'drag-and-drop-box-upload'}>
                    {files.length === 0 && <DragAndDropNoFiles handleDropHelper={handleDropHelper}/>}
                    {files.map(data => <DragAndDropFiles data={data}/>)}
                </div>
                {files.length > 0 && <Button title={'SEND'}/>}
            </div>
        </form>
    );
};

export default DragAndDrop;