import React, { useEffect, useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH } from "./SearchQueries";

export default props => {
  // url에서 검색어(term)을 받아오기위해
  // 해당 값을 encode되어 decode 해줘야 올바른 검색어 값이 나온다
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/decodeURI
  const term = decodeURI(props.location.search.split("=")[1]);
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  console.log("검색 data", data);
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
};
