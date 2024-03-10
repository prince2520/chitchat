import "./NoGroupPrivate.css";
import NoGroupPrivateImage from "../../../../../assests/images/NoGroupPrivate.svg";

const NoGroupPrivate = ({isPrivate}) => {
  return (
    <div className="flex-center no-group-private">
      <img src={NoGroupPrivateImage} />
      <div className="flex-center no-group-private__description">
        <h5>No { isPrivate ? 'Privates' : 'Groups'} Found!</h5>
        <p>When you create { isPrivate ? 'Privates' : 'Groups'}, they will appear in here.</p>
      </div>
    </div>
  );
};

export default NoGroupPrivate;
