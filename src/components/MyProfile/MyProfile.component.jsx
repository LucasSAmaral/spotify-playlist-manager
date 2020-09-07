import React, { useEffect } from "react";
import "./MyProfile.scss";
import Cookie from "js-cookie";
import { useMyProfileContext } from "./MyProfile.context";
import { useQuery } from "react-query";
import { getUserInfoRequest } from "./MyProfile.request";
import { myProfileExtractor } from "./MyProfile.extractor";
import { useHistory } from "react-router-dom";
import ProfileImagePlaceholder from "../../assets/profile-image-placeholder.jpg";

const MyProfile = () => {
  const history = useHistory();
  const { state, setUserInfo } = useMyProfileContext();
  const { access_token, token_type } = Cookie.get();
  useEffect(() => {
    if (!access_token) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const { status } = useQuery(
    "USER_INFO",
    () => getUserInfoRequest(access_token, token_type),
    {
      onSuccess: (userInfo) => {
        const extractedUserInfo = myProfileExtractor(userInfo);
        setUserInfo({ ...extractedUserInfo });
      },
      refetchOnWindowFocus: false,
    }
  );
  const { display_name, profile_image } = state;

  const ProfileImage = {
    loading: ProfileImagePlaceholder,
    idle: ProfileImagePlaceholder,
    success: profile_image,
  };

  const UserName = {
    loading: <div className="text-loading" />,
    idle: <div className="text-loading" />,
    success: <h3>{display_name}</h3>,
  };

  return (
    <div className="my-profile">
      <figure className="my-profile-image">
        <img src={ProfileImage[status]} alt="" />
      </figure>
      <div className="my-profile-info">{UserName[status]}</div>
    </div>
  );
};

export default MyProfile;
