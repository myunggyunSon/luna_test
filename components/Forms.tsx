import { Select } from 'antd'
import { INPUT_MID_WIDTH, TRUCK_OPTIONS, WEIGHT_OPTIONS } from '../infra/constants'

const { Option } = Select

export const TruckSelect = () => (
  <Select style={{width:INPUT_MID_WIDTH}} defaultValue={'cargo'}>
    {TRUCK_OPTIONS.map((truckOption) => (
      <Option
        value={truckOption.name}>{truckOption.displayName}
      </Option>),
    )}
  </Select>
)

export const WeightSelect = () => (
  <Select style={{width:INPUT_MID_WIDTH}} defaultValue={'1톤'}>
    {WEIGHT_OPTIONS.map((weightOption) => (
      <Option
        value={weightOption}>{weightOption}
      </Option>),
    )}
  </Select>
)
