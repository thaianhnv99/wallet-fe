import { CHAINS_ID } from "./chains";

export const IS_NETWORK_MAINNET = process.env.REACT_APP_NETWORK === 'MAINNET';

export const SupportChainIds = IS_NETWORK_MAINNET
  ? [CHAINS_ID.ETHER, CHAINS_ID.BSC, CHAINS_ID.MATIC]
  : [CHAINS_ID.RINKEBY, CHAINS_ID.BSC_TESTNET, CHAINS_ID.MATIC_TESTNET];