import * as documentDAL from '../db/dal/document';
import { DocumentInput, DocumentOutput } from '../db/models/Document';

export const create = (payload: DocumentInput) : Promise<DocumentOutput> => {
    return documentDAL.create(payload);
};

export const getById = (id: number) : Promise<DocumentOutput | null> => {
    return documentDAL.getById(id);
};