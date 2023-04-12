import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAppWallet } from '@state/info/hooks';

export function useWeb3Activity() {
    const context = useWeb3React<Web3Provider>();
    const { state: stateWallet } = useAppWallet();
    const { chainId, account, active } = context;

    const isChainSupport = chainId === stateWallet.chainIdApp as any;

    const hasAccount = Boolean(active && account) && stateWallet.connected;

    const executeFuncHasAccount = (funcExecute: () => any) => {
        return hasAccount ? funcExecute() : null;
    };

    return {
        isChainSupport,
        account,
        hasAccount,
        executeFuncHasAccount,
        walletReady: isChainSupport && hasAccount,
        context,
    };
}
