import { NextFunction, Request, Response } from "express";

import * as uploadToCloudinary from "../../helpers/uploadToCloudinary"

export const uploadSingle = async (req : Request, res : Response, next : NextFunction) =>{
       if (req.file) {   
            const link = await uploadToCloudinary.uploadImage(req.file.buffer);
            req.body[req.file.fieldname] = link;
         }
       next();
    }

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  
  for (const key in req["files"]) {
    req.body[key]  = [];

    const array  = (req["files"] as any)[key] ;
    for (const item of array) {
      try {
        const result = await uploadToCloudinary.streamUpload(item.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  next();
};