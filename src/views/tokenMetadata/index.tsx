// // import React, { FC, useCallback, useEffect, useState } from 'react';
// // import { PublicKey } from '@solana/web3.js';
// // import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// // import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
// // import axios from 'axios';
// // import { ClipLoader } from 'react-spinners';
// // import { notify } from "../../utils/notifications";
// // import { AiOutlineClose } from 'react-icons/ai';

// // interface TokenMetadataProps {
// //   setOpenTokenMetaData: (open: boolean) => void;
// // }

// // export const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetaData }) => {
// //   const { connection } = useConnection();
// //   const [tokenAddress, seTokenAddress] = useState("");
// //   const [TokenMetadata, setTokenMetadata] = useState(null);
// //   const [loaded, setLoaded] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);


// //   const getMetadata = useCallback(async (form)=>{
// //     setIsLoading(true);
// //     try{
// //       const tokenMint =new PublicKey(form);
// //       const metadataPDA = PublicKey.findProgramAddressSync(
// //         [
// //           Buffer.from("metadata"),
// //           PROGRAM_ID.toBuffer(),
// //           tokenMint.toBuffer(),
// //         ],
// //         PROGRAM_ID
// //       )[0];

// //       const metadataAccount = await connection.getAccountInfo(metadataPDA);
// //       const [metadata, _] = await Metadata.deserialize(metadataAccount.data);

// //       let logoRes = await fetch(metadata.data.uri);
// //       let logoJson = await logoRes.json();
// //       let {image} = logoJson;

// //       setTokenMetadata({TokenMetadata, ...metadata.data});
// //       setLogo(image);
// //       setIsLoading(false);
// //       setLoaded(true);
// //       setTokenMetadata('');
// //       notify({
// //         type: "succes",
// //         message: "Successfully fetch token Metadata",
// //       });
// //     } catch (error: any){
// //       notify({
// //         type: "error",
// //         message: "Token Metadata Failed",
// //       });
// //       setIsLoading(false);
// //     }
// //   },
// //   [tokenAddress]
// // );

// // //component

// // const CloseModal = ()=> <a onClick={()=> setOpenTokenMetaData(false)}
// // className='group mt-4 inline-flex h-10 items-center justify-center
// // rounded-lg bg-white/20 backdroop-blur-2xl transition-all duration-500
// // hover:bg-blue-600/60'>
// //   <i className='text-2xl text-white gropu-hover:text-white'>
// //   <AiOutlineClose/>  
// //   </i>
// // </a>

// //   return (
// //     <div>
// //       {/* Your component JSX goes here */}
// //       <h2>Token Metadata</h2>
// //     </div>
// //   );
// // };
// // const [logo, setLogo] = useState<string | null>(null);

// import React, { FC, useCallback, useEffect, useState } from 'react';
// import { PublicKey } from '@solana/web3.js';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
// import { notify } from "../../utils/notifications";
// import { AiOutlineClose } from 'react-icons/ai';

// interface TokenMetadataProps {
//   setOpenTokenMetaData: (open: boolean) => void;
// }

// export const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetaData }) => {
//   const { connection } = useConnection();
//   const [tokenAddress, setTokenAddress] = useState("");
//   const [tokenMetadata, setTokenMetadata] = useState<any>(null);
//   const [loaded, setLoaded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [logo, setLogo] = useState<string | null>(null);

//   const getMetadata = useCallback(async (mintAddress: string) => {
//     setIsLoading(true);
//     try {
//       const tokenMint = new PublicKey(mintAddress);
//       const metadataPDA = PublicKey.findProgramAddressSync(
//         [
//           Buffer.from("metadata"),
//           PROGRAM_ID.toBuffer(),
//           tokenMint.toBuffer(),
//         ],
//         PROGRAM_ID
//       )[0];

//       const metadataAccount = await connection.getAccountInfo(metadataPDA);
//       if (!metadataAccount) {
//         throw new Error("No metadata account found");
//       }
      
//       const [metadata, _] = await Metadata.deserialize(metadataAccount.data);

//       let logoRes = await fetch(metadata.data.uri);
//       let logoJson = await logoRes.json();
//       let { image } = logoJson;

