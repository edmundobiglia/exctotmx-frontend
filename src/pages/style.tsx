import styled from "styled-components";
import { lighten } from "polished";

import colors from "../styles/colors";

export const Container = styled.main`
  max-width: 900px;
  width: 100%;
  padding: 90px 0;
  margin: 0 auto;
  background-color: ${colors.lighterGrey};

  & > div {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Header = styled.header`
  margin: 0 auto 60px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 60px;
    width: 165px;
  }

  p {
    color: ${colors.black};
    font-size: 18px;
    line-height: 1.5;

    & + p {
      margin-top: 30px;
    }
  }
`;

export const LanguageSection = styled.section`
  display: flex;
  margin-bottom: 60px;
`;

export const SelectorBox = styled.div`
  p {
    color: ${colors.green};
    font-size: 18px;
    text-align: center;
    margin-bottom: 6px;
  }
  & + div {
    margin-left: 60px;
  }
`;

export const SelectedFileBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 460px;
  width: 100%;
  margin-top: 30px;

  background-color: ${colors.lightGrey};

  p {
    padding: 9px 15px;
    color: ${colors.darkGrey};
  }

  button {
    width: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.grey};
    border: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 75px;
    position: absolute;
    right: -75px;
    top: -3px;
  }
`;

export const Button = styled.button`
  background-color: ${colors.green};
  border: 0;
  padding: 21px 15px;
  width: 200px;
  color: ${colors.lighterGrey};
  font-weight: 600;
  font-size: 18px;
  transition: background-color 200ms ease;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 9px;
  }

  & + button {
    margin-left: 60px;
  }

  &:hover {
    background-color: ${lighten(0.03, colors.green)};
  }

  &.blue {
    background-color: ${colors.blue};
    &:hover {
      background-color: ${lighten(0.03, colors.blue)};
    }
  }
`;

export const DownloadButton = styled.a`
  background-color: ${colors.green};
  border: 0;
  padding: 21px 15px;
  width: 200px;
  color: ${colors.lighterGrey};
  font-weight: 600;
  font-size: 18px;
  transition: background-color 200ms ease;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 9px;
  }

  &:hover {
    background-color: ${lighten(0.03, colors.green)};
  }
`;

export const Green = styled.span`
  color: ${colors.green};
`;
