import useOurSolisTransaction from "../service/useOurSolisTransaction";
import { Spin } from "antd";
import { useEffect } from "react";

const VerifiedSignatureProgress = ({ signedTxs }) => {
  console.log(signedTxs);

  useEffect(() => {
    // await Promise.all(
    //   transactions?.map(async (e) => {
    //     const a = await window.xnft.solana.send(e);
    //     console.log("signature: ", a);
    //     return a;
    //   }),
    // );
  }, []);

  return <Spin />;
  // return <h5>{signature}</h5>;
};

export default VerifiedSignatureProgress;
