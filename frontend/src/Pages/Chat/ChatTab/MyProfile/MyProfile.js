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

  return (
    <div className={"flex-center border my-profile-container "}>
      <ImageContainer highResUrl={highResUrl} lowResUrl={lowResUrl} />
      <span
        onClick={() =>
          setTimeout(() => {
            setShowDropdown((prevState) => !prevState);
          }, 50)
        }
      >
        <Icon icon="gridicons:dropdown" style={{ fontSize: "3rem" }} />
      </span>
      {showDropdown && (
        <Dropdown showDropdown={showDropdown} closeDropdown={closeDropdown} />
      )}
    </div>
  );
};
export default MyProfile;
