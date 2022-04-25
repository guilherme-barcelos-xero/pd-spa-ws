import { Router } from 'express';
import { upload } from './controllers/document';

import uploadDocumentMiddleware from './middleware/upload';

const documentsRouter = Router();

documentsRouter.post('/upload', uploadDocumentMiddleware.single('file'), upload);

export default documentsRouter;