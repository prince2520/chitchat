import { Icon } from "@iconify/react";
import { isValidUrl } from "./IsValidUrl";

export const getLastMessage = (lastMsg) => {
  let msg = "";
  switch (lastMsg.type) {
    case "string":
      msg = (
        <>
          {isValidUrl(lastMsg.message) ? <Icon icon="ph:link-fill" /> : null}{" "}
          {lastMsg?.message.length > 0 && lastMsg.message.substr(0, 20)}{" "}
          {lastMsg?.message.length > 20 && "..."}
        </>
      );

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
          <Icon icon="ic:round-audio-file" />
          Audio
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
          <Icon icon="ph:file-fill" /> Other
        </>
      );
  };
  return msg;
};
