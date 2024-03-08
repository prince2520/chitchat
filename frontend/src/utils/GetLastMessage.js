import { Icon } from "@iconify/react";

export const getLastMessage = (lastMsg) => {
  let msg = "";
  switch (lastMsg.type) {
    case "string":
      msg = <p>{lastMsg.message}</p>;
      break;
    case "image":
      msg = (
        <p className="flex-center">
          <Icon icon="typcn:image" /> Photo
        </p>
      );
      break;
    case "audio":
      msg = (
        <>
          <span>
            <Icon icon="typcn:image" />
          </span>{" "}
          Photo
        </>
      );
      break;
    case "video":
      msg = (
        <>
          <span>
            <Icon icon="akar-icons:video" />
          </span>
          Video
        </>
      );
      break;
    default:
      msg = (
        <>
          <span>
            <Icon icon="ic:baseline-audio-file" />{" "}
          </span>
          Other
        </>
      );
  }

  return msg;
};
