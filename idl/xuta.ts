export type Xuta = {
  address: "9K9BEAMrDqauP8bDEHb19wuFZv5kCn8XjgeixWE7sf6K";
  metadata: {
    name: "xuta_sc";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "buyToken";
      discriminator: [138, 127, 14, 91, 38, 87, 115, 105];
      accounts: [];
      args: [];
    },
    {
      name: "claimEarnings";
      discriminator: [49, 99, 161, 170, 22, 233, 54, 140];
      accounts: [];
      args: [];
    },
    {
      name: "disableInstitution";
      discriminator: [44, 52, 46, 233, 246, 154, 13, 63];
      accounts: [];
      args: [];
    },
    {
      name: "finishCampaign";
      discriminator: [7, 74, 248, 240, 240, 182, 147, 115];
      accounts: [];
      args: [];
    },
    {
      name: "init";
      discriminator: [220, 59, 207, 236, 108, 250, 47, 100];
      accounts: [];
      args: [];
    },
    {
      name: "initEarnings";
      discriminator: [99, 244, 155, 203, 150, 119, 111, 251];
      accounts: [];
      args: [];
    },
    {
      name: "initInstitution";
      discriminator: [30, 36, 45, 134, 204, 23, 230, 212];
      accounts: [];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [];
      args: [];
    },
    {
      name: "pauseCampaign";
      discriminator: [62, 247, 54, 192, 240, 158, 8, 161];
      accounts: [];
      args: [];
    },
    {
      name: "setAuthority";
      discriminator: [133, 250, 37, 21, 110, 163, 26, 121];
      accounts: [];
      args: [];
    },
    {
      name: "setFee";
      discriminator: [18, 154, 24, 18, 237, 214, 19, 80];
      accounts: [];
      args: [];
    },
    {
      name: "setInstitutionsAuthority";
      discriminator: [31, 21, 46, 95, 99, 218, 195, 122];
      accounts: [];
      args: [];
    },
    {
      name: "startCampaign";
      discriminator: [229, 59, 6, 209, 253, 163, 39, 124];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "campaign";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 109, 112, 97, 105, 103, 110];
              },
              {
                kind: "arg";
                path: "name";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "submitContract";
      discriminator: [23, 252, 15, 12, 144, 226, 141, 185];
      accounts: [];
      args: [];
    }
  ];
  accounts: [
    {
      name: "Campaign";
      discriminator: [50, 40, 49, 11, 157, 220, 229, 192];
    }
  ];
  types: [
    {
      name: "Campaign";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "vault";
            type: "pubkey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "contract";
            type: "string";
          },
          {
            name: "ratio";
            type: "u16";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "targetAmount";
            type: "u64";
          },
          {
            name: "currentTokens";
            type: "u64";
          },
          {
            name: "currentFees";
            type: "u64";
          },
          {
            name: "initialDate";
            type: "i64";
          },
          {
            name: "dueDate";
            type: "i64";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "CampaignStatus";
              };
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "CampaignStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Active";
          },
          {
            name: "Paused";
          },
          {
            name: "Successful";
          },
          {
            name: "Failed";
          },
          {
            name: "Finalized";
          },
          {
            name: "Canceled";
          }
        ];
      };
    }
  ];
};
