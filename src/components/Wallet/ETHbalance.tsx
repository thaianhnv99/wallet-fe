import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useEffect, useState } from "react";

const ETHbalance = () => {
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const {
    account,
    active,
    library: provider,
  } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (account && active) {
      provider?.getBalance(account).then((result) => {
        setUserBalance(Number(formatEther(result)));
      });
    }
  }, [account, active, provider]);
  return (
    <div>
      {active && account ? <p>ETH in account: {userBalance}</p> : 0}
    </div>
  );
};

export default ETHbalance;
