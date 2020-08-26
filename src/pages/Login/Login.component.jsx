import React from "react";
import "./Login.scss";
import Cookie from "js-cookie";
import { ClientId, redirect_uri } from "../../config/app-config";

const LoginComponent = () => {
  const loginRequestUrl = `https://accounts.spotify.com/authorize?client_id=${ClientId}&response_type=token&redirect_uri=${redirect_uri}&scope=user-read-private user-read-email playlist-modify-public playlist-read-private&state=34fFs29kd09`;

  const redirectToSpotify = () => {
    Cookie.set("LOGGED_IN", true);
    window.location = loginRequestUrl;
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <h1>Seems you're not logged in</h1>
        <button onClick={redirectToSpotify}>Login on Spotify</button>
      </div>
    </div>
  );
};

export default LoginComponent;
