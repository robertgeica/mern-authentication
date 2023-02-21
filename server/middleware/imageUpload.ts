import path from 'path';
import ErrorResponse from '../utils/errorResponse';

const filesExists = (req: any, _res: any, next: any) => {
  if (!req.files) {
    return next(new ErrorResponse(`You must select a file.`, 400));
  }

  next();
};

const fileSizeLimiter = (req: any, _res: any, next: any) => {
  const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT || 1000000;

  const { files } = req;
  const multiple = files.files.length > 1;

  let filesOverLimit: string[] = [];

  Object.keys(files).forEach((key) => {
    if (!multiple) {
      if (files[key].size > FILE_SIZE_LIMIT) {
        filesOverLimit.push(files[key].name.split(' ').join('-'));
      }
    }

    if (multiple) {
      files[key].forEach((file: any) => {
        if (file.size > FILE_SIZE_LIMIT) {
          filesOverLimit.push(file.name.split(' ').join('-'));
        }
      });
    }
  });

  if (filesOverLimit.length > 0) {
    const totalFiles = filesOverLimit.length;

    return next(
      new ErrorResponse(
        `${totalFiles} ${
          totalFiles > 1 ? 'images are' : 'image is'
        } over the maximum filesize of ${FILE_SIZE_LIMIT} bytes.`,
        400
      )
    );
  }

  next();
};

const fileExtensionLimiter = (allowedExtensions: string[]) => {
  return (req: any, _res: any, next: any) => {
    const files = req.files.files;

    const fileExtensions: string[] = [];

    if (files.length > 1) {
      Object.keys(files).forEach((key) =>
        fileExtensions.push(path.extname(files[key].name))
      );
    } else {
      fileExtensions.push(path.extname(files.name));
    }

    const allowed = fileExtensions.every((extension) =>
      allowedExtensions.includes(extension)
    );

    if (!allowed) {
      return next(new ErrorResponse(`Image extension not allowed.`, 400));
    }

    next();
  };
};

const allowMultiple = (allow: boolean) => {
  return (req: any, _res: any, next: any) => {
    if (req.files.files.length > 1 && !allow) {
      return next(
        new ErrorResponse(`You are not allowed to upload multiple files.`, 400)
      );
    }

    next();
  };
};

export { filesExists, fileSizeLimiter, fileExtensionLimiter, allowMultiple };
