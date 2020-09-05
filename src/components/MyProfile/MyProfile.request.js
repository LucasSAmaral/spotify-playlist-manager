import Axios from "axios";
import Cookie from "js-cookie";

export const getUserInfoRequest = async (access_token, token_type) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    Cookie.remove("LOGGED_IN");
    Cookie.remove("access_token");
    Cookie.remove("access_state");
    Cookie.remove("access_token_expires_in");
    Cookie.remove("token_type");
    window.location = "/login";
  }
};
