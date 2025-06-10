import {WalletAdapterNetwork, WalletError} from '@solana/wallet-adapter-base';
import {
    ConnectionProvider as SolanaConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {WalletModalProvider as ReactUIWalletModalProvider} from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';

import {FC, ReactNode, useCallback, useMemo} from 'react';
import {clusterApiUrl} from '@solana/web3.js';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';

import { notify } from '../utils/notifications';
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration
} from "./NetworkConfigurationProvider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({children}) => {
const {autoConnect} = useAutoConnect();
const {networkConfiguration} = useNetworkConfiguration();
const network = networkConfiguration as WalletAdapterNetwork;
const originalEndpoint = useMemo(() => clusterApiUrl(network), [network]);

let endpoint;
if (network === "mainnet-beta") {
  endpoint = "https://solana-mainnet.g.alchemy.com/v2/TlThxj0r2jHW6RaRS8UowdF4fMrIa3PX"; // Replace with your mainnet RPC URL
} else if (network === "devnet") {
  endpoint = originalEndpoint; // Replace with your devnet RPC URL
} else {
  endpoint = originalEndpoint; // Replace with your testnet RPC URL
}

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter()
    ],
    [network]
  );

    // Handle wallet errors globally
  const onError = useCallback((error: WalletError) => {
    notify({
      type: "error",
      message: error.message ? `${error.message}` : error.name,
    });
    console.error("Wallet error:", error);
  } , []);

  return (
    <SolanaConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </SolanaConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({children}) => {
  return (
    <NetworkConfigurationProvider>
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </NetworkConfigurationProvider>
  );
}