import React from "react";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH } from "./SearchQueries";

export default props => {
  // url에서 검색어(term)을 받아오기위해
  const term = props.location.search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  console.log(data);
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
};
