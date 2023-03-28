import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useCallback, useEffect, useState } from "react";

const ETHbalance = () => {
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const { account, active, library: provider } = useWeb3React<Web3Provider>();

  const fetchBalance = useCallback(() => {
    if (account && active) {
      provider?.getBalance(account).then((result) => {
        const balance = parseFloat(formatEther(result)).toFixed(3);
        setUserBalance(balance);
      });
    }
  }, [account, active, provider]);

  useEffect(() => {
    if (!provider) return;
    // Listen for changes on an Ethereum address
    provider.on("block", () => {
      fetchBalance();
    });
    return () => {
      provider.removeAllListeners("block");
    };
  }, [fetchBalance, provider]);

  useEffect(() => {
    if (account && active) {
      fetchBalance();
    }
  }, [account, active, fetchBalance]);

  return <div>{<p>ETH in account: {userBalance} ETH</p>}</div>;
};

export default ETHbalance;
