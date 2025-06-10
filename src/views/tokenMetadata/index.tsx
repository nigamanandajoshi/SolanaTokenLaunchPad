import React, { FC, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { notify } from "../../utils/notifications";

// Icons
import { AiOutlineClose } from "react-icons/ai";
import { FaCopy, FaExternalLinkAlt, FaCoins, FaInfoCircle } from 'react-icons/fa';
import { MdOutlineToken } from 'react-icons/md';
import { RiLinksLine } from 'react-icons/ri';

interface TokenMetadataViewProps {
  mintAddress: string;
  setOpenMetadataModal: (open: boolean) => void;
}

interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  decimals?: number;
  supply?: number;
  mintAddress?: string;
  metadataUri?: string;
  links?: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    whitepaper?: string;
  };
}

export const TokenMetadataView: FC<TokenMetadataViewProps> = ({ 
  mintAddress, 
  setOpenMetadataModal 
}) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchTokenMetadata = async () => {
      try {
        setIsLoading(true);
        
        // Get on-chain metadata
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            new PublicKey(mintAddress).toBuffer(),
          ],
          PROGRAM_ID
        )[0];

        const metadataAccount = await connection.getAccountInfo(metadataPDA);
        
        if (!metadataAccount) {
          throw new Error("Metadata account not found");
        }

        // Decode metadata (simplified - in reality you'd use metaplex SDK)
        const metadataUri = new TextDecoder().decode(metadataAccount.data)
          .split("\0")
          .find(part => part.startsWith("http"));

        if (!metadataUri) {
          throw new Error("Metadata URI not found");
        }

        // Fetch off-chain metadata
        const { data } = await axios.get(metadataUri);
        
        // Get token supply
        const mintAccount = await connection.getAccountInfo(new PublicKey(mintAddress));
        const supply = mintAccount ? parseInt(mintAccount.data.readBigUInt64LE(36).toString()) : 0;

        // Get token balance if wallet is connected
        let balance = null;
        if (publicKey) {
          const tokenAccount = await connection.getTokenAccountsByOwner(publicKey, {
            mint: new PublicKey(mintAddress),
          });
          balance = tokenAccount.value[0]?.account.data.readUInt32LE(64) || 0;
        }

        setMetadata({
          ...data,
          mintAddress,
          metadataUri,
          supply,
          decimals: data.decimals || 9 // Default to 9 decimals if not specified
        });
        setTokenBalance(balance);

      } catch (error: any) {
        console.error("Failed to fetch token metadata:", error);
        notify({ type: "error", message: `Failed to load token metadata: ${error.message}` });
      } finally {
        setIsLoading(false);
      }
    };

    if (mintAddress) {
      fetchTokenMetadata();
    }
  }, [mintAddress, connection, publicKey]);

  const formatNumber = (num: number, decimals: number = 0) => {
    return (num / Math.pow(10, decimals)).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notify({ type: "success", message: "Copied to clipboard!" });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-default-900 to-default-950 p-6 shadow-xl">
        <button
          onClick={() => setOpenMetadataModal(false)}
          className="absolute right-4 top-4 text-white hover:text-primary"
        >
          <AiOutlineClose size={24} />
        </button>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <ClipLoader color="#00ff00" size={50} />
          </div>
        ) : metadata ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Token Details</h2>
              <p className="text-default-300 mt-2">
                View metadata and information for this token
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/50">
                {metadata.image ? (
                  <img
                    src={metadata.image}
                    alt={`${metadata.name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-default-800">
                    <MdOutlineToken className="text-4xl text-white/50" />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-default-900/50 p-4">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-sm font-medium text-white">
                    <MdOutlineToken className="mr-2" />
                    Name
                  </div>
                  <p className="mt-1 text-default-300">{metadata.name}</p>
                </div>
                <div>
                  <div className="flex items-center text-sm font-medium text-white">
                    <MdOutlineToken className="mr-2" />
                    Symbol
                  </div>
                  <p className="mt-1 text-default-300">{metadata.symbol}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm font-medium text-white">
                  <FaInfoCircle className="mr-2" />
                  Description
                </div>
                <p className="mt-1 text-default-300">{metadata.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-sm font-medium text-white">
                    <FaCoins className="mr-2" />
                    Decimals
                  </div>
                  <p className="mt-1 text-default-300">{metadata.decimals}</p>
                </div>
                <div>
                  <div className="flex items-center text-sm font-medium text-white">
                    <FaCoins className="mr-2" />
                    Total Supply
                  </div>
                  <p className="mt-1 text-default-300">
                    {formatNumber(metadata.supply || 0, metadata.decimals)} {metadata.symbol}
                  </p>
                </div>
              </div>

              {tokenBalance !== null && (
                <div className="mt-4">
                  <div className="flex items-center text-sm font-medium text-white">
                    <FaCoins className="mr-2" />
                    Your Balance
                  </div>
                  <p className="mt-1 text-default-300">
                    {formatNumber(tokenBalance, metadata.decimals)} {metadata.symbol}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-white/10 bg-default-900/50 p-4">
              <div className="mb-2 flex items-center text-sm font-medium text-white">
                <RiLinksLine className="mr-2" />
                Token Address
              </div>
              <div className="flex items-center justify-between rounded bg-default-950/50 px-3 py-2">
                <p className="truncate text-default-300">{shortenAddress(metadata.mintAddress || '')}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(metadata.mintAddress || '')}
                    className="text-default-300 hover:text-primary"
                  >
                    <FaCopy />
                  </button>
                  <a
                    href={`https://explorer.solana.com/address/${metadata.mintAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-default-300 hover:text-primary"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              {metadata.metadataUri && (
                <>
                  <div className="mt-4 mb-2 flex items-center text-sm font-medium text-white">
                    <RiLinksLine className="mr-2" />
                    Metadata URI
                  </div>
                  <div className="flex items-center justify-between rounded bg-default-950/50 px-3 py-2">
                    <p className="truncate text-default-300">
                      {metadata.metadataUri.length > 30 
                        ? `${metadata.metadataUri.substring(0, 15)}...${metadata.metadataUri.substring(metadata.metadataUri.length - 15)}`
                        : metadata.metadataUri}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(metadata.metadataUri || '')}
                        className="text-default-300 hover:text-primary"
                      >
                        <FaCopy />
                      </button>
                      <a
                        href={metadata.metadataUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-default-300 hover:text-primary"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {(metadata.links?.website || metadata.links?.twitter || metadata.links?.telegram || metadata.links?.discord || metadata.links?.whitepaper) && (
              <div className="rounded-lg border border-white/10 bg-default-900/50 p-4">
                <div className="mb-3 flex items-center text-sm font-medium text-white">
                  <RiLinksLine className="mr-2" />
                  Links
                </div>
                <div className="flex flex-wrap gap-2">
                  {metadata.links?.website && (
                    <a
                      href={metadata.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full border border-white/10 bg-default-950/50 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                      <FaExternalLinkAlt className="mr-2" size={12} />
                      Website
                    </a>
                  )}
                  {metadata.links?.twitter && (
                    <a
                      href={metadata.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full border border-white/10 bg-default-950/50 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                      <FaExternalLinkAlt className="mr-2" size={12} />
                      Twitter
                    </a>
                  )}
                  {metadata.links?.telegram && (
                    <a
                      href={metadata.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full border border-white/10 bg-default-950/50 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                      <FaExternalLinkAlt className="mr-2" size={12} />
                      Telegram
                    </a>
                  )}
                  {metadata.links?.discord && (
                    <a
                      href={metadata.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full border border-white/10 bg-default-950/50 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                      <FaExternalLinkAlt className="mr-2" size={12} />
                      Discord
                    </a>
                  )}
                  {metadata.links?.whitepaper && (
                    <a
                      href={metadata.links.whitepaper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full border border-white/10 bg-default-950/50 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                      <FaExternalLinkAlt className="mr-2" size={12} />
                      Whitepaper
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setOpenMetadataModal(false)}
                className="rounded-full border border-white/10 bg-transparent px-8 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-default-300">Failed to load token metadata</p>
          </div>
        )}
      </div>
    </div>
  );
};