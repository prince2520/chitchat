import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

import useCompressImg from "../../hooks/useCompressImg";
import useProgressiveImg from "../../hooks/useProgressiveImg";

import "./ImageContainer.css";

const CustomDiv = styled.div`
  width: ${({ $width }) => `${$width}rem` || "100%"};
  height: ${({ $height }) => `${$height}rem` || "100%"};

  @media only screen and (max-width: 600px) {
    width: ${({ $width }) => `${$width*0.8}rem` || "100%"};
    height: ${({ $height }) => `${$height * 0.8}rem` || "100%"};
  }

  @media only screen and (min-width: 600px) and (max-width: 768px) {
    width: ${({ $width }) => `${$width * 0.85}rem` || "100%"};
    height: ${({ $height }) => `${$height * 0.85}rem` || "100%"};
  }

  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: ${({ $width }) => `${$width * 0.875}rem` || "100%"};
    height: ${({ $height }) => `${$height * 0.875}rem` || "100%"};
  }

  @media only screen and (min-width: 992px) and (max-width: 1200px) {
    width: ${({ $width }) => `${$width * 0.9}rem` || "100%"};
    height: ${({ $height }) => `${$height * 0.9}rem` || "100%"};
  }
`;

const ImageContainer = ({
  highResUrl,
  width = "4rem",
  height = "4rem",
  circle = true,
  lowResUrl,
  isEditable = false,
  editImageHandler = (newHighResUrl, newLowResUrl) => {},
}) => {
  const imageRef = useRef();
  const [preview, setPreview] = useState(null);
  const [imageSrc, { blur }] = useProgressiveImg(lowResUrl, highResUrl);
  const [newHighResUrl, newLowResUrl, setData] = useCompressImg();

  const widthInt = parseInt(width.replace(/[^\d.]/g, ""));
  const heightInt = parseInt(height.replace(/[^\d.]/g, ""));

  useEffect(() => {
    if (newHighResUrl && newLowResUrl) {
      const readImg = new FileReader();
      readImg.onloadend = () => {
        setPreview(readImg.result);
      };
      readImg.readAsDataURL(newHighResUrl);
    } else {
      setPreview(null);
    }
  }, [newHighResUrl, newLowResUrl]);

  useEffect(() => {
    editImageHandler(newHighResUrl, newLowResUrl);
  }, [newHighResUrl, newLowResUrl, editImageHandler]);

  return (
    <div className={"image-edit-container"}>
      <CustomDiv
        $width={widthInt}
        $height={heightInt}
        className={`flex-center image-container ${
          circle ? "image-circle" : ""
        }`}
      >
        <img
          style={{
            filter: blur ? "blur(10px)" : "none",
            transition: blur ? "none" : "filter 0.3s ease-out",
          }}
          alt={"progressive"}
          src={preview || imageSrc}
        />
      </CustomDiv>
      {isEditable ? (
        <>
          <input
            accept="image/*"
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setData(event);
            }}
          />
          <div
            className={"flex-center cursor-btn edit-btn box-shadow"}
            onClick={() => imageRef.current?.click()}
            style={{ right: `${widthInt * 0.425}rem` }}
          >
            <Icon
              icon="material-symbols:edit"
              fontSize={`${widthInt * 0.1}rem`}
              color={`var(--primary)`}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ImageContainer;
