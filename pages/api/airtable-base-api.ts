import { AuthError, NetworkError, ServiceError } from './api-error'
import { AirtableNetworkMessage } from './base-api'

const TableId = 201
const AIRTABLE_BASE_ID = 'applbdw2ZsxYnS2w5'
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`
const AIRTABLE_API_KEY = 'keybAes5GAMvz2kuG'

//export const 'https://api.airtable.com/v0/applbdw2ZsxYnS2w5/Table%201 \

export class AirtableBaseApi {
  get commonHeaders() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    }
    return headers
  }

  protected async get(tableName: string): Promise<AirtableNetworkMessage> {
    let res
    try {
      res = await fetch(`${AIRTABLE_BASE_URL}/${tableName}`, {
        method: 'GET',
        headers: this.commonHeaders,
      })
    } catch (e) {
      throw new NetworkError()
    }
    if (res.status === 500) throw new ServiceError()
    if (res.status === 401) {
      throw new AuthError()
    }
    return res.json()
  }

  protected async post(tableName: string, body?: object): Promise<AirtableNetworkMessage> {
    let res
    try {
      res = await fetch(`${AIRTABLE_BASE_URL}/${tableName}`, {
        method: 'POST',
        headers: this.commonHeaders,
        body: JSON.stringify({ 'fields': body }),
      })
    } catch (e) {
      throw new NetworkError()
    }
    if (res.status === 500) throw new ServiceError()
    return res.json()
  }

  protected async put(tableName: string, body: object): Promise<AirtableNetworkMessage> {
    let res
    try {
      res = await fetch(`${AIRTABLE_BASE_URL}/${tableName}`, {
        method: 'PUT',
        headers: this.commonHeaders,
        body: JSON.stringify(body),
        credentials: 'include',
      })
    } catch (e) {
      throw new NetworkError()
    }
    if (res.status === 500) throw new ServiceError()
    return res.json()
  }

  protected async delete(
    tableName: string,
    body: object = {},
  ): Promise<AirtableNetworkMessage> {
    let res
    try {
      res = await fetch(`${AIRTABLE_BASE_URL}/${tableName}`, {
        method: 'DELETE',
        headers: this.commonHeaders,
        body: JSON.stringify(body),
      })
    } catch (e) {
      throw new NetworkError()
    }
    if (res.status === 500) throw new ServiceError()
    return res.json()
  }
}
