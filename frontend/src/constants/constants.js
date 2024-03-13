import VideoAnimation from "../assests/animations/Video.json";
import GroupAnimation from "../assests/animations/Group.json";
import MessageAnimation from "../assests/animations/Message.json";


export const categoryState = ["Group", "Private"];

export const chatFeatures = [
  {
    text: "Emojis, Media, Text - Connect Seamlessly, All-in-One Place!",
    animation: MessageAnimation,
  },
  {
    text: "Crystal-Clear Calls: Enjoy Seamless Audio and Video Connections!",
    animation: VideoAnimation,
  },
  {
    text: "Build Strong Bonds: Group Chats and Private Conversations, Made Easy!",
    animation: GroupAnimation,
  },
];


export const dropDownMenuOptions = [
  {
    title: "Chat",
    icon: "material-symbols:chat",
    link: "/chat",
  },
  {
    title: "Create a Group",
    icon: "el:group",
    link: "create-group",
  },
  {
    title: "Join a Group",
    icon: "material-symbols:join-outline",
    link: "join-group",
  },
  {
    title: "Edit Profile",
    icon: "material-symbols:edit",
    link: "edit-profile",
  },
];

export const chatTopSettingOptions = [
  {
    icon: "ph:users-three-bold",
    title: "Members",
  },
  {
    icon: "ic:outline-block",
    title: "Block List",
  },
  {
    icon: "mage:edit",
    title: "Edit",
  },
  {
    icon: "material-symbols:share",
    title: "Share",
  }
];
