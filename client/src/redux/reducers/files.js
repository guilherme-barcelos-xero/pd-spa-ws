import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILED, WS_FILE_PROCESSED } from "../actionTypes";

const initialState = {
    files: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_FILE_SUCCESS: {
            const { fileName } = action.payload;
            return {
                ...state,
                files: [
                    ...state.files,
                    {
                        fileName,
                        status: 'PENDING'
                    }
                ]
            }
        }
        case UPLOAD_FILE_FAILED: {
            const { fileName } = action.payload;
            return {
                ...state,
                files: [
                    ...state.files,
                    {
                        fileName,
                        status: 'FAILED'
                    }
                ]
            }
        }
        case WS_FILE_PROCESSED: {
            const { fileName } = action.payload;
            const updatedFilesArray = state.files.map(file => {
                if (file.fileName !== fileName) {
                    return file
                };

                return {
                    ...file,
                    status: 'PROCESSED'
                };
            });
            return {
                ...state,
                files: updatedFilesArray
            }
        }
        default:
            return state;
    }
}