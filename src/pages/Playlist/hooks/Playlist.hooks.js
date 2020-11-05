import Axios from "axios";
import { useInfiniteQuery } from "react-query";
import { getHeadersAuthorization } from "../../../helpers/getHeadersAuthorization.helper";
import { removeAllCookies } from "../../../helpers/removeAllCookies.helper";

export const useInfiniteSearchHook = (queryKey, tracksHref) => {
  const {
    isFetched,
    data: searchData,
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
      getFetchMore: (lastGroup) => {
        if (queryKey.includes("SEARCH_")) {
          const key = queryKey.split("_")[1];
          return lastGroup[key].next;
        }
        return lastGroup.next;
      },
      enabled: tracksHref,
      refetchOnWindowFocus: false,
    }
  );

  return { searchData, isFetchingMore, isFetched, fetchMore, canFetchMore };
};
