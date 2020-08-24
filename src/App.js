import React from "react";
import Cookie from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import RedirectComponent from "./pages/Redirect/Redirect.component";
import Login from "./pages/Login/Login.component";

function App() {
  const isLoggedIn = Cookie.get("LOGGED_IN");
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? <Redirect to="/login" /> : <RedirectComponent />}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
