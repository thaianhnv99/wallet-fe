import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useCallback, useEffect, useState } from "react";
import { CHAINS_ID, CHAINS_INFO } from "../../constants/chains";
import { getStateConnect } from "../../utils/connecttors";

const ETHbalance = () => {
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const chainIdApp = getStateConnect();
  const {
    account,
    chainId,
    active,
    library: provider,
  } = useWeb3React<Web3Provider>();
  const { nativeCurrency } =
    CHAINS_INFO[chainId as CHAINS_ID || chainIdApp] || {};

  const fetchBalance = useCallback(async () => {
    if (account && active) {
      await provider?.getBalance(account).then((result) => {
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

  return <div>{<p>ETH in account: {userBalance} {nativeCurrency?.symbol}</p>}</div>;
};

export default ETHbalance;
