import { Observable } from 'graphql-typed-client-hotfix'

export interface Query {
  actions: ActionConnection
  airdropScore: Int
  luckyDrawTopN: (Action | null)[]
  price: Price
  total: Total
  tokensInPoolPerDay: (TokenInPool | null)[]
  totalPoolPerDay: (TimeValue | null)[]
  cycTokensPerDay: (TimeValue | null)[]
  totalTxVolumePerDay: (TimeValue | null)[]
  deposits: DepositConnection
  __typename: 'Query'
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export interface ActionConnection {
  actions: (Action | null)[]
  totalCount: Int64
  __typename: 'ActionConnection'
}

export interface Action {
  id: Int
  address: String
  hash: String
  method: String
  time: Int64
  __typename: 'Action'
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

export type Int64 = any

export interface Price {
  usd: Float
  __typename: 'Price'
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

export interface Total {
  totalSupply: Float
  iotx: Float
  fee: Float
  __typename: 'Total'
}

export interface TokenInPool {
  name: String
  values: (TimeValue | null)[]
  __typename: 'TokenInPool'
}

export interface TimeValue {
  timestamp: Int64
  value: String
  __typename: 'TimeValue'
}

export enum Deposit_orderBy {
  id = 'id',
  denomination = 'denomination',
  hash = 'hash',
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface DepositConnection {
  deposits: (Deposit | null)[]
  totalCount: Int64
  __typename: 'DepositConnection'
}

export interface Deposit {
  id: Int
  contract: String
  address: String
  hash: String
  commitment: String
  leafIndex: Int
  timestamp: Int64
  denomination: String
  __typename: 'Deposit'
}

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

export interface QueryRequest {
  actions?: [{ pagination: Pagination }, ActionConnectionRequest]
  airdropScore?: [{ address: String }]
  luckyDrawTopN?: [{ poolAddress: String; n: Int }, ActionRequest]
  price?: PriceRequest
  total?: TotalRequest
  tokensInPoolPerDay?: [{ count: Int }, TokenInPoolRequest]
  totalPoolPerDay?: [{ count: Int }, TimeValueRequest]
  cycTokensPerDay?: [{ count: Int }, TimeValueRequest]
  totalTxVolumePerDay?: [{ count: Int }, TimeValueRequest]
  deposits?:
    | [
        {
          first?: Int | null
          skip?: Int | null
          where?: Deposit_filter | null
          sort?: Deposit_orderBy | null
          orderDirection?: OrderDirection | null
        },
        DepositConnectionRequest,
      ]
    | DepositConnectionRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface Pagination {
  skip: Int
  first: Int
}

export interface ActionConnectionRequest {
  actions?: ActionRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionRequest {
  id?: boolean | number
  address?: boolean | number
  hash?: boolean | number
  method?: boolean | number
  time?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PriceRequest {
  usd?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TotalRequest {
  totalSupply?: boolean | number
  iotx?: boolean | number
  fee?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenInPoolRequest {
  name?: boolean | number
  values?: TimeValueRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TimeValueRequest {
  timestamp?: boolean | number
  value?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface Deposit_filter {
  contract?: String | null
  address?: String | null
}

export interface DepositConnectionRequest {
  deposits?: DepositRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface DepositRequest {
  id?: boolean | number
  contract?: boolean | number
  address?: boolean | number
  hash?: boolean | number
  commitment?: boolean | number
  leafIndex?: boolean | number
  timestamp?: boolean | number
  denomination?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const ActionConnection_possibleTypes = ['ActionConnection']
export const isActionConnection = (obj: { __typename: String }): obj is ActionConnection => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ActionConnection_possibleTypes.includes(obj.__typename)
}

const Action_possibleTypes = ['Action']
export const isAction = (obj: { __typename: String }): obj is Action => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Action_possibleTypes.includes(obj.__typename)
}

const Price_possibleTypes = ['Price']
export const isPrice = (obj: { __typename: String }): obj is Price => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Price_possibleTypes.includes(obj.__typename)
}

const Total_possibleTypes = ['Total']
export const isTotal = (obj: { __typename: String }): obj is Total => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Total_possibleTypes.includes(obj.__typename)
}

const TokenInPool_possibleTypes = ['TokenInPool']
export const isTokenInPool = (obj: { __typename: String }): obj is TokenInPool => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenInPool_possibleTypes.includes(obj.__typename)
}

const TimeValue_possibleTypes = ['TimeValue']
export const isTimeValue = (obj: { __typename: String }): obj is TimeValue => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TimeValue_possibleTypes.includes(obj.__typename)
}

const DepositConnection_possibleTypes = ['DepositConnection']
export const isDepositConnection = (obj: { __typename: String }): obj is DepositConnection => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return DepositConnection_possibleTypes.includes(obj.__typename)
}

const Deposit_possibleTypes = ['Deposit']
export const isDeposit = (obj: { __typename: String }): obj is Deposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Deposit_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  actions: (args: {
    pagination: Pagination
  }) => ActionConnectionPromiseChain & {
    execute: (request: ActionConnectionRequest, defaultValue?: ActionConnection) => Promise<ActionConnection>
  }
  airdropScore: (args: { address: String }) => { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  luckyDrawTopN: (args: {
    poolAddress: String
    n: Int
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Promise<(Action | null)[]> }
  price: PricePromiseChain & { execute: (request: PriceRequest, defaultValue?: Price) => Promise<Price> }
  total: TotalPromiseChain & { execute: (request: TotalRequest, defaultValue?: Total) => Promise<Total> }
  tokensInPoolPerDay: (args: {
    count: Int
  }) => { execute: (request: TokenInPoolRequest, defaultValue?: (TokenInPool | null)[]) => Promise<(TokenInPool | null)[]> }
  totalPoolPerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Promise<(TimeValue | null)[]> }
  cycTokensPerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Promise<(TimeValue | null)[]> }
  totalTxVolumePerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Promise<(TimeValue | null)[]> }
  deposits: ((args?: {
    first?: Int | null
    skip?: Int | null
    where?: Deposit_filter | null
    sort?: Deposit_orderBy | null
    orderDirection?: OrderDirection | null
  }) => DepositConnectionPromiseChain & {
    execute: (request: DepositConnectionRequest, defaultValue?: DepositConnection) => Promise<DepositConnection>
  }) &
    (DepositConnectionPromiseChain & {
      execute: (request: DepositConnectionRequest, defaultValue?: DepositConnection) => Promise<DepositConnection>
    })
}

export interface QueryObservableChain {
  actions: (args: {
    pagination: Pagination
  }) => ActionConnectionObservableChain & {
    execute: (request: ActionConnectionRequest, defaultValue?: ActionConnection) => Observable<ActionConnection>
  }
  airdropScore: (args: {
    address: String
  }) => { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  luckyDrawTopN: (args: {
    poolAddress: String
    n: Int
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Observable<(Action | null)[]> }
  price: PriceObservableChain & { execute: (request: PriceRequest, defaultValue?: Price) => Observable<Price> }
  total: TotalObservableChain & { execute: (request: TotalRequest, defaultValue?: Total) => Observable<Total> }
  tokensInPoolPerDay: (args: {
    count: Int
  }) => {
    execute: (request: TokenInPoolRequest, defaultValue?: (TokenInPool | null)[]) => Observable<(TokenInPool | null)[]>
  }
  totalPoolPerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Observable<(TimeValue | null)[]> }
  cycTokensPerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Observable<(TimeValue | null)[]> }
  totalTxVolumePerDay: (args: {
    count: Int
  }) => { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Observable<(TimeValue | null)[]> }
  deposits: ((args?: {
    first?: Int | null
    skip?: Int | null
    where?: Deposit_filter | null
    sort?: Deposit_orderBy | null
    orderDirection?: OrderDirection | null
  }) => DepositConnectionObservableChain & {
    execute: (request: DepositConnectionRequest, defaultValue?: DepositConnection) => Observable<DepositConnection>
  }) &
    (DepositConnectionObservableChain & {
      execute: (request: DepositConnectionRequest, defaultValue?: DepositConnection) => Observable<DepositConnection>
    })
}

export interface ActionConnectionPromiseChain {
  actions: { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Promise<(Action | null)[]> }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int64) => Promise<Int64> }
}

export interface ActionConnectionObservableChain {
  actions: { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Observable<(Action | null)[]> }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int64) => Observable<Int64> }
}

