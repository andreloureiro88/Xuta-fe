export default interface Campaign {
  name: string;
  owner: string;
  contract: string;
  ratio: number;
  target: number;
  intialDate: number;
  dueDate: number;
  totalValue: number;
  currentTokens: number;
  currentFees: number;
  status: string;
}
