import { 
    call, 
    put, 
    takeEvery, 
    all, 
    take, 
    takeLatest, 
    race 
} from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { io } from "socket.io-client";
import axios from 'axios';
import { 
    uploadFileSuccess, 
    uploadFileFailed, 
    wsFileProcessed 
} from "./actions";
import { 
    WS_INIT_CONNECTION, 
    WS_CLOSE_CONNECTION, 
    UPLOAD_FILE 
} from './actionTypes';

const API_URL = 'http://localhost:3001';
const api = {
    uploadFile: (file) => axios.post(`${API_URL}/api/upload`, file)
};

// REST API saga handlers
function* uploadFileSagaHandler(action) {
    const { file, fileName } = action.payload;
    try {
        const response = yield call(api.uploadFile, file);
        yield put(uploadFileSuccess(fileName));
    } catch (ex) {
        yield put(uploadFileFailed(fileName));
    }
}

// Websocket saga handlers
function* initWsConnectionSagaHandler() {
    // Init websocket connection
    const ws = io(API_URL);

    // Create event channel
    const channel = yield call(createEventChannel, ws);

    const { close } = yield race({
        task: call(watchWsMessages, channel),
        close: take(WS_CLOSE_CONNECTION)
    });

    if (close) {
        channel.close();
    }
}

function createEventChannel(ws) {
    // Create and return Event Channel 
    // in order to check for emitted events
    return eventChannel(emit => {

        // Subscribe to file_processed WS event 
        // When event is received we create Redux action with event payload
        // and emit event through channel
        ws.on('file_processed', (event) => {
            const action = wsFileProcessed(event);
            emit(action);
        });

        // If WS connection closes end channel
        ws.on('close', (event) => {
            console.log(`close event ${event}`);
            emit(END);
        });

        // Unsubscribe channel event
        return () => {
            ws.close();
        };
    });
}

function* watchWsMessages(channel) {
    while (true) {
        // Read events from channel (already formatted as redux action)
        const action = yield take(channel);
        // Dispatch action to redux store
        yield put(action);
    }
}

// Sagas definition and root saga
function* uploadFileSaga() {
    yield takeEvery(UPLOAD_FILE, uploadFileSagaHandler);
}

function* initWsConnectionSaga() {
    yield takeLatest(WS_INIT_CONNECTION, initWsConnectionSagaHandler);
}

export default function* rootSaga() {
    yield all([
        uploadFileSaga(),
        initWsConnectionSaga()
    ]);
}

// // TEST
// function countdown(secs) {
//     return eventChannel(emitter => {
//         const iv = setInterval(() => {
//             secs -= 1;
//             if(secs > 0) {
//                 emitter(secs);
//             } else {
//                 emitter(END);
//             }
//         }, 1000);
//         return () => {
//             clearInterval(iv);
//         }
//     });
// }

// function* countdownSaga() {
//     const chan = yield call(countdown, 1000);
//     try {
//         while (true) {
//             let seconds = yield take(chan);
//             console.log(`countdown: ${seconds}`);
//         }
//     } finally {
//         console.log('countdown terminated');
//     }
// };