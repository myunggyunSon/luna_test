import type { NextPage } from 'next'
import 'antd/dist/antd.css'
import NaverMap, { Marker } from 'react-naver-map'

import {
  Layout, Typography, Input, Space, Card, Modal, Checkbox,

} from 'antd'
import { useEffect, useState } from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { HomeOutlined, UserOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons'
import { TRUCKER_MARKER_HEIGHT, TRUCKER_MARKER_WIDTH } from '../infra/constants'
import { Trucker } from '../infra/types'
import { getAddressByKakao, getAddressByNaver } from './api/naver-api'
import { truckerApi } from './api/trucker-api'

interface OrderCardProps {
  visible: boolean;
}

const ShippmentOrderCard = (props: OrderCardProps) => {
  return (
    <Modal visible={props.visible}>
      <Typography.Title level={5}>상차지 정보</Typography.Title>
    </Modal>
  )
}

const getCoordsByAddress = async (address: string) => {
  const response = await getAddressByKakao(address)
  console.log(response)
  console.log(response.documents[0].address.x) // 위도
  console.log(response.documents[0].address.y) // 경도
}

/*
export const MarkerStyler = styled.div`
  width: 100%;
  height: 100%;

  .deer-marker {
    position: relative;

    img {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: ${TRUCKER_MARKER_WIDTH}px;
      height: ${TRUCKER_MARKER_HEIGHT}px;
    }

    span {
      position: absolute;
      font-size: 12px;
      bottom: 11px;
      left: 50%;
      transform: translateX(-50%);

      &.warning {
        color: red;
      }
    }

    &.selected {
      img {
        width: ${TRUCKER_MARKER_WIDTH * 1.2}px;
        height: ${TRUCKER_MARKER_HEIGHT * 1.2}px;
      }
      span {
        font-size: 14px;
        bottom: 14px;
      }
    }
  }

`*/

const AssignOrder: NextPage = () => {
  // 차주 선택
  const [targetKeys, setTargetKeys] = useState([''])

  const [truckers, setTruckers] = useState<Trucker[]>([])

  useEffect(() => {
    truckerApi.getTruckers()
      .then((res) => {
        setTruckers(res)
        console.log(res)
      })
  })

  return (
    <SidebarLayout>
      <Layout style={{ height: '100%', display: 'flex', flexDirection: 'row', borderTop: '' }}>

        <Layout style={{ flex: 2 }}>
          <NaverMap
            style={{
              width: '100%',
              height: '100%',
            }}
            //220202: 여기에서 ncp를 빼면 동작 안한다.. 신기하네 뭐지
            ncp
            clientId={'905azfqrx7'}
            initialPosition={{ lat: 37.4595704, lng: 127.105399 }}
            initialZoom={10}
          >
            {truckers.filter(trucker => trucker.currentLng).map((trucker, id) => (
              <Marker
                key={id}
                lat={trucker.currentLat}
                lng={trucker.currentLng}

                icon={{
                  content: `
                            <div style="width:50px; height:50px; display: flex;
                            background-color: #0070f3; border-radius: 25px; justify-content: center; align-items: center;
                            opacity:0.8">
                              <div style="width:40px; height:40px; background-color: #fff; border-radius: 20px;
                              display: flex; justify-content: center; align-items:center">
                                  <span style="color:#0070f3; font-size: 24px">${trucker.name[0]}</span>
                              </div>
                            </div>`,
                }}
                /*onClick={event => {
                }}  // id: given id, event: PointerEvent
                /!*icon={{
                  url: markerPng,
                  size: { width: 24, height: 32 },
                  scaledSize: { width: 24, height: 32 },
                  anchor: { x: 12, y: 32 },
                }}*!/
                shape={{ coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12], type: 'poly' }}  // click mask shape
              */>
                <button/>

              </Marker>
            ))}

          </NaverMap>
        </Layout>
      </Layout>

    </SidebarLayout>
  )
}

export default AssignOrder
