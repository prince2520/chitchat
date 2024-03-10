import "./ImageContainer.css";
const ImageContainer = ({ src, width = "4rem", height = "4rem" }) => {
  return (
    <div
      className="flex-center image-container"
      style={{ width: width, height: height }}
    >
      <img alt={"group"} src={src ? src : "https://i.imgur.com/SNl3ZA8.jpg"} />
    </div>
  );
};

export default ImageContainer;