//       setTokenMetadata({ ...metadata.data });
//       setLogo(image);
//       setLoaded(true);
//       notify({
//         type: "success",
//         message: "Successfully fetched token Metadata",
//       });
//     } catch (error: any) {
//       notify({
//         type: "error",
//         message: "Token Metadata Failed: " + error.message,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [connection]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (tokenAddress.trim()) {
//       getMetadata(tokenAddress);
//     }
//   };

//   const CloseModal = () => (
//     <a 
//       onClick={() => setOpenTokenMetaData(false)}
//       className='group mt-4 inline-flex h-10 items-center justify-center
//       rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500
//       hover:bg-blue-600/60 cursor-pointer'
//     >
//       <i className='text-2xl text-white group-hover:text-white'>
//         <AiOutlineClose/>  
//       </i>
//     </a>
//   );

//   return (
//     <div className="p-4 text-white">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Token Metadata</h2>
//         <CloseModal />
//       </div>

//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             value={tokenAddress}
//             onChange={(e) => setTokenAddress(e.target.value)}
//             placeholder="Enter Token Mint Address"
//             className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center items-center"
//           >
//             {isLoading ? (
//               <ClipLoader color="#ffffff" size={20} />
//             ) : (
//               "Fetch Metadata"
//             )}
//           </button>
//         </div>
//       </form>

