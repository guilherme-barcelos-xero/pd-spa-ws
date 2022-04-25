import { Router } from 'express';
import documentsRouter from './document';

const router = Router();

router.use('/document', documentsRouter);

export default router;