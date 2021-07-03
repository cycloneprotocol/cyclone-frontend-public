const BscConfig = {
  defaultChainID: 3,
  infuraId: 'e439a932051141d994361216bd76c838',
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
    '97': {
      tokens: [
        {
          name: 'BNB',
          decimals: 18,
          networkID: 97,
          amountSteps: [
            {
              set: 'Pool 1 - 0.001BNB',
              address: '0xe2ce5272C4661D1617326d4AAc6CBe07D160dd18',
              abi: 'contracts/CoinCyclone.json',
              deployedBlock: 0
            }
          ]
        }
      ],
      relayer: 'https://minttoken.herokuapp.com',
      mimoExchange: {
        address: '0x7b90a9598F10D8cB5728f2d674D1D68b080FcEdE',
        abi: 'contracts/MimoExchange.json'
      },
      Aeolus: {
        address: '0x967215c0845d71818400A829ab9042Ae1DE43265',
        abi: 'contracts/Aeolus.json'
      },
      LPToken: {
        address: '0x15e9aa23A6AcC5caa1d1Dc3e3ad355CA7A001d3a',
        abi: 'contracts/XRC20.json',
        decimals: 18
      },
      CYCToken: {
        address: '0x15e9aa23A6AcC5caa1d1Dc3e3ad355CA7A001d3a',
        abi: 'contracts/XRC20.json',
        decimals: 18
      }
    }
  }
};

export default BscConfig;
