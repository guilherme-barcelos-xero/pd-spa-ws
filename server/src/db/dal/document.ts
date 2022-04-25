import Document, { DocumentInput, DocumentOutput } from '../models/Document';

export const create = async (payload: DocumentInput): Promise<DocumentOutput> => {
    const document = await Document.create(payload);
    return document;
};

export const getById = async (id: number): Promise<DocumentOutput | null> => {
    const document = await Document.findByPk(id);
    return document;
};