import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked); // 좋아요 누를시  프론트에서 먼저 보여주기위해
  const [likeCountS, setLikeCount] = useState(likeCount); // 좋아요 누를시  프론트에서 먼저 보여주기위해
  const [currentItem, setCurrentItem] = useState(0); // 사진 슬라이드를 위함
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value
    }
  });

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      //해당 파일이 마지막꺼인지 확인
      setTimeout(() => setCurrentItem(0), 2000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 2000);
    }
    return;
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onKeyPress = event => {
    // react-textarea-autosize를 사용 할 경우,엔터를 누를시 줄이 바뀌고, 일반작인 form 태그를 이용한  제출은 되지 않는다.
    // 따라서 작성된 텍스트를 엔터로 제출하기 위해서는 눌린 키를 인식하여 제출되도록 해줘야 한다.
    if (event.keyCode === 13) {
      comment.setValue(""); // 댓글 작성후 엔터누를시 입력칸 비우기
      // addCommentMutation();
    }
    return;
  };
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default PostContainer;
