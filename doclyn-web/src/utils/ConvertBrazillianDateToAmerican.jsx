export const convertBrazilianDateToAmerican = (data) => {
  return data.split("/").reverse().join("-");
};
