export default interface Campaign {
  publicKey: string;
  account: {
    name: string;
    owner: string;
    contract: string;
    ratio: number;
    target: number;
    initialDate: number;
    dueDate: number;
    totalValue: number;
    currentTokens: number;
    currentFees: number;
    status: string;
    institutionName: string;
    image: string;
    authority: string;
    description: string;
  };
}
