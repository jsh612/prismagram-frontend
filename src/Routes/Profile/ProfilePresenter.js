import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { Route, Link, useRouteMatch } from "react-router-dom";
import PostDetail from "../../Components/PostDetail";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto 40px auto;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
  width: 100%;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const FullName = styled(FatText)`
  font-size: 20px;
`;

const Bio = styled.p`
  margin: 15px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SLink = styled(Link)`
  width: 100px;
  height: 50px;
  background-color: blue;
`;

const ProfilePresenter = ({ data, loading, logOut }) => {
  const { path } = useRouteMatch();
  console.log("path:::", path);

  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;

    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Button onClick={logOut} text="Log out" />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
                postId={post.id}
                username={username}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
};

export default ProfilePresenter;
