import React from "react";

interface Props {
  message: string;
}

const Error = ({ message }: Props) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Error;
