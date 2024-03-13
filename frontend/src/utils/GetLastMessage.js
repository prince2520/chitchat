import { Icon } from "@iconify/react";

export const getLastMessage = (lastMsg) => {
  let msg = "";
  switch (lastMsg.type) {
    case "string":
      msg = <>{lastMsg.message}</>;
      break;
    case "image":
      msg = (
        <>
          <Icon icon="typcn:image" /> Photo
        </>
      );
      break;
    case "audio":
      msg = (
        <>
          <Icon icon="typcn:image" />
          Photo
        </>
      );
      break;
    case "video":
      msg = (
        <>
          <Icon icon="akar-icons:video" />
          Video
        </>
      );
      break;
    default:
      msg = (
        <>
          <Icon icon="ic:baseline-audio-file" /> Other
        </>
      );
  }

  return msg;
};
