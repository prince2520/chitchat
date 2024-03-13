import Button from "../../components/Button/Button"
import NotFoundLarge from "../../assests/images/404Large.png";
import NotFoundSmall from "../../assests/images/404Small.png";
import ImageContainer from "../../components/ImageContainer/ImageContainer";

import { useNavigate } from "react-router-dom";

import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-center not-found-page">
      <div className="flex-center not-found-page__content">
        <h1> Page not found</h1>
        <h5>Unfortunately, the page you are looking for does not exit</h5>
        <Button width={"fit-content"} onClick={() => navigate("/")}>
          <h5 className="color-text">Go to home page</h5>
        </Button>
      </div>
      <div className="not-fount-page__image">
        <ImageContainer
         width="20rem"
         highResUrl={NotFoundLarge} 
         lowResUrl={NotFoundSmall} height="auto" circle={false}/>
        {/* <Lottie animationData={NotFoundPageAnimation} loop={true} /> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
