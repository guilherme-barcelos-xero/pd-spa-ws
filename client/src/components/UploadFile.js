
import React, { useState } from "react";

import { uploadFile } from "../redux/actions";
import { useDispatch } from 'react-redux'

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch()
  
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();

    formData.append('file', selectedFile);
    formData.append('fileName', selectedFile.name);

    dispatch(uploadFile(formData, selectedFile.name));
  };
  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload file</button>
    </div>
  );
}

export default UploadFile;
