import Button from "../../Button/Button";

import './DragAndDropNoFiles.css';
const DragAndDropNoFiles = () => {
    return (
        <div className={'drag-and-drop-no-files'}>
            <p>Drag and drop single and multiple files such as images </p>
            <Button type={'click'} title={'Upload'}/>
        </div>
    );
};

export default DragAndDropNoFiles;