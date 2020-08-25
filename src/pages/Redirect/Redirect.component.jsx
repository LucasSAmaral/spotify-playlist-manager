import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { compose, split, last, map, head } from "ramda";
import Cookie from "js-cookie";
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
  useEffect(() => {
    if (location.hash !== "") {
      Cookie.set("LOGGED_IN", true);
      // fazer requisição para pegar os dados do usuário e redirecionar para a página de perfil
      history.push("/my-profile");
    } else {
      Cookie.set("ERROR", "access_denied");
      history.push("/login");
    }
  }, []);

  return <Loading />;
};

export default withRouter(RedirectComponent);
