import Button from "../../Button/Button";

import {useCallback, useRef} from "react";

import './DragAndDropNoFiles.css';

const DragAndDropNoFiles = () => {
    const  uploadRef = useRef(null);

    const uploadHandler = useCallback((event)=>{
        event.preventDefault();
    },[])

    return (
        <form className={'drag-and-drop-no-files'} onSubmit={(event)=>uploadHandler(event)}>
            <input
                ref={uploadRef}
                type="file"
                style={{display: "none"}}
                onChange={(event) => {
                    console.log(event.target.files[0]);
                }}
                hidden/>
            <p>Drag and drop single and multiple files such as images </p>
            <Button type={'submit'} title={'Upload'}/>
        </form>
    );
};

export default DragAndDropNoFiles;