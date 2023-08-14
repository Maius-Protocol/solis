import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useListTensorCollections() {
  return useQuery(["list-collections"], async () => {
    // console.log(ApiRoutes.listCollection);
    const data = (await axiosInstance.get(ApiRoutes.listCollection))?.data;
    console.log(data);
    return data.data;
  });
}

export default useListTensorCollections;
