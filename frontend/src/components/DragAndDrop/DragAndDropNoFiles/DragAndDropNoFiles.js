import Button from "../../Button/Button";

import {useRef} from "react";

import './DragAndDropNoFiles.css';

const DragAndDropNoFiles = ({handleDropHelper}) => {
    const  uploadRef = useRef(null);

    return (
        <div className={'drag-and-drop-no-files'}>
            <input
                ref={uploadRef}
                type="file"
                style={{display: "none"}}
                onChange={(event) => {
                    handleDropHelper(event.target.files[0]);
                }}
                hidden/>
            <p>Drag and drop single and multiple files such as images </p>
            <Button type={'click'} title={'Upload'} onClick={()=>uploadRef?.current.click()}/>
        </div>
    );
};

export default DragAndDropNoFiles;