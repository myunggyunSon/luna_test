import type { NextPage } from 'next'
import 'antd/dist/antd.css'
import NaverMap from 'react-naver-map'

import DaumPostcode from 'react-daum-postcode'

import {
  Layout, Row, Typography, Input, Space, Card, Modal, Checkbox,
  DatePicker, TimePicker, Radio, AutoComplete, Transfer, Button,
} from 'antd'
import { useEffect, useState } from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { HomeOutlined, UserOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons'
import { NAVER_MAP_CLIENT_ID } from '../infra/constants'
import { Trucker } from '../infra/types'
//import { Truckers } from '../infra/mockedData'
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
  // TODO 사용하게 될 경우 type 선언 필요
  const response = await getAddressByKakao(address)
  console.log(response)
  console.log(response.documents[0].address.x) // 위도
  console.log(response.documents[0].address.y) // 경도
}

const Order: NextPage = () => {
  const [isShipperModalVisible, setisShipperModalVisible] = useState(false)
  const [isCargoModalVisible, setisCargoModalVisible] = useState(false)
  const [isDestinationModalVisible, setisDestinationModalVisible] = useState(false)

  const [isLTL, setIsLTL] = useState(false)
  const [loadOption, setLoadOption] = useState(0)
  const [isOpenPost, setIsOpenPost] = useState(false)
  const [shipperAddress, setShipperAddress] = useState('')
  const [shipperName, setShipperName] = useState('')

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

        {/* 상차지 정보 모달 */}
        <Modal visible={isShipperModalVisible}
               destroyOnClose={true}
               onOk={() => {
                 setisShipperModalVisible(false)
               }}
               onCancel={() => {
                 setisShipperModalVisible(false)
               }}>
          <Typography.Title level={4}>상차지 정보 입력하기</Typography.Title>

          <Typography.Title level={5}>상차지 주소</Typography.Title>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <Space direction={'vertical'} style={{ width: '100%' }}>
              <Input.Search size={'large'} value={shipperAddress} onClick={() => {
                setIsOpenPost(true)
              }} placeholder={'이곳을 눌러 주소를 찾으세요'}/>
              {isOpenPost &&
              <Modal visible={true}
                     cancelText={''}
                     onOk={() => {
                       setIsOpenPost(false)
                     }}>
                <DaumPostcode onComplete={(data) => {
                  setShipperAddress(data.address)
                  setIsOpenPost(false)
                }}/>
              </Modal>
              }

              <div/>
              <Typography.Title level={5}>상차지 정보</Typography.Title>
              <Input onChange={(e) => setShipperName(e.target.value)} size={'large'} placeholder={'회사명을 입력하세요 (예: 세방)'}
                     prefix={<HomeOutlined/>}/>
              <Input size={'large'} placeholder={'담당자 이름 (예: 홍길동)'} prefix={<UserOutlined/>}/>
              <Input size={'large'} placeholder={'휴대전화번호 (예: 01024106117)'} prefix={<PhoneOutlined/>}/>

              <div/>
              <Typography.Title level={5}>상차 시간</Typography.Title>
              <Space>
                <DatePicker size={'large'} placeholder={'날짜 선택'}/>
                <TimePicker format={'HH'} size={'large'} placeholder={'시간 선택'}/>
              </Space>

              <div/>
              <Typography.Title level={5}>상차지 메모</Typography.Title>

              <Input.TextArea size={'large'} placeholder={'상차지 주의사항 (예: 들어가는 길이 좁으니 주의해주세요)'}/>

            </Space>

          </div>
          <Checkbox onChange={() => {
            getCoordsByAddress(shipperAddress)
            alert('C')
          }}>이 주소를 기본 주소지로 설정</Checkbox>
        </Modal>


        {/* 물품 정보 모달 */}
        <Modal visible={isCargoModalVisible}
               destroyOnClose={true}
               onOk={() => {
                 setisCargoModalVisible(false)
               }}
               onCancel={() => {
                 setisCargoModalVisible(false)
               }}>
          <Typography.Title level={4}>물품 정보 입력하기</Typography.Title>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <Space direction={'vertical'} style={{ width: '100%' }}>

              <Typography.Title level={5}>적재 옵션</Typography.Title>
              <Radio.Group size={'large'} value={isLTL} onChange={(e) => {
                setIsLTL(e.target.value)
              }}>
                <Radio.Button value={false}>독차</Radio.Button>
                <Radio.Button value={true}>혼적</Radio.Button>
              </Radio.Group>

              <div/>
              <Typography.Title level={5}>물품 종류</Typography.Title>
              <Input size={'large'} placeholder={'실을 물건을 입력하세요 (예: 책상 3개)'} prefix={<UserOutlined/>}/>

              <div/>
              <Typography.Title level={5}>포장 방법</Typography.Title>

              <Radio.Group size={'large'} value={loadOption} onChange={(e) => {
                setLoadOption(e.target.value)
              }}>
                <Radio.Button value={0}>파렛트</Radio.Button>
                <Radio.Button value={1}>백파렛트</Radio.Button>
                <Radio.Button value={2}>박스</Radio.Button>
                <Radio.Button value={3}>톤백</Radio.Button>

              </Radio.Group>

              <div/>
              <Typography.Title level={5}>물품 취급 주의사항</Typography.Title>

              <Input.TextArea size={'large'} placeholder={'취급시 주의사항 (예: 우회전 시 조심해주세요)'}/>

            </Space>

          </div>
        </Modal>

        <Layout style={{ flex: 1, padding: '10px 40px', backgroundColor: '#fff' }}>
          <Typography.Title level={4}>
            배차 요청
          </Typography.Title>
          <Space direction='vertical' >
              <Card onClick={() => {
                setisShipperModalVisible(true)
              }}
                    title={'상차지정보'} extra={<a href="#">입력하기</a>}>
                {shipperAddress}
                {shipperName || '상차지 정보를 입력하세요'}
              </Card>
              <Card title={'물품정보'} extra={<a href="#">입력하기</a>}
                    onClick={() => {
                      setisCargoModalVisible(true)
                    }}>
                물품 정보를 입력하세요
              </Card>
            <Typography.Title level={4}>차량 선택하기</Typography.Title>
            <Button type={'primary'} onClick={() => {
              truckerApi.addTrucker({
                name: '안녕',
                carNumber: '3982',
                phone: '01024106118',
                carType: 'cargo',
                workYears: 5,

              })
            }}>차량 추가하기</Button>


            <AutoComplete
              style={{ width: '100%' }}
              options={truckers.map(trucker => ({ value: `${trucker.carNumber} / ${trucker.name} / ${trucker.workYears}년` }))}
              placeholder="차량숫자를 입력해 검색하세요 (예: 2)"
              filterOption={(inputValue, option) =>
                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />

            <Transfer
              dataSource={truckers.map((trucker, idx) => ({
                key: `${idx}`,
                title: `${trucker.name} / ${trucker.carNumber}`,
              }))}
              showSearch
              targetKeys={targetKeys}
              onChange={(targetKeys) => {
                setTargetKeys(targetKeys)
              }}
              render={item => item.title}
            />
          </Space>
        </Layout>

        <Layout style={{ flex: 2 }}>
          <NaverMap
            style={{
              width: '100%',
              height: '100%',
            }}
            //220202: 여기에서 ncp를 빼면 동작 안한다.. 신기하네 뭐지
            ncp
            clientId={NAVER_MAP_CLIENT_ID}
            cent
          ></NaverMap>
        </Layout>
      </Layout>

    </SidebarLayout>
  )
}

export default Order
