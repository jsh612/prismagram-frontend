import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const POST_DETAIL = gql`
  query seeFullPost($postId: String!) {
    seeFullPost(postId: $postId) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default ({ history }) => {
  const {
    location: { pathname }
  } = history;

  const postId = pathname.split("/")[1];

  const { data, loading } = useQuery(POST_DETAIL, {
    variables: {
      postId
    }
  });
  return (
    <>
      {data && (
        <Wrapper>
          <Helmet>
            <title>Feed | Prismagram</title>
          </Helmet>
          {loading && <Loader />}
          {!loading && data && data.seeFullPost && (
            <Post
              key={data.seeFullPost.id}
              id={data.seeFullPost.id}
              user={data.seeFullPost.user}
              location={data.seeFullPost.location}
              caption={data.seeFullPost.caption}
              files={data.seeFullPost.files}
              likeCount={data.seeFullPost.likeCount}
              isLiked={data.seeFullPost.isLiked}
              comments={data.seeFullPost.comments}
              createdAt={data.seeFullPost.createdAt}
            />
          )}
        </Wrapper>
      )}
    </>
  );
};
