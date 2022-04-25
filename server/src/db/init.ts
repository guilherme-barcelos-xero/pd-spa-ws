import Document from './models/Document';


const dbInit = () => {
    Document.sync()
};

export default dbInit;