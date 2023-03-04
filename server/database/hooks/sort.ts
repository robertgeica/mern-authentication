export const sort = (query: any): string => {
  if (query.sort) {
    const sortBy = query.sort.split(',').join(' ');
    return sortBy;
  }
  return '-createdAt';
};
