import './DragAndDropFiles.css';
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {DragAndDropActions} from "../../../store/dragAndDrop";

const DragAndDropFiles = ({data}) => {

    const dispatch = useDispatch();


    return (
        <div className={'drag-and-drop-files'}>
            <div className={'drag-and-drop-files-icon'}>
                {
                    data.type === 'image' ?
                    <img  src={data.location} alt={'location'}/> : <Icon icon="solar:folder-with-files-bold" />
                }
            </div>
            <div className={'drag-and-drop-files-name'}>
                {data.name.substr(0, 40)}{data.name.length > 30 && "..."}
            </div>
            <div className={'drag-and-drop-files-type'}>
                {data.type.toUpperCase()}
            </div>
            <div className={'drag-and-drop-files-size'}>
                {data.size.toFixed(3)} MB
            </div>
            <div className={'drag-and-drop-files-delete'}>
                <Icon icon="mingcute:close-fill"  onClick={()=>dispatch(DragAndDropActions.removeSingleFile(data))}/>
            </div>
        </div>

    );
};

export default DragAndDropFiles;