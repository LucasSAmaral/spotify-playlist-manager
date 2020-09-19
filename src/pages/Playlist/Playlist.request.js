import Axios from "axios";
import { removeAllCookies } from "../../helpers/removeAllCookies.helper";

export const getPlaylistRequest = async (access_token, token_type, id) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: `https://api.spotify.com/v1/playlists/${id}`,
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    removeAllCookies();
    window.location = "/login";
  }
};
