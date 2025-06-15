import React, { FC, useEffect, useCallback, useState } from 'react';
import useUserSOLBalanceStore  from '../../stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { AiOutlineClose } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

interface AirdropViewProps {
  setOpenAirdrop: (open: boolean) => void;
}

type Notification = {
  type: 'success' | 'error' | 'info';
  message: string;
  description?: string;
  txid?: string;
};

export const AirdropView: FC<AirdropViewProps> = ({ setOpenAirdrop }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = wallet;

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      setNotification({
        type: 'error',
        message: 'Wallet Not Connected',
        description: 'Please connect your wallet to claim airdrop'
      });
      return;
    }

    setIsLoading(true);
    let signature: TransactionSignature = "";
    
    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      
      setNotification({
        type: 'success',
        message: 'Airdrop Claimed Successfully!',
        description: '1 SOL has been added to your wallet',
        txid: signature
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature,
      });

      await getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: 'Airdrop Failed',
        description: error?.message,
        txid: signature
      });
      console.error("Airdrop Failed:", error?.message, signature);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  const CloseModal = () => (
    <button
      onClick={() => setOpenAirdrop(false)}
      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      aria-label="Close modal"
    >
      <AiOutlineClose className="text-xl text-white" />
    </button>
  );

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 max-w-md mx-auto border border-gray-700 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          SOL Airdrop
        </h2>
        <CloseModal />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Current Balance</span>
            <span className="text-xl font-bold text-white">
              {balance !== undefined ? balance.toFixed(2) : "0"} SOL
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
              style={{ width: `${Math.min(balance ? balance * 10 : 0, 100)}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={onClick}
          disabled={!publicKey || isLoading}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300
            ${!publicKey ? 'bg-gray-600 cursor-not-allowed' : 
             isLoading ? 'bg-blue-700 cursor-wait' : 
             'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'}
            shadow-lg hover:shadow-blue-500/30`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Claim 1 SOL'
          )}
        </button>

        {notification && (
          <div className={`w-full mt-6 p-4 rounded-lg border ${
            notification.type === 'success' ? 
              'bg-green-900/30 border-green-500' : 
              notification.type === 'error' ? 
              'bg-red-900/30 border-red-500' : 
              'bg-blue-900/30 border-blue-500'
          }`}>
            <div className="flex items-start">
              <div className={`mr-3 mt-1 ${
                notification.type === 'success' ? 'text-green-400' : 
                notification.type === 'error' ? 'text-red-400' : 
                'text-blue-400'
              }`}>
                <BsInfoCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{notification.message}</h3>
                <p className="text-gray-300">{notification.description}</p>
                {notification.txid && (
                  <p className="text-xs mt-2 text-gray-400 break-all">
                    TX: {notification.txid}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
