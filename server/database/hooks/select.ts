export const select = (query: any): any => {
  const reqQuery = { ...query };
  const excludFields = ['select', 'sort', 'page', 'limit', 'populate'];

  excludFields.forEach(param => delete reqQuery[param])
  if(query.select) {
    const fields = query.select.split(',').join(' ');
    
    return fields;
  }

}