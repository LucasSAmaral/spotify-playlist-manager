import Axios from "axios";
import { removeAllCookies } from "../../helpers/removeAllCookies.helper";

export const getUserPlayslistRequest = async (access_token, token_type) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    removeAllCookies();
    window.location = "/login";
  }
};
