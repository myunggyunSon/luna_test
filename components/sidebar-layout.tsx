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
  SearchOutlined,
  CarOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons'
import { Colors } from '../infra/colors'
import { CONTENT_PADDING } from '../infra/constants'
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
            key={'0'}
            icon={<SearchOutlined/>}>
            <Link href={Route.ORDER_LOOKUP}>{'화물 조회'}</Link>
          </Menu.Item>

        </Menu>
        <Menu theme={'dark'}>
          <Menu.Item
            key={'1'}
            icon={<CarOutlined/>}>
            <Link href={Route.ORDER}>{'화물 등록'}</Link>
          </Menu.Item>
        </Menu>
        <Menu theme={'dark'}>
          <Menu.Item
            key={'2'}
            icon={<MoneyCollectOutlined/>}>
            <Link href={Route.SETTLEMENT}>{'정산'}</Link>
          </Menu.Item>
        </Menu>
        <Menu theme={'dark'}>
          <Menu.Item
            key={'2'}
            icon={<MoneyCollectOutlined/>}>
            <Link href={Route.PAYMENT}>{'결제 및 자금 집행'}</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: Colors.blue }}>
        <Header style={{ backgroundColor: '#001529', height: '40px' }}>
          <Row justify="space-between" align="middle">
            <p>안녕</p>
            <p>안녕</p>
          </Row>
        </Header>
        <Content style={{padding: CONTENT_PADDING}}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
