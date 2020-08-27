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
    <>
      <Switch>
        <Route exact path="/" component={RedirectComponent} />
        <Route path="/login">
          {hasAccessToken ? <Redirect to="/my-profile" /> : <Login />}
        </Route>
        <Route path="/my-profile" component={MyProfile} />
      </Switch>
    </>
  );
}

export default App;
