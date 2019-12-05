import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import Footer from "./Footer";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
//@client
// -> https://www.apollographql.com/docs/link/links/state/#client-directive
// -> local storage에서 데이터 가져올 시 사용
// -> 위의 쿼리 설명: local저장소에서 isLoggedIn 데이터 요청

const Wrapper = styled.div`
  /* margin: 0 auto; --> 가로 중앙정렬 시키기 */
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;
export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Wrapper>
          <GlobalStyles />
          <Router isLoggedIn={isLoggedIn} />
          <Footer />
        </Wrapper>
      </>
    </ThemeProvider>
  );
};
