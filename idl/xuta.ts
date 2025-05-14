/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/xuta_sc.json`.
 */
export type Xuta = {
  address: "6aW21UtZF5HyCPX4cHPREw8CFKBenRXAM6GdutMoXgRM";
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
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mintQuote";
          relations: ["campaign"];
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
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "vaultQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "campaign";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "receipt";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 99, 101, 105, 112, 116];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
          };
        },
        {
          name: "userQuoteAta";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "receiptBump";
          type: "u8";
        }
      ];
    },
    {
      name: "claimEarnings";
      discriminator: [49, 99, 161, 170, 22, 233, 54, 140];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mintPlayer";
          writable: true;
          relations: ["campaign"];
        },
        {
          name: "mintQuote";
          writable: true;
          relations: ["campaign"];
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
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        },
        {
          name: "userPlayerTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_player";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "userQuoteTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "earnings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 97, 114, 110, 105, 110, 103, 115];
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
          };
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "vaultQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "earnings";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "createCampaign";
      discriminator: [111, 131, 187, 98, 160, 193, 114, 244];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["institution"];
        },
        {
          name: "mintPlayer";
          relations: ["campaign"];
        },
        {
          name: "mintQuote";
          relations: ["campaign"];
        },
        {
          name: "ownerTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
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
                kind: "account";
                path: "mint_player";
              }
            ];
          };
        },
        {
          name: "institution";
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "campaign";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "contract";
          type: "string";
        },
        {
          name: "image";
          type: "string";
        },
        {
          name: "ratio";
          type: "u16";
        },
        {
          name: "targetAmount";
          type: "u64";
        },
        {
          name: "initialDate";
          type: "i64";
        },
        {
          name: "dueDate";
          type: "i64";
        }
      ];
    },
    {
      name: "disableInstitution";
      discriminator: [44, 52, 46, 233, 246, 154, 13, 63];
      accounts: [
        {
          name: "institutionAuthority";
          writable: true;
          signer: true;
          relations: ["config"];
        },
        {
          name: "institution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 115, 116, 105, 116, 117, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "institution.name";
                account: "Institution";
              }
            ];
          };
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: "finishCampaign";
      discriminator: [7, 74, 248, 240, 240, 182, 147, 115];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["campaign"];
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
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        },
        {
          name: "institution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 115, 116, 105, 116, 117, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "institution.name";
                account: "Institution";
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: "init";
      discriminator: [220, 59, 207, 236, 108, 250, 47, 100];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
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
      name: "initEarnings";
      discriminator: [99, 244, 155, 203, 150, 119, 111, 251];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["institution"];
        },
        {
          name: "mintPlayer";
          relations: ["campaign"];
        },
        {
          name: "mintQuote";
          relations: ["campaign"];
        },
        {
          name: "ownerQuoteAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
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
                kind: "account";
                path: "mint_player";
              }
            ];
          };
        },
        {
          name: "earnings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [69, 97, 114, 110, 105, 110, 103, 115];
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
          };
        },
        {
          name: "institution";
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "vaultQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "campaign";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initInstitution";
      discriminator: [30, 36, 45, 134, 204, 23, 230, 212];
      accounts: [
        {
          name: "institutionAuthority";
          writable: true;
          signer: true;
          relations: ["config"];
        },
        {
          name: "institution";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 115, 116, 105, 116, 117, 116, 105, 111, 110];
              },
              {
                kind: "arg";
                path: "name";
              }
            ];
          };
        },
        {
          name: "newInstitutionAuthority";
          writable: true;
        },
        {
          name: "config";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "contract";
          type: "string";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
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
      name: "pauseCampaign";
      discriminator: [62, 247, 54, 192, 240, 158, 8, 161];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["campaign"];
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
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: "redeemToken";
      discriminator: [190, 85, 90, 176, 192, 218, 41, 214];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mintPlayer";
          writable: true;
          relations: ["campaign"];
        },
        {
          name: "campaign";
          docs: [
            "The campaign state PDA, storing conversion ratio and configuration."
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 109, 112, 97, 105, 103, 110];
              },
              {
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        },
        {
          name: "userTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintPlayer";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "receipt";
          docs: ["The mint of the custom receipt token."];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 99, 101, 105, 112, 116];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "refundReceipt";
      discriminator: [185, 54, 110, 2, 162, 27, 187, 111];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mintQuote";
          relations: ["campaign"];
        },
        {
          name: "userTokenAccountQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "campaign";
          docs: [
            "The campaign state PDA, storing conversion ratio and configuration."
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 109, 112, 97, 105, 103, 110];
              },
              {
                kind: "account";
                path: "campaign.mint_player";
                account: "Campaign";
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "campaign";
              },
              {
                kind: "account";
                path: "token_program";
              },
              {
                kind: "account";
                path: "mint_quote";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "receipt";
          docs: ["The mint of the custom receipt token."];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 99, 101, 105, 112, 116];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "setAuthority";
      discriminator: [133, 250, 37, 21, 110, 163, 26, 121];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["config"];
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "new_authority";
        }
      ];
      args: [];
    },
    {
      name: "setFee";
      discriminator: [18, 154, 24, 18, 237, 214, 19, 80];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["config"];
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "fee_pre";
          type: "u16";
        },
        {
          name: "fee_pos";
          type: "u16";
        }
      ];
    },
    {
      name: "setInstitutionsAuthority";
      discriminator: [31, 21, 46, 95, 99, 218, 195, 122];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["config"];
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "newInstitutionAuthority";
        }
      ];
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
          name: "system_program";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "Campaign";
      discriminator: [50, 40, 49, 11, 157, 220, 229, 192];
    },
    {
      name: "Config";
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130];
    },
    {
      name: "Earnings";
      discriminator: [91, 138, 17, 199, 164, 111, 222, 232];
    },
    {
      name: "Institution";
      discriminator: [178, 67, 44, 135, 26, 236, 199, 188];
    },
    {
      name: "Receipt";
      discriminator: [39, 154, 73, 106, 80, 102, 145, 153];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "Unauthorized";
      msg: "Unauthorized Access";
    },
    {
      code: 6001;
      name: "InvalidVault";
      msg: "Vault invalid";
    },
    {
      code: 6002;
      name: "CampaignNotActive";
      msg: "Campaign is not Active";
    },
    {
      code: 6003;
      name: "CampaignNotStarted";
      msg: "Campaign didn't start yet";
    },
    {
      code: 6004;
      name: "CampaignEnded";
      msg: "Campaign already ended";
    },
    {
      code: 6005;
      name: "InvalidRatioOrAmount";
      msg: "Invalid amount or ratio";
    },
    {
      code: 6006;
      name: "FeeError";
      msg: "Fee Campaign parameter error";
    },
    {
      code: 6007;
      name: "MathError";
      msg: "Error performing math operation";
    },
    {
      code: 6008;
      name: "NoReceiptAmount";
      msg: "Receipt has no value";
    },
    {
      code: 6009;
      name: "CampaignNotOpenForRefund";
      msg: "Campaign is not open for refund";
    },
    {
      code: 6010;
      name: "InsuficientFunds";
      msg: "Vault has insufcient funds";
    },
    {
      code: 6011;
      name: "InvalidTokenAmount";
      msg: "Invalid Token amount to mint";
    },
    {
      code: 6012;
      name: "InstitutionHasActiveCampaigns";
      msg: "Institution has active campaigns";
    },
    {
      code: 6013;
      name: "InstitutionDisabled";
      msg: "Institution is disabled";
    },
    {
      code: 6014;
      name: "InvalidFeeValue";
      msg: "Invalid fee value";
    },
    {
      code: 6015;
      name: "EarningsNotActive";
      msg: "Earnings not active";
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
            name: "name";
            type: "string";
          },
          {
            name: "contract";
            type: "string";
          },
          {
            name: "image";
            type: "string";
          },
          {
            name: "ratio";
            type: "u16";
          },
          {
            name: "vault";
            type: "pubkey";
          },
          {
            name: "mintPlayer";
            type: "pubkey";
          },
          {
            name: "mintQuote";
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
            name: "campaignBump";
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
    },
    {
      name: "Config";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "institution_authority";
            type: "pubkey";
          },
          {
            name: "fee_pre";
            type: "u16";
          },
          {
            name: "fee_pos";
            type: "u16";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "Earnings";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "campaign";
            type: "pubkey";
          },
          {
            name: "vault";
            type: "pubkey";
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
            name: "earnings_ratio";
            type: "u16";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "Institution";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
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
            name: "disabled";
            type: "bool";
          },
          {
            name: "has_active_campaigns";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "Receipt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "campaign";
            type: "pubkey";
          },
          {
            name: "token_amount";
            type: "u64";
          },
          {
            name: "fee_amount";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};
