import Axios from "axios";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const SearchRequest = async (query, params) => {
  const { Authorization } = getHeadersAuthorization();

  const queryParams = params.length === 1 ? params[0] : params.join(",");

  if (query !== "") {
    try {
      const { data } = await Axios({
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=${query}&type=${queryParams}`,
        headers: {
          Authorization,
        },
      });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
};
