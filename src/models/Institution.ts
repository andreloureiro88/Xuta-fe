export default interface Institution {
  publicKey: string;
  account: {
    name: string;
    description: string;
    image: string;
    contract: string;
    authority: string;
    isActive: boolean;
  };
}
