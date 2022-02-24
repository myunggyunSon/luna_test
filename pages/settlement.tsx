import moment from 'moment'
import type { NextPage } from 'next'
import 'antd/dist/antd.css'

import {
  Layout, Row, Typography, Card, Button, Form, Select, Col, Table, Space, Input, TimePicker, Checkbox,
} from 'antd'
import React, { useState } from 'react'
import { TruckSelect, WeightSelect } from '../components/Forms'
import { SidebarLayout } from '../components/sidebar-layout'
import { Colors } from '../infra/colors'

import { FileAddOutlined } from '@ant-design/icons'
import { INPUT_MID_WIDTH, WEIGHT_OPTIONS } from '../infra/constants'
import { TruckOption } from '../infra/types'
import { renameKey } from '../infra/utils'
import { CSVLink } from 'react-csv'

let dataSource: [] = require('../public/YLP_data.json')
const InputWidth = '200px'

const { Option } = Select
const { RangePicker } = TimePicker
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
      title: '총운송비',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => parseInt(a.totalAmount) - parseInt(b.totalAmount),

    },

    {
      title: '상차일',
      dataIndex: '상차일',
      key: '상차일',
    },
    {
      title: '하차일',
      dataIndex: '하차일',
      key: '하차일',
    },
    {
      title: '운송기사명',
      dataIndex: '운송기사명',
      key: '운송기사명',
    },
    {
      title: '운송기사HP',
      dataIndex: '운송기사HP',
      key: '운송기사HP',
    },
    {
      title: '인수자',
      dataIndex: '인수자',
      key: '인수자',
    },
    {
      title: '업체명',
      dataIndex: '업체명',
      key: '업체명',
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

const tableColumnsFullList = ['업체명', '상차일', '상차지', '하차일', '하차지', '운송기사명', '운송기사HP', '총운송비', '인수자', '대기비용', '차량중량', '차량종류', '등록일']
const Settlement: NextPage = () => {
  const [filterForm] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [tableColumns, setTableColumns] = useState<string[]>(tableColumnsFullList)
  const [columnSortingArray, setColumnSortingArray] = useState<React.Key[]>(tableColumnsFullList)

  return (
    <SidebarLayout>
      <Row gutter={[16, 0]}>
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
                  <Form.Item name={'shipperSelect'}>
                    <Select style={{ width: '160px' }}>
                      {dataSource.map((row) => (<Option value={row['업체명']}>{row['업체명']}</Option>))}
                    </Select>
                  </Form.Item>
                  <Form.Item name={'truckerSelect'}>
                    <Select style={{ width: '160px' }}>
                      {dataSource.map((row) => (<Option value={row['운송기사명']}>{row['운송기사명']}</Option>))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Input style={{ width: INPUT_MID_WIDTH }} placeholder={'검색어'}/>
                  </Form.Item>
                </Space>
              </Form>
            </Row>
            {/*<Row justify={'end'}>
              <Button onClick={() => {
              }}>검색
              </Button>
              <Button icon={<FileAddOutlined/>} type={'primary'} onClick={() => {
                console.log(dataSource.filter((row) => (row.key in selectedRowKeys)))
              }}> <CSVLink style={{ color: '#fff' }} data={dataSource.filter((row) => (row.key in selectedRowKeys))}>엑셀
                다운로드</CSVLink>

              </Button>
            </Row>*/}
          </Card>
        </Col>
        <Col span={24} style={{ borderStyle: 'solid' }}>
          {/* <Row justify={'space-between'}
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
              <Button style={{ backgroundColor: '#1e6e44' }} icon={<FileAddOutlined/>}>
                <CSVLink style={{ paddingLeft: 10, color: '#fff' }} data={dataSource}>엑셀 다운로드</CSVLink>
              </Button>
            </Col>
          </Row>*/}
          <Row>
            <Col span={18} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Row style={{ padding: 12 }}>
                <Typography.Title level={3}>운송내역서</Typography.Title>
              </Row>
              <Row>
                <Col span={6}>
                  <Button style={{
                    width: '100%',
                    backgroundColor: Colors.DARKBLUE,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                          onClick={() => {

                          }}
                  >건별</Button>
                </Col>
                <Col span={6}>
                  <Button style={{
                    width: '100%',
                    backgroundColor: Colors.DARKBLUE,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}

                          onClick={() => {
                            setTableColumns([
                              '업체명', '상차일', '상차지', '하차일', '하차지', '운송기사명', '차량중량', '총운송비',
                            ])
                            setColumnSortingArray(
                              [
                                '업체명', '상차일', '상차지', '하차일', '하차지', '운송기사명', '차량중량', '총운송비',
                              ],
                            )
                          }}
                  >거래처별</Button>
                </Col>
                <Col span={6}>
                  <Button style={{
                    width: '100%',
                    backgroundColor: Colors.DARKBLUE,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                          onClick={() => {
                            setTableColumns([
                              '운송기사명', '상차일', '상차지', '하차일', '하차지', '업체명', '차량중량', '총운송비',
                            ])
                            setColumnSortingArray(
                              [
                                '운송기사명', '상차일', '상차지', '하차일', '하차지', '업체명', '차량중량', '총운송비',
                              ],
                            )
                          }}
                  >차주별</Button>
                </Col>
                <Col span={6}>
                  <Button style={{
                    width: '100%',
                    backgroundColor: Colors.DARKBLUE,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                          onClick={() => {
                            setTableColumns([
                              '상차일', '상차지', '하차일', '하차지', '업체명', '운송기사명', '차량중량', '총운송비',
                            ])
                            setColumnSortingArray(
                              [
                                '상차일', '상차지', '하차일', '하차지', '업체명', '운송기사명', '차량중량', '총운송비',
                              ],
                            )
                          }}
                  >일자별</Button>
                </Col>
              </Row>
            </Col>
            <Col span={6} style={{}}>
              <Col>
                <Button style={{ width: '100%', backgroundColor: '#1e6e44' }} icon={<FileAddOutlined/>}>
                  <CSVLink style={{ paddingLeft: 10, color: '#fff' }} data={dataSource}>저장된 포맷 불러오기</CSVLink>
                </Button>
                <Button style={{ width: '100%', backgroundColor: '#1e6e44' }} icon={<FileAddOutlined/>}>
                  <CSVLink style={{ paddingLeft: 10, color: '#fff' }} data={dataSource}>현재 포맷 저장하기</CSVLink>
                </Button>
                <Button style={{ width: '100%', backgroundColor: '#1e6e44' }} icon={<FileAddOutlined/>}>
                  <CSVLink style={{ paddingLeft: 10, color: '#fff' }} data={dataSource}>현재 포맷 엑셀로 다운로드</CSVLink>
                </Button>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={18} style={{ height: '80vh', overflow: 'auto' }}>
              <Row>
                <Col span={24}>
                  <Table
                    columns={
                      columns.filter((column) => (tableColumns.indexOf(column.title) >= 0)).sort((a, b) => columnSortingArray.indexOf(a.title) - columnSortingArray.indexOf(b.title))
                    }
                    dataSource={dataSource}/>;
                </Col>
              </Row>
            </Col>
            {/* multiselect 선택 */}
            <Col span={6}>
              <Checkbox.Group onChange={
                (checkedValues: any[]) => {
                  setTableColumns(checkedValues)
                }
              }
                              value={tableColumns}
              >
                {tableColumnsFullList.map((column) => (
                  <Checkbox style={{ textAlign: 'center', width: '200px', height: '45px', fontSize: 18 }}
                            value={column}>{column}</Checkbox>
                ))}
              </Checkbox.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </SidebarLayout>
  )
}

export default Settlement
