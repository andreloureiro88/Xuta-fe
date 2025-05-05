import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, Program, BN, IdlTypes } from "@coral-xyz/anchor";
import idl from "../../idl/xuta_sc.json";
import type { Xuta } from "../../idl/xuta";

export const XUTA_PROGRAM_ID = new PublicKey(idl.address);
const RPC_ENDPOINT = "https://api.devnet.solana.com";

export function createXutaProvider(wallet: any): AnchorProvider {
  const connection = new Connection(RPC_ENDPOINT, "confirmed");
  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
}

export function getXutaProgram(provider: AnchorProvider): Program<Xuta> {
  return new Program<Xuta>(idl as unknown as IdlTypes<Xuta>, provider);
}

export class XutaService {
  constructor(private program: Program<Xuta>) {}

  private findCampaignPda(name: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), Buffer.from(name)],
      this.program.programId
    );
  }

  async getXutaCampaign(program: Program<Xuta>, campaignId: PublicKey) {
    return program.account.campaign?.fetch(campaignId);
  }
  async getXutaCampaigns(program: Program<Xuta>) {
    return program.account.campaign.all();
  }

  async init() {
    return this.program.methods.initialize().rpc();
  }

  async initEarnings() {
    return this.program.methods.initEarnings().rpc();
  }

  async initInstitution() {
    return this.program.methods.initInstitution().rpc();
  }

  async startCampaign(name: string) {
    const [campaign, bump] = this.findCampaignPda(name);
    return this.program.methods
      .startCampaign()
      .accountsStrict({
        owner: this.program.provider?.wallet?.publicKey,
        campaign,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  async buyToken() {
    return this.program.methods.buyToken().rpc();
  }

  async claimEarnings() {
    return this.program.methods.claimEarnings().rpc();
  }

  async pauseCampaign(campaign: PublicKey) {
    return this.program.methods.pauseCampaign().accounts({ campaign }).rpc();
  }

  async finishCampaign(campaign: PublicKey) {
    return this.program.methods.finishCampaign().accounts({ campaign }).rpc();
  }

  async disableInstitution() {
    return this.program.methods.disableInstitution().rpc();
  }

  async setAuthority(newAuthority: PublicKey) {
    return this.program.methods.setAuthority().rpc();
  }

  async setFee(newFee: number) {
    return this.program.methods.setFee().rpc();
  }

  async setInstitutionsAuthority(newAuth: PublicKey) {
    return this.program.methods.setInstitutionsAuthority().rpc();
  }

  async submitContract() {
    return this.program.methods.submitContract().rpc();
  }
}
