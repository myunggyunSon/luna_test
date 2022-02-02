import { AuthError, NetworkError, ServiceError } from './api-error'
import { NetworkMessage } from './base-api'

export const getAddressByNaver = async (address: string): Promise<NetworkMessage> => {
  let res
  try {
    res = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`, {
      method: 'GET',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': '905azfqrx7',
        'X-NCP-APIGW-API-KEY': 'SlXa4XVDXWKvWZlR26N16l74PmDdlNtw2H8PpmXu',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'no-cors'
      },

    })
  } catch (e) {
    console.log(e)
    throw new NetworkError()
  }
  if (res.status === 500) throw new ServiceError()
  if (res.status === 401) {
    throw new AuthError()
  }
  return res.json()
}


// 22.02.02 api call 동작 확인 (https://developers.kakao.com/docs/latest/ko/local/dev-guide)
export const getAddressByKakao = async (address: string): Promise<NetworkMessage> => {
  let res
  try {
    res = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `KakaoAK 3b88b78b9a04ddfb8743c10ef80dd548`
      },
    })
  } catch (e) {
    console.log(e)
    throw new NetworkError()
  }
  if (res.status === 500) throw new ServiceError()
  if (res.status === 401) {
    throw new AuthError()
  }
  return res.json()
}


