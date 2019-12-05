import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  // const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  // #useMutaion
  //   - https://www.apollographql.com/docs/react/api/react-hooks/#usemutation
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const onLogin = e => {
    e.preventDefault();
    if (email !== "") {
      console.log("보내기 오케이");
      requestSecret();
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
      onLogin={onLogin}
    />
  );
};
