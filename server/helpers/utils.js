export const trimData = (documentData) => {
  const dataValue = documentData;
  Object.keys(documentData)
    .forEach((key) => {
      dataValue[key] = dataValue[key].trim();
    });
  return dataValue;
};
