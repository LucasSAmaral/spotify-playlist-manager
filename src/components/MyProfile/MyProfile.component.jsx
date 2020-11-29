import React, { useEffect } from "react";
import "./MyProfile.scss";
import Cookie from "js-cookie";
import { useMyProfileContext } from "./MyProfile.context";
import { useQuery } from "react-query";
import { getUserInfoRequest } from "./MyProfile.request";
import { myProfileExtractor } from "./MyProfile.extractor";
import { useHistory } from "react-router-dom";
import ProfileImagePlaceholder from "../../assets/profile-image-placeholder.jpg";
import TextLoading from "../TextLoading/TextLoading.component";

const MyProfile = () => {
  const history = useHistory();
  const { state, setUserInfo } = useMyProfileContext();
  const { access_token } = Cookie.get();
  useEffect(() => {
    if (!access_token) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const { status } = useQuery("USER_INFO", getUserInfoRequest, {
    onSuccess: (userInfo) => {
      const extractedUserInfo = myProfileExtractor(userInfo);
      setUserInfo({ ...extractedUserInfo });
    },
    refetchOnWindowFocus: false,
  });
  const { display_name, profile_image, user_id } = state;

  Cookie.set("userId", user_id);

  const ProfileImage = (status) => {
    switch (status) {
      case "loading":
      case "idle":
        return ProfileImagePlaceholder;

      case "success":
        return profile_image;

      default:
    }
  };

  const UserName = (status) => {
    switch (status) {
      case "loading":
      case "idle":
        return <TextLoading width="110px" height="18px" />;

      case "success":
        return <h3>{display_name}</h3>;

      default:
    }
  };

  return (
    <div className="my-profile">
      <figure className="my-profile-image">
        <img src={ProfileImage(status)} alt="" />
      </figure>
      <div className="my-profile-info">{UserName(status)}</div>
    </div>
  );
};

export default MyProfile;
