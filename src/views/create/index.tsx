import React, { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata"
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from 'react-spinners';
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';

// UI Components
import { AiOutlineClose } from "react-icons/ai";
import { FaUpload, FaLink, FaCoins, FaInfoCircle } from 'react-icons/fa';
import { MdOutlineToken } from 'react-icons/md';

interface CreateViewProps {
  setOpenCreateModal: (open: boolean) => void;
}

export const CreateView: FC<CreateViewProps> = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "9",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  // Create Token Function
  const createToken = useCallback(async (token) => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected" });
      return;
    }

    setIsLoading(true);
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();

    try {
      const metadataUrl = await uploadMetadata(token);
      if (!metadataUrl) {
        notify({ type: "error", message: "Metadata upload failed" });
        return;
      }

      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      );

      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      )[0];

      const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: mintKeypair.publicKey,
          mintAuthority: publicKey,
          payer: publicKey,
          updateAuthority: publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: token.name,
              symbol: token.symbol,
              uri: metadataUrl,
              creators: null,
              sellerFeeBasisPoints: 0,
              uses: null,
              collection: null,
            },
            isMutable: false,
            collectionDetails: null,
          },
        }
      );

      const createNewTokenTransaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports: lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(token.decimals),
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          publicKey,
          tokenATA,
          publicKey,
          mintKeypair.publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(token.amount) * Math.pow(10, Number(token.decimals))
        ),
        createMetadataInstruction
      );

      const signature = await sendTransaction(
        createNewTokenTransaction,
        connection,
        { signers: [mintKeypair] }
      );

      setTokenMintAddress(mintKeypair.publicKey.toString());
      notify({
        type: "success",
        message: "Token created successfully!",
        txid: signature,
      });

    } catch (error: any) {
      console.error(error);
      notify({ type: "error", message: "Token creation failed: " + error.message });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, sendTransaction]);

  // Image Upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = await uploadImagePinata(file);
      if (imgUrl) {
        setToken({ ...token, image: imgUrl });
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  };

  const uploadImagePinata = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "fcdc626263dceb0bb69f",
          pinata_secret_api_key:"8a17ce40129a8f5a34acc02aafa8ec3caf128a89b9e13a6ffaa29cf570f556a3",
          "Content-Type": "multipart/form-data",
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error: any) {
      notify({ type: "error", message: "Image upload failed" });
      return "";
    }
  };

  // Metadata Upload
  const uploadMetadata = async (token) => {
    const { name, symbol, description, image } = token;
    if (!name || !symbol || !description || !image) {
      notify({ type: "error", message: "Please fill all fields" });
      return "";
    }

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
    });

    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "fcdc626263dceb0bb69f",
          pinata_secret_api_key:"8a17ce40129a8f5a34acc02aafa8ec3caf128a89b9e13a6ffaa29cf570f556a3",
          "Content-Type": "application/json",
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error: any) {
      notify({ type: "error", message: "Metadata upload failed" });
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createToken(token);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center">
            <ClipLoader color="#00ff00" size={50} />
            <p className="mt-4 text-white">Creating your token...</p>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-default-900 to-default-950 p-6 shadow-xl">
        <button
          onClick={() => setOpenCreateModal(false)}
          className="absolute right-4 top-4 text-white hover:text-primary"
        >
          <AiOutlineClose size={24} />
        </button>

        {!tokenMintAddress ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Create New Token</h2>
              <p className="text-default-300 mt-2">
                Fill in the details to create your Solana token
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Token Image Upload */}
              <div className="flex flex-col items-center">
                <label className="group relative cursor-pointer">
                  {previewImage ? (
                    <div className="h-32 w-32 overflow-hidden rounded-full">
                      <img
                        src={previewImage}
                        alt="Token preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/30 bg-default-900/50 hover:border-primary">
                      <FaUpload className="text-2xl text-white/50 group-hover:text-primary" />
                      <span className="mt-2 text-xs text-white/50 group-hover:text-primary">
                        Upload Logo
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Token Details */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <MdOutlineToken className="mr-2" />
                    Token Name
                  </label>
                  <input
                    type="text"
                    value={token.name}
                    onChange={(e) => handleFormFieldChange("name", e)}
                    placeholder="My Awesome Token"
                    className="w-full rounded-lg border border-white/10 bg-default-950/50 p-3 text-white focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <MdOutlineToken className="mr-2" />
                    Token Symbol
                  </label>
                  <input
                    type="text"
                    value={token.symbol}
                    onChange={(e) => handleFormFieldChange("symbol", e)}
                    placeholder="MAT"
                    className="w-full rounded-lg border border-white/10 bg-default-950/50 p-3 text-white focus:border-primary focus:outline-none"
                    required
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <FaCoins className="mr-2" />
                    Decimals
                  </label>
                  <select
                    value={token.decimals}
                    onChange={(e) => handleFormFieldChange("decimals", e)}
                    className="w-full rounded-lg border border-white/10 bg-default-950/50 p-3 text-white focus:border-primary focus:outline-none"
                  >
                    <option value="0">0 (NFT-like)</option>
                    <option value="6">6 (Like SOL)</option>
                    <option value="9">9 (Default)</option>
                    <option value="18">18 (Like ETH)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <FaCoins className="mr-2" />
                    Initial Supply
                  </label>
                  <input
                    type="number"
                    value={token.amount}
                    onChange={(e) => handleFormFieldChange("amount", e)}
                    placeholder="1000000"
                    className="w-full rounded-lg border border-white/10 bg-default-950/50 p-3 text-white focus:border-primary focus:outline-none"
                    required
                    min="1"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <FaInfoCircle className="mr-2" />
                    Description
                  </label>
                  <textarea
                    value={token.description}
                    onChange={(e) => handleFormFieldChange("description", e)}
                    placeholder="Describe your token's purpose and features"
                    className="w-full rounded-lg border border-white/10 bg-default-950/50 p-3 text-white focus:border-primary focus:outline-none"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-full bg-primary px-8 py-3 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create Token"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Token Created Successfully!</h3>
            <p className="text-default-300 mt-2">
              Your token has been deployed to the Solana blockchain
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-default-900/50 p-4 text-left">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white">Token Address</h4>
                <p className="mt-1 truncate text-primary">{tokenMintAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white">Name</h4>
                  <p className="mt-1 text-default-300">{token.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Symbol</h4>
                  <p className="mt-1 text-default-300">{token.symbol}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => setOpenCreateModal(false)}
                className="rounded-full border border-white/10 bg-transparent px-6 py-2 text-white transition-all hover:bg-white/10"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(tokenMintAddress);
                  notify({ type: "success", message: "Address copied to clipboard" });
                }}
                className="rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/90"
              >
                Copy Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};