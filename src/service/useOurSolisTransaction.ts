import { useMutation, useQuery } from "@tanstack/react-query";
import { useSolanaConnection } from "../hooks/xnft-hooks";

function useOurSolisTransaction(signature: string) {
  const connection = useSolanaConnection();
  return useMutation(async () => {
    return await connection!.getSignatureStatuses(
      {
        signature: signature,
      },
      "finalized",
    );
  });
}

export default useOurSolisTransaction;
