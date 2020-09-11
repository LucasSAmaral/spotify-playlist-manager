import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login.component";
import RedirectComponent from "./pages/Redirect/Redirect.component";
import MyPlaylists from "./pages/MyPlaylists/MyPlaylists.container";
import Header from "./components/Header/Header.component";
import Playlist from "./pages/Playlist/Playlist.container";

function App() {
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    setAccessToken(Cookie.get("access_token"));
  }, []);
  return (
    <>
      {accessToken && <Header />}
      <Switch>
        <Route exact path="/" component={RedirectComponent} />
        <Route path="/login">
          {accessToken ? <Redirect to="/my-playlists" /> : <Login />}
        </Route>
        <Route path="/my-playlists" component={MyPlaylists} />
        <Route path="/playlist/:id" component={Playlist} />
      </Switch>
    </>
  );
}

export default App;
