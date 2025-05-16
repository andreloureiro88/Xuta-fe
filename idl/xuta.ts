/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/xuta_sc.json`.
 */
export type XutaSc = {
  address: "XUTAAsrE6AGc3xzvKtz6VNab6QuwVx41MD7HB7K5zVa";
  metadata: {
    name: "xutaSc";
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
                account: "campaign";
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
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "campaign";
              }
            ];
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
                account: "campaign";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                path: "mintQuote";
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
          writable: true;
          signer: true;
        },
        {
          name: "mintQuote";
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
                path: "mintPlayer";
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
                kind: "const";
                value: [118, 97, 117, 108, 116];
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
          name: "description";
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
                account: "institution";
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
          name: "mintQuote";
        },
        {
          name: "userTokenAccountQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                account: "campaign";
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
                account: "institution";
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
      name: "finishEarnings";
      discriminator: [94, 228, 154, 220, 30, 231, 21, 243];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "mintQuote";
          writable: true;
          relations: ["campaign"];
        },
        {
          name: "userTokenAccountQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                account: "campaign";
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
                path: "mintQuote";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                path: "mintPlayer";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
          name: "ratio";
          type: "u16";
        }
      ];
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
        },
        {
          name: "image";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        }
      ];
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
                account: "campaign";
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
                account: "campaign";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
                account: "campaign";
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mintQuote";
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
          name: "newAuthority";
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
          name: "feePre";
          type: "u16";
        },
        {
          name: "feePos";
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
    }
  ];
  accounts: [
    {
      name: "campaign";
      discriminator: [50, 40, 49, 11, 157, 220, 229, 192];
    },
    {
      name: "config";
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130];
    },
    {
      name: "earnings";
      discriminator: [91, 138, 17, 199, 164, 111, 222, 232];
    },
    {
      name: "institution";
      discriminator: [178, 67, 44, 135, 26, 236, 199, 188];
    },
    {
      name: "receipt";
      discriminator: [39, 154, 73, 106, 80, 102, 145, 153];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "Unauthorized Access";
    },
    {
      code: 6001;
      name: "invalidVault";
      msg: "Vault invalid";
    },
    {
      code: 6002;
      name: "campaignNotActive";
      msg: "Campaign is not Active";
    },
    {
      code: 6003;
      name: "campaignNotStarted";
      msg: "Campaign didn't start yet";
    },
    {
      code: 6004;
      name: "campaignEnded";
      msg: "Campaign already ended";
    },
    {
      code: 6005;
      name: "invalidRatioOrAmount";
      msg: "Invalid amount or ratio";
    },
    {
      code: 6006;
      name: "feeError";
      msg: "Fee Campaign parameter error";
    },
    {
      code: 6007;
      name: "mathError";
      msg: "Error performing math operation";
    },
    {
      code: 6008;
      name: "noReceiptAmount";
      msg: "Receipt has no value";
    },
    {
      code: 6009;
      name: "campaignNotOpenForRefund";
      msg: "Campaign is not open for refund";
    },
    {
      code: 6010;
      name: "insuficientFunds";
      msg: "Vault has insufcient funds";
    },
    {
      code: 6011;
      name: "invalidTokenAmount";
      msg: "Invalid Token amount to mint";
    },
    {
      code: 6012;
      name: "institutionHasActiveCampaigns";
      msg: "Institution has active campaigns";
    },
    {
      code: 6013;
      name: "institutionDisabled";
      msg: "Institution is disabled";
    },
    {
      code: 6014;
      name: "invalidFeeValue";
      msg: "Invalid fee value";
    },
    {
      code: 6015;
      name: "earningsNotActive";
      msg: "Earnings not active";
    }
  ];
  types: [
    {
      name: "campaign";
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
            name: "description";
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
                name: "campaignStatus";
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
      name: "campaignStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "active";
          },
          {
            name: "paused";
          },
          {
            name: "successful";
          },
          {
            name: "failed";
          },
          {
            name: "finalized";
          },
          {
            name: "canceled";
          }
        ];
      };
    },
    {
      name: "config";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "institutionAuthority";
            type: "pubkey";
          },
          {
            name: "feePre";
            type: "u16";
          },
          {
            name: "feePos";
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
      name: "earnings";
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
                name: "campaignStatus";
              };
            };
          },
          {
            name: "earningsRatio";
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
      name: "institution";
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
            name: "description";
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
            name: "disabled";
            type: "bool";
          },
          {
            name: "hasActiveCampaigns";
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
      name: "receipt";
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
            name: "tokenAmount";
            type: "u64";
          },
          {
            name: "feeAmount";
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
