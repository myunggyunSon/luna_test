import { TruckOption } from './types'

export const CONTENT_PADDING = 24
export const TRUCKER_MARKER_WIDTH = 40
export const TRUCKER_MARKER_HEIGHT = TRUCKER_MARKER_WIDTH * 1.125
export const NAVER_MAP_CLIENT_ID = '905azfqrx7'

export const TRUCK_OPTIONS: TruckOption[] = [
  { name: 'cargo', displayName: '카고' },
  { name: 'wing', displayName: '윙' },
  { name: 'chu', displayName: '츄레라' },
  { name: 'top', displayName: '탑차' },
]

export const WEIGHT_OPTIONS: string[] = [
  '1톤', '1.4톤', '2.5톤', '3.5톤', '5톤', '8톤', '11톤', '18톤', '25톤',
]


export const INPUT_SMALL_WIDTH = '100px'
export const INPUT_MID_WIDTH = '200px'
