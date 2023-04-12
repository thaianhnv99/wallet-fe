import { useWeb3React } from "@web3-react/core";
import { CHAINS_ID, CHAINS_INFO, CHAINS_RPC } from "@constants/chains";
import { SupportChainIds } from "@constants/network";
import { Web3Provider } from "@ethersproject/providers";
import { useState } from "react";

const SwitchNetwork = () => {
  // get chainId from global state and below is test left
  const { chainId, library } = useWeb3React<Web3Provider>();
  const [chainIdOld, setChanidOld] = useState<CHAINS_ID>(Number(chainId));

  const ListChainSupport = SupportChainIds.map((v) => {
    return CHAINS_INFO[v];
  });

  const switchChangeNetwork = async (networkId: CHAINS_ID) => {
    const chainInfo = CHAINS_RPC[networkId];
    const lib = library?.provider.request || (window as any)?.ethereum;

    console.log(chainId);
    setChanidOld(Number(chainId));

    try {
      await lib
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainInfo.chainId }],
        })
        .then(() => {
          setChanidOld(Number(networkId));
        });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error?.code !== 4001) {
        try {
          return await lib.request({
            method: "wallet_addEthereumChain",
            params: [chainInfo],
          });
        } catch (addError: any) {
          // handle "add" error
          console.log("addError", addError);
          throw addError;
        }
      }
    }
  };

  return (
    <select onChange={(data) => switchChangeNetwork(Number(data.target.value))}>
      {ListChainSupport.map((c, index) => {
        return (
          <option
            key={index}
            value={c.chainId}
            selected={(chainId) === Number(c.chainId)}
          >
            {c.chainName}
          </option>
        );
      })}
    </select>
  );
};

export default SwitchNetwork;
