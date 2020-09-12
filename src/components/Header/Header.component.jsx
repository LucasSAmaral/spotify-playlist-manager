import React from "react";
import { withRouter } from "react-router-dom";
import "./Header.scss";
import MyProfile from "../MyProfile/MyProfile.component";

const Header = () => {
  return (
    <header>
      <MyProfile />
    </header>
  );
};

export default withRouter(Header);
