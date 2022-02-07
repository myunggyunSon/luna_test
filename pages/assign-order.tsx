import type { NextPage } from 'next'
import 'antd/dist/antd.css'
import NaverMap, { Marker } from 'react-naver-map'

import {
  Layout, Typography, Modal, List,

} from 'antd'
import { useEffect, useState } from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { NAVER_MAP_CLIENT_ID } from '../infra/constants'
import { Freight, NaverMapPointEvent, Trucker } from '../infra/types'
import { freightApi } from './api/freight-api'
import { truckerApi } from './api/trucker-api'

const AssignOrder: NextPage = () => {
  const [truckers, setTruckers] = useState<Trucker[]>([])
  const [freights, setFreights] = useState<Freight[]>([])

  const [truckerSelected, setTruckerSelected] = useState<Trucker>({})
  const [freightSelected, setFreightSelected] = useState<Freight>({})

  const [isTruckerModalVisible, setIsTruckerModalVisible] = useState<boolean>(false)

  useEffect(() => {
    truckerApi.getTruckers()
      .then((res) => {
        setTruckers(res)
      })

    freightApi.getFreight()
      .then((res) => {
        setFreights(res)
        console.log(res.filter(a => a.shipperLat))
      })
  }, [])

  return (
    <SidebarLayout>
      <Layout style={{ height: '100%', display: 'flex', flexDirection: 'row', borderTop: '' }}>

        <Layout style={{ flex: 2 }}>

          <Modal
            visible={isTruckerModalVisible}
            onOk={() => {
              setIsTruckerModalVisible(false)
            }}
            onCancel={() => {
              setIsTruckerModalVisible(false)
            }}
          >
            <List
              header={<Typography.Title level={3}>선택가능한 화물</Typography.Title>}
              dataSource={freights}
              renderItem={freight => (
                <List.Item
                  key={freight.freightName}
                >
                  <List.Item.Meta
                    title={`${freight.freightName} / ${freight.weight}톤 / ${freight.price / 10000}만원`}
                    description={''}
                  />
                  {`${freight.shipperAddress} => ${freight.receiverAddress}`}
                </List.Item>
              )}
            >
            </List>
          </Modal>

          <NaverMap
            style={{
              width: '100%',
              height: '100%',
            }}
            //220202: 여기에서 ncp를 빼면 동작 안한다.
            ncp
            clientId={NAVER_MAP_CLIENT_ID}
            initialPosition={{ lat: 37.4595704, lng: 127.005399 }}
            initialZoom={11}
          >
            {truckers.filter(trucker => trucker.currentLng).map((trucker, id) => (
              <Marker
                key={id}
                lat={trucker.currentLat}
                lng={trucker.currentLng}
                onClick={(event: NaverMapPointEvent) => {
                  setTruckerSelected(trucker)
                  setIsTruckerModalVisible(true)
                }}
                icon={{
                  content: `
                            <div style="position: absolute; width:100px; height:40px; display: flex;
                            background-color: #0070f3; border-radius: 40px; justify-content: center; align-items: center;
                            opacity:0.8">
                              <div style="width:90px; height:30px; background-color: #fff; border-radius: 30px;
                              display: flex; justify-content: center; align-items:center">
                                  <span style="color:#0070f3; font-size: 18px">${trucker.name[0]} ${trucker.carNumber}</span>
                              </div>
                            </div>`,
                }}>
              </Marker>
            ))}
            {freights.filter(freight => freight.shipperLat).map((freight, id) => (
              <Marker
                key={id * 100}
                lat={freight.shipperLat}
                lng={freight.shipperLng}
                onClick={(event: NaverMapPointEvent) => {
                  setFreightSelected(freight)
                  setIsTruckerModalVisible(true)
                }}
                icon={{
                  content: `
                            <div style="position: absolute; width:100px; height:40px; display: flex;
                            background-color: #2ca577; border-radius: 40px; justify-content: center; align-items: center;
                            opacity:0.8">
                              <div style="width:90px; height:30px; background-color: #fff; border-radius: 30px;
                              display: flex; justify-content: center; align-items:center">
                                  <span style="color:#2ca577; font-size: 18px">${freight.freightName}(${freight.price / 10000})</span>
                              </div>
                            </div>`,
                }}
              >
              </Marker>
            ))}

          </NaverMap>
        </Layout>
      </Layout>
    </SidebarLayout>
  )
}

export default AssignOrder
