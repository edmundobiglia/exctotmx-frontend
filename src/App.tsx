import React, { useState } from "react";
import axios from "axios";

interface Props {
  url: string;
}

const DownloadLink = ({ url }: Props) => {
  return (
    <div>
      <h2>Download your file</h2>
      <p>
        <a href={url} download="mytmx.tmx">
          Click here to download the file
        </a>
      </p>
    </div>
  );
};

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState("");

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const submitFile = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (uploadedFile) {
      let formData = new FormData();

      formData.append("file", uploadedFile);

      await axios
        .post("http://localhost:3333/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          const tmxRawData = response.data.tmxData;

          const myBlob = new Blob([tmxRawData], { type: "text/xml" });

          const blobURL = URL.createObjectURL(myBlob);

          setDownloadLink(blobURL);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    }
  };

  return (
    <div className="App">
      <h1>Convert Excel to TMX</h1>
      <form onSubmit={submitFile}>
        <input type="file" onChange={uploadFile} />
        <button>UPLOAD</button>
      </form>

      {downloadLink && <DownloadLink url={downloadLink} />}
    </div>
  );
}

export default App;
