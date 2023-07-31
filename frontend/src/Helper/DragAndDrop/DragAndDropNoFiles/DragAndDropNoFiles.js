import Button from "../../Button/Button";

import {useRef} from "react";

import './DragAndDropNoFiles.css';
const DragAndDropNoFiles = () => {
    const  inputRef = useRef();

    return (
        <div className={'drag-and-drop-no-files'}>
            <input
                onChange={(event) => {
                    console.log(event)
                }}
                ref={inputRef}
                hidden/>
            <p>Drag and drop single and multiple files such as images </p>
            <Button type={'click'} title={'Upload'}/>
        </div>
    );
};

export default DragAndDropNoFiles;