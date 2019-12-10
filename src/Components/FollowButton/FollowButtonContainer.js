import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW } from "./FollowQueries";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unFollowMutation] = useMutation(FOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS) {
      setIsFollowing(false);
      return unFollowMutation();
    } else {
      setIsFollowing(true);
      return followMutation();
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
