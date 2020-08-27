import React from "react";
import "./MyPlaylists.scss";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import { getUserPlayslistRequest } from "./MyPlaylists.reques";

const MyPlaylists = () => {
  const access_token = Cookie.get("access_token");
  const token_type = Cookie.get("token_type");
  const { data } = useQuery(
    "USER_PLAYLISTS",
    () => getUserPlayslistRequest(access_token, token_type),
    {
      onSuccess: (data) => console.log("data", data),
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="my-playlists">
      <h3>Minhas Playlists</h3>
    </div>
  );
};

export default MyPlaylists;
