import React, { useState } from 'react'
import {
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Spin,
  Typography,
} from 'antd'

import Link from 'next/link'

import {
  BulbOutlined,

} from '@ant-design/icons'
import { Route } from '../infra/route'

const { Header, Content, Footer, Sider } = Layout

export const SidebarLayout = (props: any) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={false}>
        <Typography.Title
          level={4}
          style={{
            padding: '18px 0 4px 0',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          MENU
        </Typography.Title>
        <Menu theme={'dark'}>
          <Menu.Item
            key={'1'}
            icon={<BulbOutlined/>}>
            <Link href={Route.ORDER}>{'배차 요청'}</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#fff' }}>
          <Row justify='center' align='middle'>
            <Col><Typography.Title>LUNA</Typography.Title></Col>
          </Row>
        </Header>
        <Content>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
