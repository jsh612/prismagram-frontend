import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    /* fill --> svg 이모티콘의 색 채이기 */
    fill: white;
  }
`;

const Container = styled(Link)`
  background-image: url(${props => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const SquarePost = ({ likeCount, commentCount, file, postId }) => {
  const { url } = useRouteMatch();
  console.log("링크주소:::", `${url}/${postId}`);
  return (
    <Container bg={file.url} to={`${url}/${postId}`}>
      <Overlay>
        <Number>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
    </Container>
  );
};

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired
};

export default SquarePost;
