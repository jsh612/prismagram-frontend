import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
  }
  a {
      color:${props => props.theme.blueColor};
      text-decoration:none;
  }
`;
/* props는 App.js의 <ThemeProvider> 태그에서 보낸 것 */
