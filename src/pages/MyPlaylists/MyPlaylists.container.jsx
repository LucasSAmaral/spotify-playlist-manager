import React, { useState } from "react";
import "./MyPlaylists.scss";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getUserPlayslistRequest } from "./MyPlaylists.request";
import { MyPlaylistsExtractor } from "./MyPlaylists.extractor";
import { useModal } from "../../components/Modal/Modal.context";
import Loading from "../../components/Loading/Loading.component";
import Header from "../../components/Header/Header.component";
import MyPlaylistItem from "./components/MyPlaylistItem.component";
import CreatePlaylistComponent from "../../components/CreatePlaylist/CreatePlaylist.component";
import RemovePlaylistComponent from "../../components/RemovePlaylist/RemovePlaylist.component";

const MyPlaylistContent = ({ status, openModal, my_playlists, history }) => {
  switch (status) {
    case "idle":
    case "loading":
      return (
        <div className="loading-content">
          <Loading />
        </div>
      );

    case "success":
      return (
        <div className="my-playlists-content">
          <MyPlaylistItem
            createPlaylist
            useCover
            createPlaylistOnClick={() => openModal(<CreatePlaylistComponent />)}
          />
          {my_playlists?.map((playlist) => (
            <MyPlaylistItem
              openPlaylist={() => history.push(`/playlist/${playlist.id}`)}
              removePlaylist={() =>
                openModal(
                  <RemovePlaylistComponent
                    id={playlist.id}
                    name={playlist.name}
                  />
                )
              }
              key={playlist.id}
              {...playlist}
              useCover
            />
          ))}
        </div>
      );
    case "error":
    default:
      return <></>;
  }
};

const MyPlaylists = () => {
  const history = useHistory();
  const { openModal } = useModal();
  const [MyPlaylistInfo, setMyPlaylistInfo] = useState({});
  const { status } = useQuery("USER_PLAYLISTS", getUserPlayslistRequest, {
    onSuccess: (data) => {
      const extractedMyPlaylistsInfo = MyPlaylistsExtractor(data);
      setMyPlaylistInfo({ ...extractedMyPlaylistsInfo });
    },
    refetchOnWindowFocus: false,
  });

  const { my_playlists } = MyPlaylistInfo;

  const MyPlaylistContentProps = { history, openModal, status, my_playlists };

  return (
    <>
      <Header />
      <div className="my-playlists">
        <h2>My Playlists</h2>
        <MyPlaylistContent {...MyPlaylistContentProps} />
      </div>
    </>
  );
};

export default MyPlaylists;
