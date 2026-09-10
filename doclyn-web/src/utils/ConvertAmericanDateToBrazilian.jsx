export const convertAmericanDateToBrazilian = (data) => {
  return data.split("-").reverse().join("/");
};