import React, { useState } from "react";
import axios from "axios";

import LanguageSelector from "./components/LanguageSelector";
import Error from "./components/Error";
import DownloadLink from "./components/DownloadLink";

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const files = e.target.files;

    if (files && files.length > 0) {
      const { name, type } = files[0];

      const validFileType = /xlsx/;

      const fileExtensionIsValid = validFileType.test(name.toLowerCase());

      const fileTypeIsValid =
        type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!fileExtensionIsValid || !fileTypeIsValid) {
        e.target.value = "";

        setLoading(false);

        setError("Only Excel files are allowed.");

        return;
      }

      setUploadedFile(files[0]);
    } else {
      setUploadedFile(null);

      setLoading(false);

      setError("No file is selected.");
    }
  };

  const handleSubmitFile = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    if (!uploadedFile) {
      setLoading(false);

      setError("No file was selected. Please select a file.");

      return;
    }

    if (!sourceLanguage || !targetLanguage) {
      setLoading(false);

      setError(
        "No target or source language was specified. Please specify a source language and a target language."
      );

      return;
    }

    if (sourceLanguage === targetLanguage) {
      setLoading(false);

      setError("Source and target language should be different.");

      return;
    }

    if (uploadedFile) {
      let formData = new FormData();

      formData.append("file", uploadedFile);

      formData.append("source_language", sourceLanguage);

      formData.append("target_language", targetLanguage);

      try {
        const response = await axios.post("http://localhost:3333/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const tmxRawData = response.data.tmxData;

        const myBlob = new Blob([tmxRawData], { type: "text/xml" });

        const blobURL = URL.createObjectURL(myBlob);

        setDownloadLink(blobURL);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        setError("Error server. Try again.");
      }
    }
  };

  return (
    <div className="App">
      <h1>Convert Excel to TMX</h1>

      <div>
        <h2>Select source and target languages</h2>

        <div>
          <p>Source</p>
          <LanguageSelector languageSetter={setSourceLanguage} languageType="source" />
        </div>

        <div>
          <p>Target</p>
          <LanguageSelector languageSetter={setTargetLanguage} languageType="target" />
        </div>
      </div>

      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleUploadFile} />
        <button>UPLOAD</button>
      </form>

      {loading && "loading..."}

      {downloadLink && <DownloadLink url={downloadLink} />}

      {error && <Error message={error} />}
    </div>
  );
}

export default App;
