import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";

const H2 = styled.h2`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <H2>안녕</H2>
    </ThemeProvider>
  );
};
