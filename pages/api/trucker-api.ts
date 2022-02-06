import { Trucker } from '../../infra/types'
import { AirtableBaseApi } from './airtable-base-api'
import { ApiError } from './api-error'

class TruckerApi extends AirtableBaseApi {
  async getTruckers(): Promise<Trucker[]> {
    const res = await this.get('Trucker')
    return res.records.map((record: any) => record.fields)
  }

  async addTrucker(body: Trucker): Promise<Trucker[]> {
    const res = await this.post('Trucker', body)
    return res.records
  }
}

export const truckerApi = new TruckerApi()
