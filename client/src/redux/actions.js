import { 
    UPLOAD_FILE,
    UPLOAD_FILE_FAILED,
    UPLOAD_FILE_SUCCESS,
    WS_INIT_CONNECTION,
    WS_CLOSE_CONNECTION,
    WS_FILE_PROCESSED
 } from "./actionTypes";

export const uploadFile = (file, fileName) => ({
    type: UPLOAD_FILE,
    payload: {
        file,
        fileName
    }
});

export const uploadFileSuccess = fileName => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: {
        fileName
    }
});

export const uploadFileFailed = fileName => ({
    type: UPLOAD_FILE_FAILED,
    payload: {
        fileName
    }
});

export const wsInitConnection = () => ({
    type: WS_INIT_CONNECTION
});

export const wsCloseConnection = () => ({
    type: WS_CLOSE_CONNECTION
});

export const wsFileProcessed = fileName => ({
    type: WS_FILE_PROCESSED,
    payload: {
        fileName
    }
});