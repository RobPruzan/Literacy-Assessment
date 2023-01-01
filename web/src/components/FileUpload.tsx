import { ChangeEvent, useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('what is in here', e.target.files);
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    console.log(file);
  };

  return (
    <div>
      <button
        className="border border-black"
        onClick={(e) => console.log('file', file)}
      >
        debug
      </button>
      test
      <input type="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUpload;
