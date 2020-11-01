import React, { Suspense } from "react";
import Cookie from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "./components/Loading/Loading.component";
import ModalContainer from "./components/Modal/Modal.container";

const Header = React.lazy(() => import("./components/Header/Header.component"));

const Login = React.lazy(() => import("./pages/Login/Login.component"));
const RedirectComponent = React.lazy(() =>
  import("./pages/Redirect/Redirect.component")
);
const MyPlaylists = React.lazy(() =>
  import("./pages/MyPlaylists/MyPlaylists.container")
);
const Playlist = React.lazy(() =>
  import("./pages/Playlist/Playlist.container")
);

function App() {
  return (
    <>
      <Switch>
        <Suspense fallback={<Loading />}>
          {Cookie.get("access_token") && <Header />}
          <Route exact path="/" component={RedirectComponent} />
          <Route path="/login">
            {Cookie.get("access_token") ? (
              <Redirect to="/my-playlists" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/my-playlists" component={MyPlaylists} />
          <Route path="/playlist/:id" component={Playlist} />
        </Suspense>
      </Switch>
      <ModalContainer />
    </>
  );
}

export default App;
