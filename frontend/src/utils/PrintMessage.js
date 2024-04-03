import date from "date-and-time";

import MessageOther from "../pages/Chat/ChatBox/ChatBoxMiddle/Message/MessageOther/MessageOther";
import MessageImage from "../pages/Chat/ChatBox/ChatBoxMiddle/Message/MessageImage/MessageImage";
import MessageAudio from "../pages/Chat/ChatBox/ChatBoxMiddle/Message/MessageAudio/MessageAudio";
import MessageVideo from "../pages/Chat/ChatBox/ChatBoxMiddle/Message/MessageVideo/MessageVideo";
import MessageString from "../pages/Chat/ChatBox/ChatBoxMiddle/Message/MessageString/MessageString";

export const printMessage = (messageDetail, myMsg) => {
    let message, createdTime, time;

    createdTime = new Date(messageDetail.createdAt);

    time = date.format(createdTime, "h:mm A");

    switch (messageDetail.type) {
      case "string":
        message = <MessageString message={messageDetail.message} time={time} />;
        break;
      case "audio":
        message = <MessageAudio url={messageDetail.url} time={time} />;
        break;
      case "image":
        message = (
          <MessageImage
            time={time}
            myMsg={myMsg}
            imageSrc={messageDetail.url}
          />
        );
        break;
      case "video":
        message = <MessageVideo url={messageDetail.url} time={time} />;
        break;
      default:
        message = <MessageOther myMsg={myMsg} messageDetail={messageDetail} />;
    }
    return message;
  };
