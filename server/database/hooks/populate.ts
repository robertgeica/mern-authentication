export const populate = (query: any): any => {
  const reqQuery = { ...query };
  const excludFields = ['select', 'sort', 'page', 'limit', 'populate'];

  excludFields.forEach(param => delete reqQuery[param])
  if(query.populate) {
    const fields = query.populate.split(',').join(' ');
    
    return fields;
  }

}