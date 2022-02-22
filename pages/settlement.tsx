import moment from 'moment'
import type { NextPage } from 'next'
import 'antd/dist/antd.css'

import {
  Layout, Row, Typography, Card, Button, Form, Select, Col, Table,
} from 'antd'
import React from 'react'
import { SidebarLayout } from '../components/sidebar-layout'
import { Colors } from '../infra/colors'

import { FileAddOutlined } from '@ant-design/icons'
import { WEIGHT_OPTIONS } from '../infra/constants'
import { TruckOption } from '../infra/types'
import { renameKey } from '../infra/utils'
import { CSVLink } from "react-csv";


let dataSource: [] = require('../public/YLP_data.json')
const InputWidth = '200px'

const { Option } = Select
const columns =
  [
    {
      title: '화물번호',
      dataIndex: '화물번호',
      key: '화물번호',
      render: (text: string) => <a href={'./order'}>{text}</a>,
    },
    {
      title: '상태',
      dataIndex: '상태',
      key: '상태',
    },
    {
      title: '등록자',
      dataIndex: '등록자',
      key: '등록자',
    },
    {
      title: '등록일',
      dataIndex: '등록일',
      key: '등록일',
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
      title: '상차지',
      dataIndex: '상차지',
      key: '상차지',
    },
    {
      title: '하차지',
      dataIndex: '하차지',
      key: '하차지',
    },
    {
      title: '금액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => parseInt(a.totalAmount) - parseInt(b.totalAmount)

    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },
  ]

const columnPairs = [
  { oldkey: '총운송비', newKey: 'totalAmount' },
  { oldkey: '등록일', newKey: 'createdAt' },
]

dataSource.forEach(row => {
  columnPairs.forEach(pair => {
    renameKey(row, pair.oldkey, pair.newKey)
  })
})

const { Title, Text } = Typography

const Settlement: NextPage = () => {

  return (
    <SidebarLayout>
        <Row gutter={[16, 0]}>
          <Col span={4}>
            <Card title={'검색 조건'}>
              <Form layout={'vertical'}>
                <Form.Item label={'도/시'}><Select><Option>강원도</Option></Select></Form.Item>
                <Form.Item label={'화물중량'}><Select>
                  {WEIGHT_OPTIONS.map((weight) => <Option
                    value={weight}>{weight}</Option>)}
                </Select></Form.Item>
              </Form>
              <Button>검색</Button>
            </Card>
          </Col>
          <Col span={20}>
            <Row justify={'space-between'}
                 style={{ marginBottom: 24, padding: 12, backgroundColor: '#0EADFF', alignItems: 'center' }}>
              <Col>
                <Text style={{ fontSize: 24, color: '#fff' }}>정산금액 : </Text>
                <Text style={{
                  fontSize: 24,
                  color: 'red',
                }}>ddd</Text>
                <Text style={{ fontSize: 24, color: '#fff' }}>원</Text>
              </Col>
              <Col>
                <Button style={{backgroundColor:'#1e6e44'}} icon={<FileAddOutlined/>}>
                  <CSVLink style={{paddingLeft:10, color:'#fff'}} data={dataSource}>엑셀 다운로드</CSVLink>
                  </Button>
              </Col>
            </Row>
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
                <Table columns={columns} dataSource={dataSource}/>;
              </Col>
            </Row>
          </Col>
        </Row>
    </SidebarLayout>
  )
}

export default Settlement
