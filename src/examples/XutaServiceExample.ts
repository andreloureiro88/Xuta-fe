import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { XutaService } from "../services/XutaService";

async function main() {
  // Initialize connection to local Solana network
  const connection = new Connection("http://localhost:8899", "confirmed");

  // Create a wallet (in production, you would use a real wallet)
  const wallet = new Wallet(Keypair.generate());

  // Create the provider
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  // Initialize the XutaService
  const xutaService = new XutaService(provider);

  try {
    // Example 1: Create a new campaign
    const mintPlayer = new PublicKey("..."); // Replace with actual mint address
    const mintQuote = new PublicKey("..."); // Replace with actual mint address

    const campaignTx = await xutaService.createCampaign(
      "My Campaign",
      "Campaign Contract",
      "https://example.com/image.png",
      1000, // ratio
      1000000, // target amount
      Date.now() / 1000, // initial date (current timestamp)
      Date.now() / 1000 + 30 * 24 * 60 * 60, // due date (30 days from now)
      mintPlayer,
      mintQuote
    );
    console.log("Campaign created:", campaignTx);

    // Example 2: Buy tokens
    const campaignPda = new PublicKey("..."); // Replace with actual campaign PDA
    const userQuoteAta = new PublicKey("..."); // Replace with actual user quote token account

    const buyTx = await xutaService.buyToken(
      1000, // amount
      campaignPda,
      mintQuote,
      userQuoteAta
    );
    console.log("Tokens bought:", buyTx);

    // Example 3: Fetch campaign information
    const campaignInfo = await xutaService.getCampaign(campaignPda);
    console.log("Campaign info:", campaignInfo);

    // Example 4: Initialize an institution
    const newInstitutionAuthority = new PublicKey("..."); // Replace with actual authority
    const institutionTx = await xutaService.initInstitution(
      "My Institution",
      "Institution Contract",
      newInstitutionAuthority
    );
    console.log("Institution initialized:", institutionTx);

    // Example 5: Set fees
    const feeTx = await xutaService.setFee(100, 200); // feePre: 100, feePos: 200
    console.log("Fees set:", feeTx);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
main().catch(console.error);
