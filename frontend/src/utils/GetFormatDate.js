import date from "date-and-time";

export const getFormatDate = (createdAt) => {
  let createdAtToDate, formatDate;
  
  createdAtToDate = new Date(createdAt);
  formatDate = date.format(createdAtToDate, "ddd, DD-MMM-YYYY");

  return formatDate;
};
