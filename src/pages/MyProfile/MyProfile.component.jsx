import React, { useEffect } from "react";
import "./MyProfile.scss";
import Cookie from "js-cookie";
import { useMyProfileContext } from "./MyProfile.context";
import { useQuery } from "react-query";
import { getUserInfoRequest } from "./MyProfile.request";
import { myProfileExtractor } from "./MyProfile.extractor";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.component";
import MyPlaylists from "./components/MyPlaylists/MyPlaylists.component";

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
  const { data: userInfo, status } = useQuery(
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
  const { display_name, country, followers_total, profile_image } = state;
  switch (status) {
    case "loading":
    case "idle":
      return <Loading />;
    case "success":
      return (
        <div className="my-profile-wrapper">
          <div className="my-profile">
            <figure className="my-profile-image">
              <img src={profile_image} alt="" />
            </figure>
            <div className="my-profile-info">
              <h3>{display_name}</h3>
              <div className="my-profile-footer">
                <p>País: {country}</p>
                <p>Total de seguidores: {followers_total}</p>
              </div>
            </div>
          </div>
          <MyPlaylists />
        </div>
      );
    default:
  }
};

export default MyProfile;
