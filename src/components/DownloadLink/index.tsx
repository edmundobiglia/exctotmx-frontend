import React from "react";

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

export default DownloadLink;
