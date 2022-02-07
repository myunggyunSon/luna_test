export interface AirtableNetworkMessage {
  records?: any
}

export interface NetworkMessage {
  status: number
  data?: any
  arr?: any
  msg?:
    | string
    | {
    message: string
    name: string
  }
}
