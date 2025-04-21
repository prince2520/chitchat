import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import { DragAndDropActions } from "../../../../../redux/slice/dragAndDropSlice";

import "./DragAndDropFiles.css";

const DragAndDropFiles = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className={"drag-and-drop-files"}>
      <div className={"drag-and-drop-files-icon"}>
        {data.type === "image" ? (
          <img src={data.location} alt={"location"} />
        ) : (
          <Icon icon="solar:folder-with-files-bold" />
        )}
      </div>
      <h6 className={"color-text-light drag-and-drop-files-name"}>
        {data.name.substr(0, 40)}
        {data.name.length > 30 && "..."}
      </h6>
      <h6 className={"color-text-light drag-and-drop-files-type"}>{data.type.toUpperCase()}</h6>
      <h6 className={"color-text-light drag-and-drop-files-size"}>{data.size.toFixed(3)} MB</h6>
      <div className={"drag-and-drop-files-delete"}>
        <Icon
          fontSize={'1.5rem'}
          className="color-text-light"
          icon="mingcute:close-fill"
          onClick={() => dispatch(DragAndDropActions.removeSingleFileReducer(data))}
        />
      </div>
    </div>
  );
};

export default DragAndDropFiles;
