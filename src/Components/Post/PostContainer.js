import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

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

  //#selComments (속임수 쓰기)
  // db에 입력된 값을 즉각 적으로 화면에 보여주기 위해서는 db의 데이터를 새로 받아 와서
  // 화면구성을 다시 해야한다.
  // 그러기 위해서는 쿼리문을 다시 한번 날려야 하므로, 새로고침이 필요하다.
  // 따라서 이러한 과정 없이 즉각적으로 보여주기 위해, 임시적으로 화면에 입력된 댓글 내용을 보여주기 위한 절차를 진행 한다.
  // (좋아요 하트버튼, 좋아요 갯수도 동일한 원리)
  const [selfComments, setSelfComments] = useState([]);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    //#addCommentMutation
    //  -The function returns a promise that fulfills with your mutation result.
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

  const onKeyPress = async event => {
    // react-textarea-autosize를 사용 할 경우,엔터를 누를시 줄이 바뀌고, 일반작인 form 태그를 이용한  제출은 되지 않는다.
    // 따라서 작성된 텍스트를 엔터로 제출하기 위해서는 눌린 키를 인식하여 제출되도록 해줘야 한다.
    if (event.which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        // console.log("addComment", addComment);
        setSelfComments([...selfComments, addComment]);
        comment.setValue(""); // 댓글 작성후 엔터누를시 입력칸 비우기
      } catch (error) {
        toast.error("댓글을 저장할 수 없습니다.");
      }
    }
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
      selfComments={selfComments}
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
