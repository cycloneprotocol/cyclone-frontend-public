const Config = {
  rpcURL: 'https://node.cyclone.xyz:443',
  infuraId: 'e439a932051141d994361216bd76c838',
  backendServiceURL: 'https://cyclone-backend-server.herokuapp.com/',
  // backendServiceURL: 'http://localhost:3001/',
  iotexRpcURL: 'https://api.iotex.one:443',
  analyticsURL: 'https://analytics.cyclone.xyz/query',
  analyticsBscURL: 'https://analytics-bsc.cyclone.xyz/query',
  analyticsETHURL: 'https://analytics-eth.cyclone.xyz/query',

  merkleTreeHeight: 20,
  version: 'v1.0',
  donations: {
    address: 'io1sakkyd90hujz8qdtn9g5s33rh5u78ca5hvwrnl'
  },
  baseURL: 'https://cyclone.xyz',
  // ipAPI: "http://api.ipstack.com/check?access_key=c3e6ba7f3caf08fb34d8fc5c05bc58f7&fields=ip",
  defaultAccount: 'io18klsywn05cncek6892uuuq0hhyacqrsh0ep575',
  ipAPI: 'https://freegeoip.app/json/',
  GeoAPI: 'http://api.ipstack.com/{ip}?access_key=c3e6ba7f3caf08fb34d8fc5c05bc58f7',
  intervalForContract: 180000,
  relayer: 'https://relayer.cyclone.xyz',
  assetURL: '',
  retry: 10,
  mimoExchange: {
    address: 'io1z2wmt6y74ctc9l4y4ly73gkynp0p4haj2d326m',
    abi: 'contracts/MimoExchange.json'
  },
  Aeolus: {
    address: 'io1j2rwjfcm7jt7cwdnlkh0203chlrtfnc59424xc',
    abi: 'contracts/Aeolus.json'
  },
  LPToken: {
    address: 'io1z2wmt6y74ctc9l4y4ly73gkynp0p4haj2d326m',
    abi: 'contracts/XRC20.json',
    decimals: 18
  },
  CYCToken: {
    address: 'io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh',
    tokenName: 'CYC',
    abi: 'contracts/XRC20.json',
    decimals: 18,
    bsc_address: '0x810ee35443639348adbbc467b33310d2ab43c168'
  },
  tokens: [
    {
      name: 'IOTX',
      decimals: 18,
      networkID: 1,
      address: '',
      abi: 'contracts/XRC20.json',
      amountSteps: [
        {
          set: 'Pool 1- Squid',
          poolId: 3,
          address: 'io15w9kwskwl9tn7luhcwrj0rarzjp988pafg07uf',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Pool 2- Dolphin',
          poolId: 4,
          address: 'io1wcd67wk36e3r8eku8scv7g7azsfnqs7z3e38xg',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Pool 3- Shark',
          poolId: 5,
          address: 'io1v667xgkux8uv0gell53ew5tr090c69k85deezn',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Pool 4- Whale',
          poolId: 6,
          address: 'io1wnaks7kectrkxk5v4d7mh97jkqjl4p0690jxfx',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Early Sparrow',
          poolId: 0,
          deprecated: true,
          address: 'io1rqm2keejw4jypgl0w6hr96r054ns63u0hqrfuy',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Early Raven',
          poolId: 1,
          deprecated: true,
          address: 'io1gkeeljp4grwskgq3tl2xqglqy546nhhmytnqqp',
          abi: 'contracts/IOTXCyclone.json'
        },
        {
          set: 'Early Eagle',
          poolId: 2,
          deprecated: true,
          address: 'io1mlcgsv4ma0t6gffpxg2gva3lwqnlj5msradxk6',
          abi: 'contracts/IOTXCyclone.json'
        }
      ]
    }
    // {
    //   name: 'VITA',
    //   decimals: 18,
    //   networkID: 1,
    //   address: 'io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw',
    //   abi: 'contracts/XRC20.json',
    //   amountSteps: [
    //     {
    //       amount: 1,
    //       amoutnValue: '1000000000000000000',
    //       set: 'Pool 1 - 1 VITA',
    //       address: 'io1r73g576mz9l8fruytar07dack8mqe93zafnl9e',
    //       abi: require('./contracts/IOTXCyclone.json'),
    //     },
    //     {
    //       amount: 2,
    //       amoutnValue: '200000000000000000000',
    //       set: 'Pool 2 - 2 VITA',
    //       address: '',
    //       abi: '',
    //     },
    //     {
    //       amount: 3,
    //       amoutnValue: '300000000000000000000',
    //       set: 'Pool 3 - 3 VITA',
    //       address: '',
    //       abi: '',
    //     },
    //   ],
    // },
  ]
};

export default Config;
