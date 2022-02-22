import { HomeOutlined, PhoneOutlined } from '@ant-design/icons'
import { Card, Checkbox, Col, DatePicker, Divider, Form, FormInstance, Input, Modal, Row, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import DaumPostcode from 'react-daum-postcode'

const LoaderForm = (props: { isLoad: boolean, form: FormInstance },
                    //                    setIsOpenPost: (isOpenPost: boolean) => {}, isOpenPost: boolean
) => {

  const { isLoad, form } = props
  const [isOpenPost, setIsOpenPost] = useState(false)
  return (
    <Card bodyStyle={{ padding:10}} title={isLoad ? '출발지' : '도착지'}>
      <Form
        form={form}
        layout={'vertical'}
      >
        <Row gutter={[8, 0]} style={{ margin: 0 }}>
          <Col span={24}>
            <Form.Item style={{marginBottom:12}} label={'기본 주소 검색 (필수)'} rules={[{ required: true }]}>
              <Input.Search
                onClick={() => {
                  setIsOpenPost(true)
                }}
                onSearch={() => {
                  setIsOpenPost(true)
                }}
                enterButton="주소검색"
                placeholder={'이곳을 눌러 주소를 검색하세요'}/>
              {isOpenPost &&
                <Modal visible={true}
                       cancelText={''}
                       onOk={() => {
                         setIsOpenPost(false)
                       }}>
                  <DaumPostcode onComplete={(data) => {
                    form.setFieldsValue({ mainAddress: data.address })
                    setIsOpenPost(false)
                  }}/>
                </Modal>
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{marginBottom:12}}  label="기본 주소" name={'mainAddress'} rules={[{ required: true }]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{marginBottom:12}}  label="상세 주소" name={'subAddress'}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="회사명" name={'loaderName'}>
              <Input
                placeholder={'회사명을 입력하세요'}
                prefix={<HomeOutlined/>}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{marginBottom:12}}  label="연락처" name={'loaderPhone'} rules={[{ required: true }]}>
              <Input
                placeholder={'연락처를 입력하세요'}
                prefix={<PhoneOutlined/>}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{marginBottom:12}}  label="시간" name={'loadingDateTime'} rules={[{ required: true }]}>
              <DatePicker
                placeholder="시간을 선택하세요"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                // TODO moment 조절하기
                defaultValue={moment()}
              />
              {
                <Checkbox style={{ marginTop: 8 }} onChange={() => {
                }}>{isLoad ? '즉시 상차' : '오늘 하차'}</Checkbox>
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider style={{}}/>
      <Tooltip
        overlayInnerStyle={{ padding: 0 }} // 이래야 검정 띠가 없음
        title={
          <Card size={'small'} title={`${isLoad ? '상차' : '하차'}시간 엄수`}><p>차주에게 {isLoad ? '상차' : '하차'}시간을 꼭 지켜달라고
            전달합니다</p></Card>
        }
      >
        <Checkbox onChange={() => {
        }}>{isLoad ? '상차' : '하차'}시간 엄수</Checkbox>
      </Tooltip>

      {isLoad && <Checkbox onChange={() => {
      }}>이 주소를 기본 주소지로 설정</Checkbox>}
    </Card>
  )
}

export default LoaderForm
