import React, { useState } from "react";
import "./MyPlaylists.scss";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import { getUserPlayslistRequest } from "./MyPlaylists.request";
import { MyPlaylistsExtractor } from "./MyPlaylists.extractor";
import Loading from "../../components/Loading/Loading.component";
import MyPlaylistItem from "./components/MyPlaylistItem.component";

const MyPlaylists = () => {
  const { access_token, token_type } = Cookie.get();
  const [MyPlaylistInfo, setMyPlaylistInfo] = useState({});
  const { status } = useQuery(
    "USER_PLAYLISTS",
    () => getUserPlayslistRequest(access_token, token_type),
    {
      onSuccess: (data) => {
        const extractedMyPlaylistsInfo = MyPlaylistsExtractor(data);
        setMyPlaylistInfo({ ...extractedMyPlaylistsInfo });
      },
      refetchOnWindowFocus: false,
    }
  );

  const { my_playlists } = MyPlaylistInfo;

  return (
    <div className="my-playlists">
      <h3>My Playlists</h3>
      <div
        className={`my-playlists-content ${
          status === "loading" ? "loading-content" : ""
        }`}
      >
        {my_playlists?.map((playlist) => (
          <MyPlaylistItem key={playlist.id} {...playlist} useCover />
        )) ?? <Loading />}
      </div>
    </div>
  );
};

export default MyPlaylists;
