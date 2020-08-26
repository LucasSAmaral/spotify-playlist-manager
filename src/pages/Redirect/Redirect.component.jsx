import React, { useEffect } from "react";
import { compose, split, last, map, fromPairs } from "ramda";
import Cookie from "js-cookie";
import { withRouter, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.component";

const RedirectComponent = ({ location }) => {
  const history = useHistory();
  useEffect(() => {
    if (location.hash !== "") {
      const autorizationTokens = compose(
        fromPairs,
        map(split("=")),
        split("&"),
        last,
        split("#")
      )(location.hash);
      Cookie.set("access_token", autorizationTokens.access_token);
      Cookie.set("token_type", autorizationTokens.token_type);
      Cookie.set("access_token_expires_in", autorizationTokens.expires_in);
      Cookie.set("access_state", autorizationTokens.state);
      history.push("/my-profile");
    } else {
      Cookie.remove("LOGGED_IN");
      Cookie.set("ERROR", "access_denied");
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return <Loading />;
};

export default withRouter(RedirectComponent);
