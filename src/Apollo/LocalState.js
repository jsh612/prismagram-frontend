// 얍의 상태를 체크한다 (로그인 여부를 확인)

export const defaults = {
  // local state의 값 설정
  //# window.localStorage
  // : https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  // 밑의 Mutation은 local state를 변경하는 역할
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location.reload(); //기존 캐시를 삭제하고 새로고침
      return null;
    }
  }
};
