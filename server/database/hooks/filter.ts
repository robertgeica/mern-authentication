export const filter = (query: any): any => {
  const ignoreFields = ['select', 'sort', 'page', 'limit', 'populate'];

  const cloneQuery = { ...query };
  ignoreFields.forEach((param) => delete cloneQuery[param]);

  let queryStr = JSON.stringify(cloneQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  return JSON.parse(queryStr);
};
