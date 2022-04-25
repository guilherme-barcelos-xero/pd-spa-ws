import fs from 'fs';
import { Request, Response } from 'express';
import * as documentService from '../../services/documentService';
import { UploadDocumentDTO } from '../dto/documentDTO';

export const upload = async (req: Request, res: Response) => {
    try {
        const fileNamePath = `./uploads/${req.file!.filename}`;
        const payload: UploadDocumentDTO = {
            name: req.file!.originalname,
            type: req.file!.mimetype,
            data: fs.readFileSync(fileNamePath)
        };

        const result = await documentService.create(payload);

        fs.unlinkSync(fileNamePath);
        
        return res.status(200).send(result);
    } catch(err: any) {
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
};