export interface ActionPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  method: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  time: { execute: (request?: boolean | number, defaultValue?: Int64) => Promise<Int64> }
}

export interface ActionObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  method: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  time: { execute: (request?: boolean | number, defaultValue?: Int64) => Observable<Int64> }
}

export interface PricePromiseChain {
  usd: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
}

export interface PriceObservableChain {
  usd: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
}

export interface TotalPromiseChain {
  totalSupply: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  iotx: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  fee: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
}

export interface TotalObservableChain {
  totalSupply: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  iotx: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  fee: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
}

export interface TokenInPoolPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  values: { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Promise<(TimeValue | null)[]> }
}

export interface TokenInPoolObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  values: { execute: (request: TimeValueRequest, defaultValue?: (TimeValue | null)[]) => Observable<(TimeValue | null)[]> }
}

export interface TimeValuePromiseChain {
  timestamp: { execute: (request?: boolean | number, defaultValue?: Int64) => Promise<Int64> }
  value: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface TimeValueObservableChain {
  timestamp: { execute: (request?: boolean | number, defaultValue?: Int64) => Observable<Int64> }
  value: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface DepositConnectionPromiseChain {
  deposits: { execute: (request: DepositRequest, defaultValue?: (Deposit | null)[]) => Promise<(Deposit | null)[]> }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int64) => Promise<Int64> }
}

export interface DepositConnectionObservableChain {
  deposits: { execute: (request: DepositRequest, defaultValue?: (Deposit | null)[]) => Observable<(Deposit | null)[]> }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int64) => Observable<Int64> }
}

export interface DepositPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  contract: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  commitment: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  leafIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  timestamp: { execute: (request?: boolean | number, defaultValue?: Int64) => Promise<Int64> }
  denomination: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface DepositObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  contract: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  commitment: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  leafIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  timestamp: { execute: (request?: boolean | number, defaultValue?: Int64) => Observable<Int64> }
  denomination: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}
