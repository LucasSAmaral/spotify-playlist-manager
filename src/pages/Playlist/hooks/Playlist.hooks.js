import Axios from "axios";
import { useInfiniteQuery } from "react-query";
import { getHeadersAuthorization } from "../../../helpers/getHeadersAuthorization.helper";
import { removeAllCookies } from "../../../helpers/removeAllCookies.helper";

export const useInfiniteTracksHook = (queryKey, tracksHref) => {
  const {
    data: trackData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    queryKey,
    async (key, href = tracksHref) => {
      const { Authorization } = getHeadersAuthorization();

      try {
        const { data } = await Axios({
          method: "GET",
          url: href,
          headers: {
            Authorization,
          },
        });
        return data;
      } catch (error) {
        removeAllCookies();
        window.location = "/login";
      }
    },
    {
      getFetchMore: (lastGroup) => lastGroup.next,
      enabled: tracksHref,
    }
  );

  return { trackData, isFetchingMore, fetchMore, canFetchMore };
};
