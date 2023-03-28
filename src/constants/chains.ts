import { toHex } from "../utils/string";
import iconEthereum from '../assets/icons/ethereum.png';
import iconBSC from '../assets/icons/bsc.png';
import iconPoly from '../assets/icons/polygon.png';

export enum CHAINS_ID {
    ETHER = 1,
    RINKEBY = 4,
    MATIC = 137,
    MATIC_TESTNET = 80001,
    BSC = 56,
    BSC_TESTNET = 97,
  }

  export enum ChainName {
    ETH = 'ETH',
    BSC = 'BSC',
    POLY = 'POLY',
  }

  export const EXPLORER_LINK: { [Key in CHAINS_ID]: string } = {
    [CHAINS_ID.ETHER]: 'https://etherscan.io',
    [CHAINS_ID.RINKEBY]: 'https://rinkeby.etherscan.io',
    [CHAINS_ID.MATIC]: 'https://polygonscan.com',
    [CHAINS_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com',
    [CHAINS_ID.BSC]: 'https://bscscan.com',
    [CHAINS_ID.BSC_TESTNET]: 'https://testnet.bscscan.com',
  };

  export interface IChainsInfo {
    chainId: string;
    chainName: string;
    icon: string;
    chainNameShort: string;
    chainNameSymbol: ChainName;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: (string | undefined)[];
    blockExplorerUrls: string[];
  }

  export const CHAINS_RPC = {
    // Ether
    [CHAINS_ID.ETHER]: {
      chainId: toHex(CHAINS_ID.ETHER),
      chainName: 'Ethereum Mainnet',
  
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_ETH_PRODUCTION],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.ETHER]],
    },
    [CHAINS_ID.RINKEBY]: {
      chainId: toHex(CHAINS_ID.RINKEBY),
      chainName: 'Rinkeby Testnet',
  
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_ETH_DEV1],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.RINKEBY]],
    },
    // Bsc
    [CHAINS_ID.BSC]: {
      chainId: toHex(CHAINS_ID.BSC),
      chainName: 'Binance Smart Chain Mainnet',
  
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_BSC_PRODUCTION],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.BSC]],
    },
    [CHAINS_ID.BSC_TESTNET]: {
      chainId: toHex(CHAINS_ID.BSC_TESTNET),
      chainName: 'Binance Smart Chain Testnet',
  
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_BSC_DEV1],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.BSC_TESTNET]],
    },
  
    // Poly
    [CHAINS_ID.MATIC]: {
      chainId: toHex(CHAINS_ID.MATIC),
      chainName: 'Polygon Mainnet',
  
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_POLY_PRODUCTION],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.BSC]],
    },
    [CHAINS_ID.MATIC_TESTNET]: {
      chainId: toHex(CHAINS_ID.MATIC_TESTNET),
      chainName: 'Polygon Mumbai',
  
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_NODE_POLY_DEV1],
      blockExplorerUrls: [EXPLORER_LINK[CHAINS_ID.BSC_TESTNET]],
    },
  };

  export const CHAINS_INFO: {
    [Key in CHAINS_ID]: IChainsInfo;
  } = {
    // Ether
    [CHAINS_ID.ETHER]: {
      ...CHAINS_RPC[CHAINS_ID.ETHER],
      icon: iconEthereum,
      chainNameShort: 'Ethereum',
      chainNameSymbol: ChainName.ETH,
    },
    [CHAINS_ID.RINKEBY]: {
      ...CHAINS_RPC[CHAINS_ID.RINKEBY],
      icon: iconEthereum,
      chainNameShort: 'Ethereum',
      chainNameSymbol: ChainName.ETH,
    },
    // BSC
    [CHAINS_ID.BSC]: {
      ...CHAINS_RPC[CHAINS_ID.BSC],
      icon: iconBSC,
      chainNameShort: 'BSC',
      chainNameSymbol: ChainName.BSC,
    },
    [CHAINS_ID.BSC_TESTNET]: {
      ...CHAINS_RPC[CHAINS_ID.BSC_TESTNET],
      icon: iconBSC,
      chainNameShort: 'BSC',
      chainNameSymbol: ChainName.BSC,
    },
    // Poly
    [CHAINS_ID.MATIC]: {
      ...CHAINS_RPC[CHAINS_ID.MATIC],
      icon: iconPoly,
      chainNameShort: 'Polygon',
      chainNameSymbol: ChainName.POLY,
    },
    [CHAINS_ID.MATIC_TESTNET]: {
      ...CHAINS_RPC[CHAINS_ID.MATIC_TESTNET],
      icon: iconPoly,
      chainNameShort: 'Polygon',
      chainNameSymbol: ChainName.POLY,
    },
  };