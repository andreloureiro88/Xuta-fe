import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import type { XutaSc } from "../../idl/xuta";
import XutaIDL from "../../idl/xuta_sc.json";
import { BN } from "bn.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
} from "@solana/spl-token";

export class XutaService {
  private program: Program<Idl>;
  private provider: AnchorProvider;

  constructor(provider: AnchorProvider) {
    this.provider = provider;

    // Add more detailed logging
    console.log("Program ID from IDL:", XutaIDL.address);
    console.log("Provider connection:", provider.connection.rpcEndpoint);
    console.log("Provider wallet:", provider.wallet.publicKey.toString());

    // Use the IDL directly with type assertion
    this.program = new Program(XutaIDL as XutaSc, provider);
    console.log(this.program);
    // Log the program instance
    console.log(
      "Program instance created with ID:",
      this.program.programId.toString()
    );
  }

  deriveConfigPDA(programId: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      programId
    )[0];
  }

  deriveInstitutionPDA(programId: PublicKey, institutionName: string) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("institution"), Buffer.from(institutionName)],
      programId
    )[0];
  }

  deriveMintPDA(programId: PublicKey, mintWallet: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("mint"), mintWallet.toBuffer()],
      programId
    )[0];
  }

  deriveCampaignPDA(programId: PublicKey, mintPlayer: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), mintPlayer.toBuffer()],
      programId
    )[0];
  }

  deriveVaultPDA(
    programId: PublicKey,
    campaignPda: PublicKey,
    mintQuote: PublicKey
  ) {
    return PublicKey.findProgramAddressSync(
      [campaignPda.toBuffer(), Buffer.from("vault"), mintQuote.toBuffer()],
      programId
    )[0];
  }

  async getXutaConfig(program: Program<XutaSc>) {
    return program.account.config.fetch(
      this.deriveConfigPDA(program.programId)
    );
  }

  // Institution Methods
  async initialize() {
    console.log("id", this.program.programId.toBase58());
    const configPda = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    )[0];

    console.log(
      "Initializing program with authority:",
      this.provider.wallet.publicKey.toString()
    );
    console.log("Config PDA:", configPda.toString());

    return await this.program.methods
      .init()
      .accounts({
        authority: this.provider.wallet.publicKey,
        config: configPda,
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
  }

  // Campaign Methods

  async getAllCampaigns() {
    console.log("acc", this.program.account);
    return this.program.account.campaign.all();
  }

  async initializeMint(mint: Keypair, decimals: number = 9) {
    const lamports = await getMinimumBalanceForRentExemptMint(
      this.provider.connection
    );

    const createMintAccountIx = SystemProgram.createAccount({
      fromPubkey: this.provider.wallet.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const initializeMintIx = createInitializeMintInstruction(
      mint.publicKey,
      decimals,
      this.provider.wallet.publicKey,
      this.provider.wallet.publicKey
    );

    const tx = new Transaction().add(createMintAccountIx, initializeMintIx);

    console.log("Initializing mint:", mint.publicKey.toString());
    console.log("Decimals:", decimals);

    const signature = await this.provider.sendAndConfirm(tx, [mint]);
    console.log("Mint initialization transaction:", signature);

    // Verify the mint was created
    const mintInfo = await this.provider.connection.getAccountInfo(
      mint.publicKey
    );
    if (!mintInfo) {
      throw new Error("Failed to create mint account");
    }
    console.log("Mint account verified");

    return mint.publicKey;
  }

  async createCampaign(
    name: string,
    contract: string,
    image: string,
    description: string,
    ratio: number,
    targetAmount: number,
    initialDate: number,
    dueDate: number,
    institutionName: string
  ): Promise<PublicKey> {
    try {
      // Generate and initialize mint accounts
      const mintPlayerKey = Keypair.generate();

      console.log("Initializing mint accounts...");

      const mintQuote = new PublicKey(
        "7ibogEL4YokK34GBe8iKXxUxU1KaTcignu31gz9g6Py9"
      );

      // Derive PDAs
      const [campaignPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("campaign"), mintPlayerKey.publicKey.toBuffer()],
        this.program.programId
      );

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), campaignPda.toBuffer()],
        this.program.programId
      );

      const institutionPda = this.deriveInstitutionPDA(
        this.program.programId,
        institutionName
      );

      const configPda = this.deriveConfigPDA(this.program.programId);

      // Create the campaign
      const tx = await this.program.methods
        .createCampaign(
          name,
          contract,
          image,
          description,
          ratio,
          new BN(targetAmount),
          new BN(initialDate),
          new BN(dueDate)
        )
        .accounts({
          authority: this.provider.wallet.publicKey,
          mintPlayer: mintPlayerKey.publicKey,
          mintQuote,
          campaign: campaignPda,
          institution: institutionPda,
          config: configPda,
          vault: vaultPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([mintPlayerKey])
        .rpc();

      console.log("Campaign created successfully:", {
        tx,
        campaign: campaignPda.toBase58(),
      });

      return campaignPda;
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  }

  // Helper method to derive campaign PDA
  private async deriveCampaignPda(campaignName: string): Promise<PublicKey> {
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), Buffer.from(campaignName)],
      this.program.programId
    );
    return campaignPda;
  }

  // Helper method to get Associated Token Account address
  private async getAssociatedTokenAddress(
    mint: PublicKey,
    owner: PublicKey
  ): Promise<PublicKey> {
    return await PublicKey.findProgramAddress(
      [
        owner.toBuffer(),
        new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(),
        mint.toBuffer(),
      ],
      new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
    ).then(([address]) => address);
  }

  async buyToken(
    amount: number,
    campaignPda: PublicKey,
    mintQuote: PublicKey,
    userQuoteAta: PublicKey
  ) {
    const [receiptPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("receipt"),
        this.provider.wallet.publicKey.toBuffer(),
        campaignPda.toBuffer(),
      ],
      this.program.programId
    );

    const [vaultQuotePda] = PublicKey.findProgramAddressSync(
      [campaignPda.toBuffer(), Buffer.from("vault"), mintQuote.toBuffer()],
      this.program.programId
    );

    return await this.program.methods
      .buyToken(new BN(amount), 0) // receiptBump will be calculated by the program
      .accounts({
        user: this.provider.wallet.publicKey,
        mintQuote,
        campaign: campaignPda,
        vaultQuote: vaultQuotePda,
        receipt: receiptPda,
        userQuoteAta,
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
  }

  async claimEarnings(
    amount: number,
    campaignPda: PublicKey,
    mintPlayer: PublicKey,
    mintQuote: PublicKey,
    userPlayerTokenAccount: PublicKey,
    userQuoteTokenAccount: PublicKey
  ) {
    const [earningsPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("earnings"), campaignPda.toBuffer()],
      this.program.programId
    );

    const [vaultQuotePda] = PublicKey.findProgramAddressSync(
      [earningsPda.toBuffer(), Buffer.from("vault"), mintQuote.toBuffer()],
      this.program.programId
    );

    return await this.program.methods
      .claimEarnings(new BN(amount))
      .accounts({
        user: this.provider.wallet.publicKey,
        mintPlayer,
        mintQuote,
        campaign: campaignPda,
        userPlayerTokenAccount,
        userQuoteTokenAccount,
        earnings: earningsPda,
        vaultQuote: vaultQuotePda,
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
  }

  async redeemToken(
    campaignPda: PublicKey,
    mintPlayer: PublicKey,
    userTokenAccount: PublicKey
  ) {
    const [receiptPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("receipt"),
        this.provider.wallet.publicKey.toBuffer(),
        campaignPda.toBuffer(),
      ],
      this.program.programId
    );

    return await this.program.methods
      .redeemToken()
      .accounts({
        user: this.provider.wallet.publicKey,
        mintPlayer,
        campaign: campaignPda,
        userTokenAccount,
        receipt: receiptPda,
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
  }

  // Institution Methods
  async initInstitution(
    image: string,
    name: string,
    description: string,
    contract: string,
    newInstitutionAuthority: PublicKey
  ) {
    const [institutionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("institution"), Buffer.from(name)],
      this.program.programId
    );

    console.log("Institution PDA:", institutionPda.toString());
    console.log("New Authority:", newInstitutionAuthority.toString());

    console.log("Creating institution with params:", {
      contract,
      name,
      newInstitutionAuthority: newInstitutionAuthority.toString(),
      institutionAuthority: this.provider.wallet.publicKey.toString(),
      config: this.deriveConfigPDA(this.program.programId).toString(),
      programId: this.program.programId.toString(),
      institutionPda: institutionPda.toString(),
    });

    return await this.program.methods
      .initInstitution(name, contract, image, description)
      .accounts({
        institutionAuthority: this.provider.wallet.publicKey,
        institution: institutionPda,
        newInstitutionAuthority,
        config: this.deriveConfigPDA(this.program.programId),
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  async getInstituttions() {
    return await this.program.account.institution.all();
  }

  async disableInstitution(institutionName: string) {
    const [institutionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("institution"), Buffer.from(institutionName)],
      this.program.programId
    );

    return await this.program.methods
      .disableInstitution()
      .accounts({
        institutionAuthority: this.provider.wallet.publicKey,
        institution: institutionPda,
      })
      .rpc();
  }

  // Config Methods
  async setFee(feePre: number, feePos: number) {
    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    );

    return await this.program.methods
      .setFee(new BN(feePre), new BN(feePos))
      .accounts({
        authority: this.provider.wallet.publicKey,
        config: configPda,
      })
      .rpc();
  }

  async pauseCampaign() {
    return await this.program.methods.pauseCampaign().rpc();
  }

  async finishCampaign() {
    return await this.program.methods.finishCampaign().rpc();
  }

  // Fetch Methods
  async getCampaign(campaignPda: PublicKey) {
    return await this.program.account.campaign.fetch(campaignPda);
  }

  async getInstitution(institutionPda: PublicKey) {
    return await this.program.account.institution.fetch(institutionPda);
  }

  async getConfig() {
    const configPda = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    )[0];
    return await this.program.account.config.fetch(configPda);
  }

  async getEarnings(earningsPda: PublicKey) {
    return await this.program.account.earnings.fetch(earningsPda);
  }

  async getReceipt(receiptPda: PublicKey) {
    return await this.program.account.receipt.fetch(receiptPda);
  }
}
