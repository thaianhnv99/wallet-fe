import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { useEffect } from "react";
import { formatEther } from "@ethersproject/units";

const ETHbalanceSWR = () => {
  const { account, active, library, chainId } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: () => library?.getBalance(account || ''),
  });

  useEffect(() => {
    if (!library) return;
    // Listen for changes on an Ethereum address
    console.log('listening for blocks');
    library.on("block", () => {
      console.log("update balance");
      mutate(undefined, true);
    });
    return () => {
        library.removeAllListeners('block')
    }
  }, [library, mutate]);

  return (
    <div>
      {active && balance ? <p>ETH in account: {parseFloat(formatEther(balance)).toFixed(3)} {chainId===31337? 'Test':' '} ETH</p> : 0}
    </div>
  );
};

export default ETHbalanceSWR