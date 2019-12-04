import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import Router from "./Router";

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router isLoggedIn={!false} />
      </>
    </ThemeProvider>
  );
};
