import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { compose, split, last, map, head } from "ramda";
import { withRouter, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading.component";
import { postAuthorizationCodeRequest } from "./Redirect.request";

const RedirectComponent = ({ location }) => {
  const [accessMutation] = useMutation(postAuthorizationCodeRequest, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log("Erro", error);
    },
  });
  const history = useHistory();
  const queryParams = compose(
    map((q) => split("=", q)),
    split("&"),
    last,
    split("?")
  )(location.search);

  const code = compose(last, head)(queryParams);

  const stateParam = compose(last, last)(queryParams);

  useEffect(() => {
    if (code) {
      accessMutation(code);
    } else {
      history.push("/login");
    }
  }, [code]);
  return <Loading />;
};

export default withRouter(RedirectComponent);
