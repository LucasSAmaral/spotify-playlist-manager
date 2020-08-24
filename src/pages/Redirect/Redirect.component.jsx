import React, { useEffect } from "react";
import { compose, split, last, map, head } from "ramda";
import { withRouter } from "react-router-dom";

const RedirectComponent = ({ location }) => {
  useEffect(() => {
    const code = compose(
      last,
      head,
      map((q) => split("=", q)),
      split("&"),
      last,
      split("?")
    )(location.search);
    console.log("code", code);
  });
  return <></>;
};

export default withRouter(RedirectComponent);
