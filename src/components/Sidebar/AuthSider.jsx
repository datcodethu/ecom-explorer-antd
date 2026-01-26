import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import AuthMenu from '../Menu/AuthMenu'

function AuthSider() {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ background: colorBgContainer }}
      breakpoint={'lg'}
      className='max-[992px]:!hidden transition-all duration-300'
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='!text-base !w-16 !h-16'
      />
      <AuthMenu />
    </Sider>
  )
}

export default AuthSider
