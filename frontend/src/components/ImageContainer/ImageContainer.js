import "./ImageContainer.css";
import  useProgressiveImg  from "../../hooks/useProgressiveImg";
const ImageContainer = ({
  highResUrl,
  width = "4rem",
  height = "4rem",
  circle = true,
  lowResUrl,
}) => {

  const [imageSrc, { blur }] = useProgressiveImg(
    lowResUrl,
    highResUrl
  );

  return (
    
    <div
      className={`flex-center image-container ${circle ? "image-circle" : ""}`}
      style={{ width: width, height: height }}
    >
      <img
        style={{
          filter: blur ? "blur(10px)" : "none",
          transition: blur ? "none" : "filter 0.3s ease-out",
        }}
        alt={"progressive-image"}
        src={imageSrc}
      />
    </div>
  );
};

export default ImageContainer;
