import { NextFunction, Request, Response } from "express";

import * as uploadToCloudinary from "../../helpers/uploadToCloudinary"

export const uploadSingle = async (req : Request, res : Response, next : NextFunction) =>{
       if (req.file) {   
            const link = await uploadToCloudinary.uploadImage(req.file.buffer);
            req.body[req.file.fieldname] = link;
         }
       next();
    }