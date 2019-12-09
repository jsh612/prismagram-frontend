import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Router";
import Footer from "./Footer";
import Header from "./Header";

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
  max-width: ${props => props.theme.maxWidth};
  /* props는 App.js의 <ThemeProvider> 태그에서 보낸 것 */
  width: 100%;
`;
export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Header />
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        {/* 
            ToastContainer : 토스트메시지를 환경을 설정하는 역활의 태그
            toast: 직접적인 메시지 내용들을 담당하는 태그 
            https://github.com/fkhadra/react-toastify#usage
        */}
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
