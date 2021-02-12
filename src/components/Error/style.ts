import styled from "styled-components";

import colors from "../../styles/colors";

export const ErrorContainer = styled.div`
  max-width: 600px;
  margin-top: 30px;
  display: flex;
  align-items: center;

  p {
    color: ${colors.red};
    line-height: 1.5;
    margin-left: 15px;
  }
`;
