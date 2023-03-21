export const hpp = (req: any, res: any, next: Function) => {
  // Get the HTTP method of the request
  const method = req.method;

  // Add a list of supported HTTP verbs
  const httpVerbs = ['GET', 'POST', 'PUT', 'PATCH', 'UPDATE', 'DELETE'];

  // Check if the request method is a supported HTTP verb
  if (httpVerbs.includes(method)) {
    // Get the request parameters
    const params = req.query;

    // Loop through the parameters
    for (let param in params) {
      // Check if the parameter value is an array
      if (Array.isArray(params[param])) {
        // If the parameter value is an array, remove any duplicate values
        params[param] = [...new Set(params[param])];
      }
    }

    // Set the modified parameters back onto the request object
    req.query = params;
  }

  // Call the next middleware function in the chain
  next();
}
