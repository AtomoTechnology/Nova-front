import moment from "moment";
export const convertDate = (works) => {
  return works.map((work) => ({
    ...work,
    fechaInicio: moment(work.fechaInicio).toDate(),
  }));
};
