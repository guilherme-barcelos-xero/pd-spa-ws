import './App.css';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import { useDispatch } from 'react-redux';
import { wsInitConnection } from "./redux/actions";
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  // Initialise connection to WS server when App is loaded
  useEffect(() => {
    dispatch(wsInitConnection());
  }, []);


  return (
    <div className="App">
      <h1>Files upload</h1>
      <UploadFile />
      <FileList />
    </div>
  );
}

export default App;
