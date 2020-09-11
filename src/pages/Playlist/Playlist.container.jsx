import React from "react";

import { useParams } from "react-router-dom";

const Playlist = () => {
  const { id } = useParams();
  return <h1>Playlist {id}</h1>;
};

export default Playlist;
