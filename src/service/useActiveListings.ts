import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useActiveListing(slug: string) {
  return useQuery(["active-listing", slug], async () => {
    const data = (await axiosInstance.get(ApiRoutes.activeListing(slug)))?.data;
    return data.data;
  });
}
export default useActiveListing;
