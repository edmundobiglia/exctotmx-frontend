import styled from "styled-components";

import colors from "../../styles/colors";

import downArrow from "../../assets/down-arrow.svg";

export const LanguageSelectorSection = styled.div`
  position: relative;

  & + div {
    margin-left: 60px;
  }

  select {
    padding: 7px 0;
    position: relative;
    width: 200px;
    background: ${colors.lightGrey};
    border: 0;
    font-size: 15px;
    text-align: center;

    &:focus {
      border: 0;
      outline: 0;
      background: white;
      background: ${colors.lightGrey};
    }

    option {
      font-size: 15px;
    }
  }
`;

export const SelectionBox = styled.div`
  &:after {
    content: "";
    background: url(${downArrow});
    background-repeat: no-repeat;
    background-size: 45%;
    background-position: center center;
    position: absolute;
    width: 33px;
    height: 100%;
    right: 0;
    top: 0;
    pointer-events: none;
    background-color: ${colors.grey};
  }
`;
