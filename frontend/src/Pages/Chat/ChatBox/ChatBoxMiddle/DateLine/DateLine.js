import { getFormatDate } from "../../../../../utils/GetFormatDate";

import "./DateLine.css";

const DateLine = ({ createdAt }) => {
  return (
    <div className={"flex-center date-line"}>
      <div className={"date-line__line"} />
      <h6>{getFormatDate(createdAt)}</h6>
    </div>
  );
};

export default DateLine;
