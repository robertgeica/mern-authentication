import xss from 'xss';

export const xssClean = (req: any, res: any, next: Function) => {
  // Loop through all request parameters and sanitize any strings to prevent XSS attacks
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = xss(req.body[key]);
    }
  }

  next();
}

