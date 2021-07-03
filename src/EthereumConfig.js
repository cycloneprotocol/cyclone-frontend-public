const EthereumConfig = {
  defaultChainID: 56,
  allowChains: {
    bsc: [56, 97]
  },
  infuraId: 'e439a932051141d994361216bd76c838',
  defaultAccount: '',
  relayerFee: 50,
  tokensOnEthereum: {
    '1': {
      tokens: [
        {
          name: 'USDT',
          decimals: 18,
          networkID: 1,
          amountSteps: [
            {
              set: 'Pool 1 - Squid',
              address: '0xf86520e8559ff8807ecfa5674f69f3725c25AA34',
              abi: 'contracts/IOTXCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'https://relayer.cyclone.xyz',
      mimoExchange: {
        address: '0x2c0bb55354662428cDa7aF0ed46feD0F65207dfd',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0xcDECE2dA5c7075DabcBD3Da97Fd0a88e576EfB26',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0x2c0bb55354662428cDa7aF0ed46feD0F65207dfd',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0xED469521A61d9F31791D2D29Deae259d7BDe0268',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      uniswapURL: 'https://app.uniswap.org/#/add/ETH/'
    },
    '3': {
      tokens: [
        {
          name: 'ETH',
          decimals: 18,
          networkID: 3,
          amountSteps: [
            {
              set: 'Pool 1 - 0.001ETH',
              address: '0x822d83048Ce267F08c5b459A49656357E726BAc0',
              abi: 'contracts/CoinCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'https://minttoken.herokuapp.com',
      mimoExchange: {
        address: '0x6e664E4e4F6A917FC0C729822ca16db972cB322A',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x4D8EE90Baa6b682AFD3F90fe83bA519De81c1Af4',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0x6e664E4e4F6A917FC0C729822ca16db972cB322A',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0x7d1005419fcEde49bc178BB9904eC3A2Cf214155',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      uniswapURL: 'https://app.uniswap.org/#/add/ETH/',
      uniswapFactory: {
        address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
        abi: 'contracts/uniswapFactory.json'
      },
      uniswapPair: {
        address: '0x71f9341dd12e7ae94fb35fe8751c8faf26d4d8cf',
        abi: 'contracts/uniswapPairV2.json'
      }
    },
    '23': {
      tokens: [
        {
          name: 'ETH',
          decimals: 18,
          networkID: 23,
          amountSteps: [
            {
              set: 'Pool 1 - 0.001ETH',
              address: '0xD1f71A26A0cEB55d8d86D9272E88fB71f6e9272e',
              abi: 'contracts/CoinCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'http://127.0.0.1:8000/',
      mimoExchange: {
        address: '0x2c0bb55354662428cDa7aF0ed46feD0F65207dfd',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0xcDECE2dA5c7075DabcBD3Da97Fd0a88e576EfB26',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0x2c0bb55354662428cDa7aF0ed46feD0F65207dfd',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0xED469521A61d9F31791D2D29Deae259d7BDe0268',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      uniswapURL: 'https://app.uniswap.org/#/add/ETH/'
    },
    '42': {
      tokens: [
        {
          name: 'ETH',
          decimals: 18,
          networkID: 42,
          amountSteps: [
            {
              set: 'Pool 1 - 0.001ETH',
              address: '0x1961D064a122b4440e0CcD0c1A9bbAb332c39503',
              abi: 'contracts/CoinCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'https://minttoken.herokuapp.com',
      mimoExchange: {
        address: '0x85e1ef8E4ae1D7151e559227089f9646b453081f',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x7b90a9598F10D8cB5728f2d674D1D68b080FcEdE',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0x795B691Ac1E800c2ba6d252851A70B7eb58F01D7',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0x795B691Ac1E800c2ba6d252851A70B7eb58F01D7',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      uniswapURL: 'https://app.uniswap.org/#/add/ETH/',
      uniswapFactory: {
        address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
        abi: 'contracts/uniswapFactory.json'
      },
      uniswapPair: {
        address: '0xba077Ce51Bc11f9a79F041AA006843E08e72E310',
        abi: 'contracts/uniswapPairV2.json'
      }
    },
    '256': {
      tokens: [
        {
          name: 'HT',
          decimals: 18,
          networkID: 256,
          amountSteps: [
            {
              set: 'Pool 1 - 0.001HT',
              address: '0x01EF362a97dD62591fF0F7867b3463d77797E5C4',
              abi: 'contracts/CoinCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'https://minttoken.herokuapp.com',
      mimoExchange: {
        address: '0x2970e02D33549B59c09282806A8cB62b7F9a888F',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x4250bA35DB82Fcd218b68AA58A1e1a1a585c41ce',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0xCb37143abd9D58D94Df9FE41639c50838C87CE78',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0xCb37143abd9D58D94Df9FE41639c50838C87CE78',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      uniswapURL: 'https://ht.mdex.com/#/add/HT/',
      uniswapPair: {
        address: '0xed7d5f38c79115ca12fe6c0041abb22f0a06c300',
        abi: 'contracts/uniswapPairV2.json'
      }
    },
    '56': {
      rpcUrl: 'https://bsc-dataseed.binance.org',
      explorerURL: 'https://bscscan.com/',
      APIURL: 'https://analytics-bsc.cyclone.xyz/query',
      coin: {
        symbol: 'BNB',
        decimals: 18
      },
      pools: {
        // "7": {
        //   id: 7,
        //   set: 'Pool Arduino - BUSD',
        //   address: '0x56b94edf88baf45248cc103881b3d1a977d664d4',
        //   abi: 'contracts/CycloneV2.json',
        //   deployedBlock: 5625246,
        //   symbol: "BUSD",
        //   decimals: 18,
        //   XRCToken: {
        //     address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        //     abi: 'contracts/XRC20.json',
        //     decimals: 18,
        //     symbol: "BUSD"
        //   },
        //   UniswapV2CycloneRouter: {
        //     address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
        //     abi: 'contracts/UniswapV2CycloneRouter.json'
        //   }
        // },
        '8': {
          id: 8,
          set: 'R2D2 - BUSD - 10000',
          address: '0xbe19d541389c9d3e03efc08f3d5008e8c9cc42a5',
          abi: 'contracts/CycloneV2.json',
          deployedBlock: 0,
          symbol: 'BUSD',
          decimals: 18,
          XRCToken: {
            address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            abi: 'contracts/XRC20.json',
            decimals: 18,
            symbol: 'BUSD'
          },
          UniswapV2CycloneRouter: {
            address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        },
        '9': {
          id: 9,
          set: 'BB8 - IOTX - 25000',
          address: '0x79459751f6882868d1299bfa412428488b434541',
          abi: 'contracts/CycloneV2.json',
          deployedBlock: 0,
          symbol: 'IOTX',
          decimals: 18,
          XRCToken: {
            address: '0x9678e42cebeb63f23197d726b29b1cb20d0064e5',
            abi: 'contracts/XRC20.json',
            decimals: 18,
            symbol: 'IOTX'
          },
          UniswapV2CycloneRouter: {
            address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        },
        '10': {
          id: 10,
          set: 'C3PO - BNB - 100',
          address: '0x66b5e322dc31f8c7a33ffd23975163795f8d16c7',
          abi: 'contracts/CycloneV2.json',
          deployedBlock: 0,
          symbol: 'BNB',
          decimals: 18,
          UniswapV2CycloneRouter: {
            address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        },
        '11': {
          id: 11,
          set: 'Johnny5 - CYC - 3',
          address: '0xd90a6bf8439ef7214cf00da83e926068b6a507ec',
          abi: 'contracts/CycloneV2.json',
          deployedBlock: 0,
          symbol: 'BNB',
          decimals: 18,
          relayerFee: 30,
          UniswapV2CycloneRouter: {
            address: '0x3da4f2297922ccf5b21882bc15ec88011afafbe1',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        }
      },
      relayer: 'https://bsc-relayer1.cyclone.xyz',
      mimoExchange: {
        address: '0x283dB273b5Ba248F14dF87C9165399d04E5fC046',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x567da514637cfd7f9e1f185ae4aa163b3ebb5363',
        abi: 'contracts/AeolusV2.json'
      },
      LPToken: {
        address: '0x9634cfd96f1499990695ebbc081b4ee8d63d2e12',
        abi: 'contracts/pancakePair.json',
        decimals: 18
      },
      CYCToken: {
        address: '0x810ee35443639348adbbc467b33310d2ab43c168',
        abi: 'contracts/XRC20.json',
        decimals: 18,
        buy: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x810ee35443639348adbbc467b33310d2ab43c168'
      }
    },
    '97': {
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      explorerURL: 'https://testnet.bscscan.com/',
      APIURL: 'https://analytics-test.cyclone.xyz/query',
      coin: {
        symbol: 'BNB',
        decimals: 18
      },
      pools: {
        '100': {
          id: 100,
          set: 'Pool 1 - BUSD',
          address: '0x36b078405bD821392fb2A7008b582f3DBE82e139',
          abi: 'contracts/CycloneV2.json',
          deployedBlock: 0,
          symbol: 'BUSD',
          decimals: 18,
          XRCToken: {
            address: '0x96F15F0C24167015f3A87314b92e11F77b48179B',
            abi: 'contracts/XRC20.json',
            decimals: 18,
            symbol: 'BUSD'
          },
          UniswapV2CycloneRouter: {
            address: '0xfe77057dc9c89e553ddeafa1bd2ca35e18712c96',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        },
        '101': {
          id: 101,
          set: 'Pool 2 - BNB',
          address: '0x0B3e3884235E6Dc21AD430320515ca63869877Af',
          abi: 'contracts/CycloneV2.json',
          symbol: 'BNB',
          decimals: 18,
          deployedBlock: 0,
          UniswapV2CycloneRouter: {
            address: '0xfe77057dc9c89e553ddeafa1bd2ca35e18712c96',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        },
        '102': {
          id: 102,
          set: 'Pool 3 - CYC',
          address: '0x7C994FB3a8C208C1750Df937d473040c604292D6',
          abi: 'contracts/CycloneV2.json',
          symbol: 'CYC',
          decimals: 18,
          deployedBlock: 0,
          relayerFee: 30,
          UniswapV2CycloneRouter: {
            address: '0xfe77057dc9c89e553ddeafa1bd2ca35e18712c96',
            abi: 'contracts/UniswapV2CycloneRouter.json'
          }
        }
      },
      relayer: 'https://minttoken.herokuapp.com',
      mimoExchange: {
        address: '0x283dB273b5Ba248F14dF87C9165399d04E5fC046',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x01b364494c49ec9d5095b6331255a93f505876c7',
        abi: 'contracts/AeolusV2.json'
      },
      LPToken: {
        address: '0x0A3D64E93C2aE3AC4166B5d0C054D2E3B71aD926',
        abi: 'contracts/pancakePair.json',
        decimals: 18
      },
      CYCToken: {
        address: '0x451A0fcD5615E54d27780757FB1F5006df346e60',
        abi: 'contracts/XRC20.json',
        decimals: 18,
        buy: 'https://www.google.com'
      }
    }
  }
};

export default EthereumConfig;
