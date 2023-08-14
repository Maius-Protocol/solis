import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useSignAndConfirmSolis() {
  return useMutation((tx) => {
    return axiosInstance.post(ApiRoutes.sendAndConfirm, {
      tx: tx,
    });
  });
}

export default useSignAndConfirmSolis;
