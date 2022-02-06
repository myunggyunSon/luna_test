import { Freight } from '../../infra/types'
import { AirtableBaseApi } from './airtable-base-api'
import { ApiError } from './api-error'

class FreightApi extends AirtableBaseApi {
  async getFreight(): Promise<Freight[]> {
    const res = await this.get('Freight')
    return res.records.map((record: any) => record.fields)
  }

  async addFreight(body: Freight): Promise<Freight[]> {
    const res = await this.post('Freight', body)
    return res.records
  }
}

export const freightApi = new FreightApi()
