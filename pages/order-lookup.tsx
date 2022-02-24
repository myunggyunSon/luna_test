import { Button, Card, Col, DatePicker, Form, Input, Layout, Row, Select, Space, Table } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { TruckSelect, WeightSelect } from '../components/Forms'
import { SidebarLayout } from '../components/sidebar-layout'
import { INPUT_MID_WIDTH } from '../infra/constants'
import { addKey, renameKey } from '../infra/utils'
import {
  FileAddOutlined,
} from '@ant-design/icons'
import { CSVLink, CSVDownload } from "react-csv";

let dataSource: [] = require('../public/YLP_data.json')

console.log(dataSource)
const { RangePicker } = DatePicker
const { Option } = Select

const columns =
  [
    {
      title: '상태',
      dataIndex: '상태',
      key: '상태',
      width: 100,
    },
    {
      title: '품목',
      dataIndex: '품목',
      key: '품목',
      width: 140,
      ellipsis: true,
      render: (text: string) => <a href={'./order'}>{text}</a>,
    },

    {
      title: '차량종류',
      dataIndex: '차량종류',
      key: '차량종류',
      width: 100,
    },
    {
      title: '출발시간',
      dataIndex: '상차일',
      key: '상차일',
      width:140,
    },
    {
      title: '상차지',
      dataIndex: '상차지',
      key: '상차지',
      width:140,
    },
    {
      title: '하차지',
      dataIndex: '하차지',
      key: '하차지',
      width:140,

    },
    {
      title: '금액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => parseInt(a.totalAmount) - parseInt(b.totalAmount),

    },
    {
      title: '기사정보',
      dataIndex: 'truckerInfo',
      key: 'truckerInfo',
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },
  ]

const columnPairs = [
  { oldKey: '총운송비', newKey: 'totalAmount' },
  { oldKey: '등록일', newKey: 'createdAt' },
]

const OrderLookup: NextPage = () => {
  const [filterForm] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])


  dataSource.forEach((row, index) => {
    columnPairs.forEach(pair => {
      renameKey(row, pair.oldKey, pair.newKey)
    })
    row['truckerInfo'] = row['운송기사명'] + ' / ' + row['차량번호'] + ' / '+ '\n'+ row['운송기사HP']
    addKey(row, index.toString())
  })

  return (
    <SidebarLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
        <Card style={{ width: '100%' }}>
          <Row>
            <Form form={filterForm}>
              <Space>
                <Form.Item name={'filterByDateOf'}>
                  <Select defaultValue={'createdAt'} style={{ width: '100px' }}>
                    <Option value={'createdAt'}>등록일시</Option>
                    <Option value={'departedAt'}>출발일시</Option>
                    <Option value={'arrivedAt'}>도착일시</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <RangePicker defaultValue={[moment().subtract(1, 'month'), moment()]} placeholder={['시작일', '종료일']}/>
                </Form.Item>
                <Form.Item name={'truckSelect'}>
                  <TruckSelect/>
                </Form.Item>
                <Form.Item>
                  <WeightSelect/>
                </Form.Item>
                <Form.Item>
                  <Input style={{ width: INPUT_MID_WIDTH }} placeholder={'검색어'}/>
                </Form.Item>
              </Space>
            </Form>
          </Row>
          <Row justify={'end'}>
            <Button onClick={() => {
            }}>검색
            </Button>
            <Button icon={<FileAddOutlined/>} type={'primary'} onClick={() => {
              console.log(dataSource.filter((row) => (row.key in selectedRowKeys)))
            }}>              <CSVLink style={{color:'#fff'}} data={ dataSource.filter((row) => (row.key in selectedRowKeys))}>엑셀 다운로드</CSVLink>

            </Button>
          </Row>
        </Card>
      </Col>
        <Col span={24}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`)
                setSelectedRowKeys(selectedRowKeys)
              },
              type: 'checkbox',
            }}
            dataSource={dataSource}
            columns={columns}/>
        </Col>
      </Row>
    </SidebarLayout>
  )
}

export default OrderLookup
