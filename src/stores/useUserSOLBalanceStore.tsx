import create from "zustand";
import { Connection, PublicKey } from "@solana/web3.js";

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => Promise<void>;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey: PublicKey, connection: Connection) => {
    try {
      const lamportsBalance = await connection.getBalance(publicKey, "confirmed");
      const solBalance = lamportsBalance / 1e9; // Convert lamports to SOL (1e9 lamports = 1 SOL)
      
      set({ balance: solBalance });
      console.log("SOL Balance updated:", solBalance);
    } catch (error) {
      console.error("Error fetching SOL balance:", error);
      set({ balance: 0 });
    }
  },
}));

export default useUserSOLBalanceStore;
