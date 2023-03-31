import { useEffect, useState } from "react";
import { useEagerConnect } from "../../../hooks/useEagerConnect";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useInactiveListener } from "../../../hooks/useInactiveListener";
import { SupportChainIds } from "../../../constants/network";
import { useAppWallet } from "../../../state/info/hooks";
interface Web3ReactManagerProps {
  children?: any;
}
const Web3ReactManager = ({ children }: Web3ReactManagerProps) => {
  const { connector, chainId } = useWeb3React<Web3Provider>();
  const { setChain } = useAppWallet();
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !activatingConnector);

  // Detect network
  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && SupportChainIds.includes(Number(ethereum.chainId))) {
        setChain(Number(ethereum.chainId));
    }
  }, [chainId, setChain]);

  return children;
};

export default Web3ReactManager;
