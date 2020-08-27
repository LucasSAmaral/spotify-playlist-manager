import React from "react";
import "./Login.scss";
import { ClientId, redirect_uri } from "../../config/app-config";

const LoginComponent = () => {
  const loginRequestUrl = `https://accounts.spotify.com/authorize?client_id=${ClientId}&response_type=token&redirect_uri=${redirect_uri}&scope=user-read-private user-read-email playlist-modify-public playlist-read-private&state=34fFs29kd09`;

  const redirectToSpotify = () => {
    window.location = loginRequestUrl;
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <h1>Spotify Playlist Manager</h1>
        <button onClick={redirectToSpotify}>Login on Spotify</button>
      </div>
    </div>
  );
};

export default LoginComponent;
