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
  res: any,
  next: Function
) => {
  const multiple = file.length > 1;
  const uploadedFiles: string[] = [];

  const saveFileOnDisk = async (file: any, index?: number) => {
    // Check if file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new ErrorResponse(`File is not an image.`, 400);
    }

    // Generate file name
    const fileExtension = path.parse(file.name).ext;
    file.name = `${imageUsage}${index || ''}_${resourceId}${fileExtension}`;

    // Construct save directory and final path
    const saveDir = `${process.env.FILE_UPLOAD_DIRECTORY}/${subDirectory}/${resourceId}`;
    const finalPath = `${saveDir}/${file.name}`;

    // Add filename to array
    uploadedFiles.push(file.name);

    // Image buffer
    const { data: buffer } = file;

    // Create directory if it doesn't exist
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    // Compress image
    await sharp(buffer).png({ quality: 20 }).toFile(finalPath);

    // Update the Model with the image URL
    const imageUrl = `/${subDirectory}/${resourceId}/${file.name}`;
    const payload = multiple
      ? { images: { [imageUsage]: imageUrl } }
      : {
          avatar: {
            url: imageUrl,
            mimeType: file.mimetype,
            size: file.size,
          },
        };

    await Model.findByIdAndUpdate(resourceId, payload);
  };

  try {
    if (multiple) {
      await Promise.all(
        file.map(async (singleFile: any, index: number) =>
          saveFileOnDisk(singleFile, index)
        )
      );
    } else {
      await saveFileOnDisk(file);
    }

    res.status(200).json({
      success: true,
      message: `${multiple ? 'Images' : 'Image'} upload complete.`,
      images: uploadedFiles.join(','),
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorResponse) {
      return next(new ErrorResponse(error.message, error.statusCode));
    } else {
      return next(new ErrorResponse(`Image upload failed.`, 500));
    }
  }
};
