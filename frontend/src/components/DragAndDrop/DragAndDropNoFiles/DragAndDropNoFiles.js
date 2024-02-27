import {useRef} from "react";

import Button from "../../Button/Button";

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
            <Button width={'50%'} backgroundColor="var(--primary)" onClick={()=>uploadRef?.current.click()}>
                <h5 className="color-text">Upload</h5>
            </Button>
        </div>
    );
};

export default DragAndDropNoFiles;