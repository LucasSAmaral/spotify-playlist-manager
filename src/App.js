import React from "react";
import Cookie from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import RedirectComponent from "./pages/Redirect/Redirect.component";
import Login from "./pages/Login/Login.component";
import MyProfile from "./pages/MyProfile/MyProfile.component";

function App() {
  const isLoggedIn = Cookie.get("LOGGED_IN");
  const hasAccessToken = Cookie.get("access_token");
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? <Redirect to="/login" /> : <RedirectComponent />}
        </Route>
        <Route path="/login">
          {hasAccessToken ? <Redirect to="/my-profile" /> : <Login />}
        </Route>
        <Route path="/my-profile">
          {!hasAccessToken ? <Redirect to="/login" /> : <MyProfile />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
