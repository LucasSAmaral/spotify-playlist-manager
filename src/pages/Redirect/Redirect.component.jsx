import React, { useEffect } from "react";
import { compose, split, last, map, fromPairs } from "ramda";
import Cookie from "js-cookie";
import { withRouter, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.component";

const RedirectComponent = ({ location }) => {
  const history = useHistory();
  useEffect(() => {
    Cookie.set("LOGGED_IN", true);
    const isLoggedIn = Cookie.get("LOGGED_IN");
    if (isLoggedIn && location.hash !== "") {
      const autorizationTokens = compose(
        fromPairs,
        map(split("=")),
        split("&"),
        last,
        split("#")
      )(location.hash);
      const autorizationObjectKeys = Object.keys(autorizationTokens);
      autorizationObjectKeys.map((autorizationObjectKey) =>
        Cookie.set(
          `${autorizationObjectKey}`,
          autorizationTokens[autorizationObjectKey]
        )
      );
      return history.push("/my-playlists");
    }
    return history.push("/login");

    // eslint-disable-next-line
  }, []);

  return <Loading />;
};

export default withRouter(RedirectComponent);
