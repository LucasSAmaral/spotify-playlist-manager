import Axios from "axios";
import { ClientId, ClientSecret, redirect_uri } from "../../config/app-config";

export const postAuthorizationCodeRequest = async (code) => {
  try {
    const { data } = await Axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      crossDomain: true,
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
        client_id: ClientId,
        client_secret: ClientSecret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  } catch (error) {
    console.log({ error });
  }
};
