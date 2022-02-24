import { Button, Col, message, Modal, Row, Select, Table, Typography } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { Colors } from '../infra/colors'
import { renameKey, TaxBillStatus } from '../infra/utils'

let dataSource: [] = require('../public/YLP_data.json')
const taxBillImage = require('../public/taxBillImage.png')

const InputWidth = '200px'

const { Option } = Select

const columnPairs = [
  { oldkey: '총운송비', newKey: 'totalAmount' },
  { oldkey: '등록일', newKey: 'createdAt' },
]

dataSource.forEach((row, index) => {
  columnPairs.forEach(pair => {
    renameKey(row, pair.oldkey, pair.newKey)
  })
  row['인수증수취여부'] = index % 6 !== 1 // 미수취: 1 7 13
  row['세금계산서상태'] = index % 3 // 1 4 7 10 => 미수취

})

const { Title, Text } = Typography

const Settlement: NextPage = () => {

  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false)
  const [isTaxBillModalVisible, setIsTaxBillModalBisible] = useState(false)
  const [selectedTaxBillStatus, setSelectedTaxBillStatus] = useState(TaxBillStatus.ADJUST_REQUEST)

  const columns =
    [
      {
        title: '화물번호',
        dataIndex: '화물번호',
        key: '화물번호',
        render: (text: string) => <a href={'./order'}>{text}</a>,
      },
      {
        title: '기사명',
        dataIndex: '운송기사명',
        key: '운송기사명',
      },
      {
        title: '출발지',
        dataIndex: '상차지',
        key: '상차지',
      },
      {
        title: '도착지',
        dataIndex: '하차지',
        key: '하차지',
      },
      {
        title: '차량종류',
        dataIndex: '차량종류',
        key: '차량종류',
      },
      {
        title: '차량중량',
        dataIndex: '차량중량',
        key: '차량중량',
      },
      {
        title: '금액',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: (a, b) => parseInt(a.totalAmount) - parseInt(b.totalAmount),

      },
      {
        title: '등록일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
      },
      {
        title: '인수증',
        dataIndex: '인수증수취여부',
        key: '인수증수취여부',
        width: '120px',
        render: (isReceiptReceived: boolean) =>
          <Button
            disabled={!isReceiptReceived}
            onClick={() => {
              setIsReceiptModalVisible(true)
            }}
            style={{
              width: '80px',
              textAlign: 'center',
              borderStyle: isReceiptReceived ? 'solid' : 'dashed',
              color: '#333',
              borderColor: '#333',
            }}>
            {isReceiptReceived ? '수취' : '미수취'}</Button>,
        sorter: (a, b) => a['인수증수취여부'] - b['인수증수취여부'],
      },
      {
        title: '세금계산서',
        dataIndex: '세금계산서상태',
        key: '세금계산서상태',
        width: '120px',
        render: (taxBillStatus: TaxBillStatus) =>
          <Button
            disabled={taxBillStatus === TaxBillStatus.NOT_RECEIVED}
            onClick={() => {
              setSelectedTaxBillStatus(taxBillStatus)
              setIsTaxBillModalBisible(true)
            }}
            style={{
              width: '90px',
              textAlign: 'center',
              borderStyle: taxBillStatus === TaxBillStatus.NOT_RECEIVED ? 'dashed' : 'solid',
              borderColor: taxBillStatus === TaxBillStatus.ADJUST_REQUEST ? 'red' :
                taxBillStatus === TaxBillStatus.MATCHING ? '#0EADFF' : 'black',
              color: taxBillStatus === TaxBillStatus.ADJUST_REQUEST ? 'red' :
                taxBillStatus === TaxBillStatus.MATCHING ? '#0EADFF' : 'black',
            }}>
            {taxBillStatus === TaxBillStatus.ADJUST_REQUEST ? '수정 요청' :
              taxBillStatus === TaxBillStatus.MATCHING ? '매칭 성공' : '미수취'}</Button>,
        sorter: (a, b) => a['세금계산서상태'] - b['세금계산서상태'],
      },
    ]
  return (
    <SidebarLayout>
      <Modal
        width={'1000px'}
        onOk={() => {
          setIsTaxBillModalBisible(false)
        }}
        visible={isTaxBillModalVisible}>
        <Row>
          <Col span={selectedTaxBillStatus === TaxBillStatus.ADJUST_REQUEST ? 18 : 24} style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '700px' }} src="/taxBillImage.png" alt="image"/>
          </Col>
          {
            selectedTaxBillStatus === TaxBillStatus.ADJUST_REQUEST &&
            <Col span={6}>
              <Col span={24}
                   style={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Button style={{
                  height: '120px',
                  borderColor: '#0EADFF',
                  borderWidth: '4px',
                  borderStyle: 'solid',
                  color: '#0EADFF',
                  fontWeight: 'bold',
                  fontSize: '36px',
                }}
                        onClick={() => {
                          message.success('세금계산서 수정요청을 승인하였습니다.')
                          setIsTaxBillModalBisible(false)
                        }}
                >
                  승인
                </Button>
                <Button style={{
                  height: '120px',
                  borderColor: 'red',
                  borderWidth: '4px',
                  borderStyle: 'solid',
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: '36px',
                }}
                  onClick={() => {
                    message.warn('세금계산서 수정요청을 기각하였습니다.')
                    setIsTaxBillModalBisible(false)
                  }}
                >
                  미승인
                </Button>
                <Button style={{
                  height: '48px',
                  borderColor: 'black',
                  borderWidth: '4px',
                  borderStyle: 'solid',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}>
                  통화하기
                </Button>
                <Button style={{
                  height: '48px',
                  borderColor: 'black',
                  borderWidth: '4px',
                  borderStyle: 'solid',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}>
                  카톡하기
                </Button>
              </Col>
            </Col>
          }
        </Row>
      </Modal>
      <Modal
        width={'1000px'}
        onOk={() => {
          setIsReceiptModalVisible(false)
        }}
        visible={isReceiptModalVisible}>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '700px' }} src="/receiptImage.png" alt="image"/>
          </Col>
        </Row>
      </Modal>

      <Typography.Title level={2} style={{ marginLeft: 4 }}>결제 / 자금 집행</Typography.Title>
      <Row>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '12px 0px 12px 0px' }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold' }}><Text style={{ color: 'red' }}>{14}</Text>건의 세금계산서 수정 요청이 있습니다</Text>
        </div>
      </Row>
      <Row gutter={[16, 0]}>

        <Col span={24}>
          <Row>
            <Col span={6}>
              <Button style={{
                width: '100%',
                backgroundColor: Colors.DARKBLUE,
                fontWeight: 'bold',
                color: '#fff',
              }}>거래처별</Button>
            </Col>
            <Col span={6}>
              <Button style={{
                width: '100%',
                backgroundColor: Colors.DARKBLUE,
                fontWeight: 'bold',
                color: '#fff',
              }}>건별</Button>
            </Col>
            <Col span={6}>
              <Button style={{
                width: '100%',
                backgroundColor: Colors.DARKBLUE,
                fontWeight: 'bold',
                color: '#fff',
              }}>지역별</Button>
            </Col>
            <Col span={6}>
              <Button style={{
                width: '100%',
                backgroundColor: Colors.DARKBLUE,
                fontWeight: 'bold',
                color: '#fff',
              }}>중량별</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={dataSource.filter((row) => (row['상태'] === '운행완료'))}/>;
            </Col>
          </Row>
        </Col>
      </Row>
    </SidebarLayout>
  )
}

export default Settlement
