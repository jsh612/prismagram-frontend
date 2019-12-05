import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  // const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  // #useMutaion
  //   - https://www.apollographql.com/docs/react/api/react-hooks/#usemutation
  //   - useMutaion(gql구문, 옵션들)
  //   - 첫번째 인자= gql 구문,  두번째인자: 옵션사항
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value },
    //update : mutation의 결과를 얻는 방법
    update: (_, { data: { requestSecret } }) => {
      if (!requestSecret) {
        toast.error("해당 계정이 없습니다. 계정을 생성해 주세요");
        setTimeout(() => setAction("signUp"), 2000);
      }
    }
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      usernanme: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.valuee
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "") {
        return requestSecret();
      } else {
        toast.error("email을 작성해주세요");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        return createAccount();
      } else {
        toast.error("모든 항목을 작성해주세요");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      // password={password}
      onSubmit={onSubmit}
    />
  );
};
