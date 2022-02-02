import type { NextPage } from 'next'
import 'antd/dist/antd.css'
import {
  Layout, Row, Typography, Input, Space, Card, Modal, Checkbox,
  DatePicker, TimePicker, Radio,
} from 'antd'
import { useState } from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { HomeOutlined, UserOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons'

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

const Order: NextPage = () => {
  const [isShipperModalVisible, setisShipperModalVisible] = useState(false)
  const [isCargoModalVisible, setisCargoModalVisible] = useState(false)
  const [isDestinationModalVisible, setisDestinationModalVisible] = useState(false)
  const [isLTL, setIsLTL] = useState(false)
  const [loadOption, setLoadOption] = useState(0)

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
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <Space direction={'vertical'} style={{ width: '100%' }}>
              <Typography.Title level={5}>상차지 정보</Typography.Title>
              <Input size={'large'} placeholder={'회사명을 입력하세요 (예: 세방)'} prefix={<HomeOutlined/>}/>
              <Input size={'large'} placeholder={'담당자 이름 (예: 홍길동)'} prefix={<UserOutlined/>}/>
              <Input size={'large'} placeholder={'휴대전화번호 (예: 01024106117)'} prefix={<PhoneOutlined/>}/>
              <Typography.Title level={5}>상차 시간</Typography.Title>
              <Space>
                <DatePicker size={'large'} placeholder={'날짜 선택'}/>
                <TimePicker format={'HH'} size={'large'} placeholder={'시간 선택'}/>
              </Space>
              <Typography.Title level={5}>상차지 메모</Typography.Title>

              <Input.TextArea size={'large'} placeholder={'상차지 주의사 (예: 들어가는 길이 좁으니 주의해주세요)'}/>

            </Space>

          </div>
          <Checkbox onChange={() => {
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

              <Typography.Title level={5}>물품 종류</Typography.Title>
              <Input size={'large'} placeholder={'실을 물건을 입력하세요 (예: 책상 3개)'} prefix={<UserOutlined/>}/>

              <Typography.Title level={5}>포장 방법</Typography.Title>
              <Radio.Group size={'large'} value={loadOption} onChange={(e) => {
                setLoadOption(e.target.value)
              }}>
                <Radio.Button value={0}>파렛트</Radio.Button>
                <Radio.Button value={1}>백파렛트</Radio.Button>
                <Radio.Button value={2}>박스</Radio.Button>
                <Radio.Button value={3}>톤백</Radio.Button>

              </Radio.Group>

              <Space>
                <DatePicker size={'large'} placeholder={'날짜 선택'}/>
                <TimePicker format={'HH'} size={'large'} placeholder={'시간 선택'}/>
              </Space>
              <Typography.Title level={5}>상차지 메모</Typography.Title>

              <Input.TextArea size={'large'} placeholder={'상차지 주의사 (예: 들어가는 길이 좁으니 주의해주세요)'}/>

            </Space>

          </div>
          <Checkbox onChange={() => {
            alert('C')
          }}>이 주소를 기본 주소지로 설정</Checkbox>
        </Modal>

        <Layout style={{ flex: 1, padding: '10px 40px', backgroundColor: '#fff' }}>
          <Typography.Title level={4}>
            배차 요청
          </Typography.Title>
          <Space direction='vertical'>
            <div>
              <Card onClick={() => {
                setisShipperModalVisible(true)
              }}
                    title={'상차지정보'} extra={<a href="#">입력하기</a>}>
                상차지 정보를 입력하세요
              </Card>
              <Card title={'하차지정보'} extra={<a href="#">입력하기</a>}>
                하차지 정보를 입력하세요
              </Card>
              <Card title={'물품정보'} extra={<a href="#">입력하기</a>}
                    onClick={() => {
                      setisCargoModalVisible(true)
                    }}>
                물품 정보를 입력하세요
              </Card>
            </div>
          </Space>
        </Layout>
        <Layout style={{ flex: 2, backgroundColor: 'green' }}>

        </Layout>
      </Layout>

    </SidebarLayout>
  )
}

export default Order
