import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { Transaction, Connection, PublicKey } from "@solana/web3.js";

export async function getOrCreateATAWithWallet(
  connection: Connection,
  walletPublicKey: PublicKey,
  mint: PublicKey,
  signTransaction: (tx: Transaction) => Promise<Transaction>
): Promise<PublicKey> {
  // 🧮 Compute the ATA address
  const ata = await getAssociatedTokenAddress(mint, walletPublicKey, false);

  const account = await connection.getAccountInfo(ata);

  if (!account) {
    // ❌ Doesn't exist — create it
    const ix = createAssociatedTokenAccountInstruction(
      walletPublicKey, // payer
      ata, // associated token account
      walletPublicKey, // owner
      mint
    );

    const tx = new Transaction().add(ix);
    tx.feePayer = walletPublicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signed = await signTransaction(tx);
    const sig = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(sig, "confirmed");
  }

  return ata;
}
