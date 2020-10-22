import React, { useState } from "react";
import "./MyPlaylists.scss";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getUserPlayslistRequest } from "./MyPlaylists.request";
import { MyPlaylistsExtractor } from "./MyPlaylists.extractor";
import Loading from "../../components/Loading/Loading.component";
import MyPlaylistItem from "./components/MyPlaylistItem.component";

const MyPlaylists = () => {
  const history = useHistory();
  const [MyPlaylistInfo, setMyPlaylistInfo] = useState({});
  const { isFetching } = useQuery("USER_PLAYLISTS", getUserPlayslistRequest, {
    onSuccess: (data) => {
      const extractedMyPlaylistsInfo = MyPlaylistsExtractor(data);
      setMyPlaylistInfo({ ...extractedMyPlaylistsInfo });
    },
    refetchOnWindowFocus: false,
  });

  const { my_playlists } = MyPlaylistInfo;

  return (
    <div className="my-playlists">
      <h2>My Playlists</h2>
      <div
        className={`my-playlists-content ${
          isFetching ? "loading-content" : ""
        }`}
      >
        <MyPlaylistItem createPlaylist useCover />
        {my_playlists?.map((playlist) => (
          <MyPlaylistItem
            onClick={() => history.push(`/playlist/${playlist.id}`)}
            key={playlist.id}
            {...playlist}
            useCover
          />
        )) ?? <Loading />}
      </div>
    </div>
  );
};

export default MyPlaylists;