//       {loaded && tokenMetadata && (
//         <div className="bg-gray-800 p-6 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {logo && (
//               <div className="flex justify-center">
//                 <img 
//                   src={logo} 
//                   alt="Token Logo" 
//                   className="w-32 h-32 rounded-full object-cover"
//                 />
//               </div>
//             )}
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Token Information</h3>
//               <div className="space-y-2">
//                 <p><span className="font-medium">Name:</span> {tokenMetadata.name}</p>
//                 <p><span className="font-medium">Symbol:</span> {tokenMetadata.symbol}</p>
//                 <p><span className="font-medium">Seller Fee Basis Points:</span> {tokenMetadata.sellerFeeBasisPoints}</p>
//                 <p>
//                   <span className="font-medium">URI:</span>{" "}
//                   <a href={tokenMetadata.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                     {tokenMetadata.uri}
//                   </a>
//                 </p>
//                 {tokenMetadata.creators && (
//                   <div>
//                     <p className="font-medium">Creators:</p>
//                     <ul className="list-disc pl-5">
//                       {tokenMetadata.creators.map((creator: any, index: number) => (
//                         <li key={index}>
//                           <span className="font-medium">Address:</span> {creator.address.toString()},{" "}
//                           <span className="font-medium">Verified:</span> {creator.verified ? "Yes" : "No"},{" "}
//                           <span className="font-medium">Share:</span> {creator.share}%
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { FC, useCallback, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { ClipLoader } from 'react-spinners';
import { notify } from "../../utils/notifications";
import { AiOutlineClose, AiOutlineLink } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';

interface TokenMetadataProps {
  setOpenTokenMetaData: (open: boolean) => void;
}

interface Creator {
  address: PublicKey;
  verified: boolean;
  share: number;
}

interface TokenMetadataData {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators?: Creator[];
  updateAuthority?: PublicKey;
  primarySaleHappened?: boolean;
  isMutable?: boolean;
}

export const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadataData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notify({ type: "success", message: "Copied to clipboard!" });
  };

  const getMetadata = useCallback(async (mintAddress: string) => {
    setIsLoading(true);
    setTokenMetadata(null);
    setLogo(null);
    
    try {
      const tokenMint = new PublicKey(mintAddress);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          tokenMint.toBuffer(),
        ],
        PROGRAM_ID
      )[0];

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      if (!metadataAccount) {
        throw new Error("No metadata account found");
      }
      
      const [metadata] = await Metadata.deserialize(metadataAccount.data);

      const logoRes = await fetch(metadata.data.uri);
      const logoJson = await logoRes.json();
      const { image } = logoJson;

      setTokenMetadata(metadata.data);
      setLogo(image);
      
      notify({
        type: "success",
        message: "Successfully fetched token metadata",
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: error.message || "Failed to fetch token metadata",
      });
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenAddress.trim()) {
      getMetadata(tokenAddress);
    } else {
      notify({
        type: "error",
        message: "Please enter a token address",
      });
    }
  };

  const CloseModal = () => (
    <button 
      onClick={() => setOpenTokenMetaData(false)}
      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      aria-label="Close modal"
    >
      <AiOutlineClose className="text-xl text-white"/>
    </button>
  );

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Token Metadata Explorer
          </h2>
          <p className="text-gray-400 mt-1">Discover detailed information about any SPL token</p>
        </div>
        <CloseModal />
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="tokenAddress" className="block text-sm font-medium mb-2 text-gray-300">
              Token Mint Address
            </label>
            <div className="relative">
              <input
                id="tokenAddress"
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Enter Token Mint Address (e.g., 4k3Dyj...)"
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 hover:border-gray-600 transition-all"
                required
              />
              {tokenAddress && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(tokenAddress)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  title="Copy to clipboard"
                >
                  <FiCopy />
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex justify-center items-center space-x-2 font-medium"
          >
            {isLoading ? (
              <>
                <ClipLoader color="#ffffff" size={20} />
                <span>Fetching Metadata...</span>
              </>
            ) : (
              "Fetch Metadata"
            )}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <ClipLoader color="#6366f1" size={60} />
          <p className="mt-4 text-gray-400">Fetching token metadata...</p>
        </div>
      )}

      {!isLoading && tokenMetadata && (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {tokenMetadata.name}
              </h3>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2 py-1 bg-gray-700 rounded-md text-sm font-mono">
                  {tokenMetadata.symbol}
                </span>
                <span className="px-2 py-1 bg-blue-900/30 rounded-md text-sm">
                  Royalty: {tokenMetadata.sellerFeeBasisPoints / 100}%
                </span>
              </div>
            </div>
            {logo && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
                <img 
                  src={logo} 
                  alt="Token Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-300 mb-2">Metadata URI</h4>
                <div className="flex items-center">
                  <a 
                    href={tokenMetadata.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:underline break-all flex items-center"
                  >
                    {tokenMetadata.uri.length > 30 
                      ? `${tokenMetadata.uri.substring(0, 30)}...` 
                      : tokenMetadata.uri}
                    <AiOutlineLink className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-300 mb-2">Token Address</h4>
                <div className="flex items-center">
                  <p className="font-mono text-sm break-all mr-2">
                    {tokenAddress.substring(0, 6)}...{tokenAddress.slice(-4)}
                  </p>
                  <button 
                    onClick={() => copyToClipboard(tokenAddress)}
                    className="text-gray-400 hover:text-white"
                    title="Copy to clipboard"
                  >
                    <FiCopy size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-300 mb-3">Details</h4>
              <div className="space-y-3">
                {tokenMetadata.updateAuthority && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Update Authority</span>
                    <div className="flex items-center">
                      <span className="font-mono text-sm">
                        {tokenMetadata.updateAuthority.toString().substring(0, 6)}...{tokenMetadata.updateAuthority.toString().slice(-4)}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(tokenMetadata.updateAuthority.toString())}
                        className="text-gray-400 hover:text-white ml-1"
                        title="Copy to clipboard"
                      >
                        <FiCopy size={12} />
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Primary Sale</span>
                  <span>{tokenMetadata.primarySaleHappened ? "✅ Completed" : "❌ Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Is Mutable</span>
                  <span>{tokenMetadata.isMutable ? "✅ Yes" : "❌ No"}</span>
                </div>
              </div>
            </div>
          </div>

          {tokenMetadata.creators && tokenMetadata.creators.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Creators</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tokenMetadata.creators.map((creator, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <p className="font-mono text-sm break-all mr-2">
                            {creator.address.toString().substring(0, 6)}...{creator.address.toString().slice(-4)}
                          </p>
                          <button 
                            onClick={() => copyToClipboard(creator.address.toString())}
                            className="text-gray-400 hover:text-white"
                            title="Copy to clipboard"
                          >
                            <FiCopy size={12} />
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${creator.verified ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                            {creator.verified ? 'Verified' : 'Unverified'}
                          </span>
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                            Share: {creator.share}%
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
