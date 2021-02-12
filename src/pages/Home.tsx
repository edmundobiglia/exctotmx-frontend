import React, { useRef, useState } from "react";
import axios from "axios";

import LanguageSelector from "../components/LanguageSelector";
import Error from "../components/Error";

import { FiX, FiFolderPlus, FiUpload, FiDownload } from "react-icons/fi";

import {
  Container,
  Header,
  LanguageSection,
  SelectorBox,
  SelectedFileBox,
  ButtonContainer,
  Button,
  DownloadButton,
  Green,
} from "./style";

import colors from "../styles/colors";

import logo from "../assets/logo.svg";
import loader from "../assets/loader.svg";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setSelectedFile(files[0]);

      setSelectedFileName(name);
    } else {
      setSelectedFile(null);

      setLoading(false);

      setError("No file is selected.");
    }
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    hiddenFileInput.current?.click();
  };

  const handleSubmitFile = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    console.log("submited");

    setError("");

    setLoading(true);

    if (!selectedFile) {
      setLoading(false);

      setError("No file was selected");

      return;
    }

    if (!sourceLanguage || !targetLanguage) {
      setLoading(false);

      setError("No target or source language was specified");

      return;
    }

    if (sourceLanguage === targetLanguage) {
      setLoading(false);

      setError("Source and target language should be different.");

      return;
    }

    if (selectedFile) {
      let formData = new FormData();

      formData.append("file", selectedFile);

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

        setSelectedFileName("");

        setLoading(false);
      } catch (err) {
        setLoading(false);

        setError(err.response.data.error);
      }
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput.current.value = "";
    }

    setError("");

    setSelectedFile(null);

    setSelectedFileName("");
  };

  return (
    <div className="App">
      <Container>
        <div>
          <Header>
            <img src={logo} alt="Logo" />
            <p>
              Convert a bilingual{" "}
              <strong>
                <Green>XLSX</Green>
              </strong>{" "}
              file into a{" "}
              <strong>
                <Green>TMX</Green>
              </strong>{" "}
              file that can be used to create a SDL&nbsp;Trados translation memory. In the
              Excel file, the source text must be in column{" "}
              <strong>
                <Green>A</Green>
              </strong>{" "}
              and the translation must be in column{" "}
              <strong>
                <Green>B</Green>
              </strong>{" "}
              (all other columns are&nbsp;ignored).
            </p>
          </Header>

          <LanguageSection>
            <SelectorBox>
              <p>SOURCE LANGUAGE</p>
              <LanguageSelector
                languageSetter={setSourceLanguage}
                languageType="source"
              />
            </SelectorBox>

            <SelectorBox>
              <p>TARGET LANGUAGE</p>
              <LanguageSelector
                languageSetter={setTargetLanguage}
                languageType="target"
              />
            </SelectorBox>
          </LanguageSection>

          <form onSubmit={handleSubmitFile}>
            <input
              type="file"
              onChange={handleSelectFile}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />

            <ButtonContainer>
              {downloadLink ? (
                <DownloadButton href={downloadLink} download="MyTMX.tmx">
                  DOWNLOAD TMX <FiDownload size={24} color={colors.grey} />
                </DownloadButton>
              ) : selectedFile ? (
                <Button className="blue">
                  UPLOAD <FiUpload size={24} color={colors.grey} />
                </Button>
              ) : (
                <Button onClick={handleUploadClick}>
                  SELECT FILE <FiFolderPlus size={24} color={colors.grey} />
                </Button>
              )}

              {loading && <img src={loader} alt="Loader" />}
            </ButtonContainer>

            {selectedFileName && (
              <SelectedFileBox>
                <p>{selectedFileName}</p>{" "}
                <button onClick={handleRemoveFile}>
                  <FiX size={24} color={colors.red} />
                </button>
              </SelectedFileBox>
            )}
          </form>

          {error && <Error message={error} />}
        </div>
      </Container>
    </div>
  );
}

export default App;
