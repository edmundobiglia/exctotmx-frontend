import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { ErrorContainer } from "./style";

import colors from "../../styles/colors";

interface Props {
  message: string;
}

const Error = ({ message }: Props) => {
  return (
    <ErrorContainer>
      <FiAlertTriangle size={24} color={colors.red} />
      <p>{message}</p>
    </ErrorContainer>
  );
};

export default Error;
