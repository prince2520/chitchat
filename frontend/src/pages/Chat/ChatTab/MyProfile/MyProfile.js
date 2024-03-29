import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";

import Dropdown from "../../../../components/Dropdown/Dropdown";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import "./MyProfile.css";

const MyProfile = () => {
  
  const [showDropdown, setShowDropdown] = useState(false);

  const highResUrl = useSelector((state) => state.user.highResUrl);
  const lowResUrl = useSelector((state) => state.user.lowResUrl);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });


  return (
    <div className={"flex-center my-profile-container border"}>
      <ImageContainer highResUrl={highResUrl} lowResUrl={lowResUrl} />
      <span onClick={() => setShowDropdown((prevState) => !prevState)}>
        <Icon
          ref={ref}
          icon="gridicons:dropdown"
          style={{ fontSize: "3rem"}}
        />
      </span>
      {showDropdown && <Dropdown />}
    </div>
  );
};
export default MyProfile;
