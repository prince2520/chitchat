import NoDataLargeImg from "../../../../../assests/images/NoDataLarge.png";
import NoDataSmallImg from "../../../../../assests/images/NoDataSmall.png";

import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import "./NoGroupPrivate.css";

const NoGroupPrivate = ({isPrivate}) => {
  return (
    <div className="flex-center no-group-private">
      <ImageContainer circle={false} width="80%" height="auto" highResUrl={ NoDataLargeImg} lowResUrl={NoDataSmallImg}/>
      <div className="flex-center no-group-private__description">
        <h5>No { isPrivate ? 'Privates' : 'Groups'} Found!</h5>
        <p>When you create { isPrivate ? 'Privates' : 'Groups'}, they will appear in here.</p>
      </div>
    </div>
  );
};

export default NoGroupPrivate;
