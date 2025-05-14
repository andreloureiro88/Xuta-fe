import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { IDL } from "../idl/xuta";
import { BN } from "bn.js";

export class XutaService {
  private program: Program<typeof IDL>;
  private provider: AnchorProvider;

  constructor(
    connection: Connection,
    provider: AnchorProvider,
    programId: PublicKey
  ) {
    this.provider = provider;
    this.program = new Program(IDL, programId, provider);
  }

  // Campaign Methods
  async createCampaign(
    name: string,
    contract: string,
    image: string,
    ratio: number,
    targetAmount: number,
    initialDate: number,
    dueDate: number,
    mintPlayer: PublicKey,
    mintQuote: PublicKey
  ) {
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), mintPlayer.toBuffer()],
      this.program.programId
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [campaignPda.toBuffer(), Buffer.from("vault"), mintQuote.toBuffer()],
      this.program.programId
    );

    return await this.program.methods
      .createCampaign(
        name,
        contract,
        image,
        new BN(ratio),
        new BN(targetAmount),
        new BN(initialDate),
        new BN(dueDate)
      )
      .accounts({
        authority: this.provider.wallet.publicKey,
        mintPlayer,
        mintQuote,
        campaign: campaignPda,
        vault: vaultPda,
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
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
    name: string,
    contract: string,
    newInstitutionAuthority: PublicKey
  ) {
    const [institutionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("institution"), Buffer.from(name)],
      this.program.programId
    );

    return await this.program.methods
      .initInstitution(name, contract)
      .accounts({
        institutionAuthority: this.provider.wallet.publicKey,
        institution: institutionPda,
        newInstitutionAuthority,
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc();
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

  // Campaign Status Methods
  async startCampaign(campaignName: string) {
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), Buffer.from(campaignName)],
      this.program.programId
    );

    return await this.program.methods
      .startCampaign()
      .accounts({
        owner: this.provider.wallet.publicKey,
        campaign: campaignPda,
        systemProgram: new PublicKey("11111111111111111111111111111111"),
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
    return await this.program.account.Campaign.fetch(campaignPda);
  }

  async getInstitution(institutionPda: PublicKey) {
    return await this.program.account.Institution.fetch(institutionPda);
  }

  async getConfig() {
    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    );
    return await this.program.account.Config.fetch(configPda);
  }

  async getEarnings(earningsPda: PublicKey) {
    return await this.program.account.Earnings.fetch(earningsPda);
  }

  async getReceipt(receiptPda: PublicKey) {
    return await this.program.account.Receipt.fetch(receiptPda);
  }
}
