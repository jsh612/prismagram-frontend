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
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("해당 계정이 없습니다. 계정을 생성해 주세요");
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("로그인 성공");
          }
        } catch (error) {
          toast.error("비밀 문자를 요청하지 못했습니다. 다시 시도해 주세요");
        }
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
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정을 생성할 수 없습니다.");
          } else {
            toast.success("계정이 생성되었습니다. 로그인 하세요");
            setTimeout(() => setAction("logIn"), 2000);
          }
        } catch (error) {
          toast.error(error.message);
        }
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
