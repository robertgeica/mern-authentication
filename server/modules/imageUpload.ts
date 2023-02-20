import { Types } from 'mongoose';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import ErrorResponse from '../utils/errorResponse';

export const imageUpload = async (
  file: any,
  resourceId: Types.ObjectId,
  imageUsage: string,
  subDirectory: string,
  Model: any,
  next: Function,
  res: any
) => {
  const multiple = file.length > 1;
  const uploadedFiles: string[] = [];

  const saveFileOnDisk = async (file: any, index?: number) => {
    // generateFileName
    const fileExtension = path.parse(file.name).ext;
    file.name = `${imageUsage}${index || ''}_${resourceId}${fileExtension}`;

    // construct save directory and final path
    const saveDir = `${process.env.FILE_UPLOAD_DIRECTORY}/${subDirectory}/${resourceId}`;
    const finalPath = `${saveDir}/${file.name}`;

    // add filename to array
    uploadedFiles.push(file.name);

    // image buffer
    const { data: buffer } = file;

    // create directory if it doesn't exists
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    // compress image
    await sharp(buffer)
      .png({ quality: 20 })
      .toFile(finalPath, async (error) => {
        if (error) {
          return next(new ErrorResponse(`Image upload failed.`, 500));
        }
        let payload = {};

        if (multiple) {
          payload = {
            images: { [imageUsage]: file.name },
          };
        } else {
          payload = {
            imageUrl: file.name,
          };
        }

        await Model.findByIdAndUpdate(resourceId, payload);
      });
  };

  if (multiple) {
    file.map(async (singleFile: any, index: number) =>
      saveFileOnDisk(singleFile, index)
    );
  } else {
    saveFileOnDisk(file);
  }

  res.status(200).json({
    success: true,
    message: `${multiple ? 'Images' : 'Image'} upload complete.`,
    images: uploadedFiles.join(','),
  });
};
