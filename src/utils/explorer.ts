import { PublicKey, Transaction } from "@solana/web3.js";

export function getExplorerUrl(
  endpoint: string,
  viewTypeOrItemAddress: "inspector" | PublicKey | string,
  itemType: "address"
){
  const getClusterParam = ()=> {
    let cluster = "";
    if (endpoint=== "localnet") {
      cluster = `customer&customeUrl=${encodeURIComponent(
        "http://127.0.0.1:8899"
      )}`;
    } else if (endpoint === "http://api.devnet.solana.com") {
      cluster = "devnet";
    }
    return cluster ? `?cluster=${cluster}` : "";
  };
  return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAddress}${getClusterParam()}`;
}