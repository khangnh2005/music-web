    import {v2 as cloudinary} from "cloudinary"
    import streamifier from "streamifier";
    import dotenv from "dotenv";

    dotenv.config();

    
     //Cloudinary
     cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET
     });
     //Cloudinary
    
   export const streamUpload = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

   /**
    * Hàm upload mặc định trả về URL ảnh (secure_url)
    */
   export const uploadImage = async (buffer: Buffer): Promise<string> => {
      const result : any = await streamUpload(buffer);
      // Khuyên dùng secure_url (HTTPS) thay vì url (HTTP)
      return result.secure_url || result.url;
   };
