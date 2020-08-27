import React, { useEffect } from "react";
import "./MyProfile.scss";
import Cookie from "js-cookie";
import { useMyProfileContext } from "./MyProfile.context";
import { useQuery } from "react-query";
import { getUserInfoRequest } from "./MyProfile.request";
import { myProfileExtractor } from "./MyProfile.extractor";
import { useHistory } from "react-router-dom";

const MyProfile = () => {
  const history = useHistory();
  const { state, setUserInfo } = useMyProfileContext();
  const access_token = Cookie.get("access_token");
  const token_type = Cookie.get("token_type");
  useEffect(() => {
    if (!access_token) {
      history.push("/login");
    }
  }, []);
  // eslint-disable-next-line
  const { data: userInfo } = useQuery(
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
  const { display_name, email, followers_total, profile_image } = state;
  return (
    <div className="my-profile-wrapper">
      <img src={profile_image} alt="" />
      <p>Nome: {display_name}</p>
      <p>Email: {email}</p>
      <p>Total de seguidores: {followers_total}</p>
    </div>
  );
};

export default MyProfile;
