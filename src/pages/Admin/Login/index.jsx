import React, { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, App } from 'antd'
import AppLayout from '../../../App'
import { getAuth } from '../../../services'
import { AppContext } from '../../../context'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const { user, setUser } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const { message: messageApi } = App.useApp()
  const navigator = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem('user')
    if (!!userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [setUser])

  useEffect(() => {
    if (!!user) {
      localStorage.setItem('user', JSON.stringify(user))
      setTimeout(() => {
        setLoading(false)
        navigator('/admin/dash-board')
      }, 500)
    } else localStorage.setItem('user', '')
  }, [user, navigator])

  const onFinish = (values) => {
    setLoading(true)
    // console.log('Received values of form: ', values)
    getAuth(values)
      .then((res) => {
        messageApi.success(`Hi ${values.username}. Welcome back.`)
        setUser(res)
      })
      .catch((err) => messageApi.error(err.message))
  }

  return (
    <AppLayout
      style={{
        backgroundImage: 'url(https://picsum.photos/1920/1080)',
        backgroundOrigin: 'content-box, padding-box'
      }}
      className='bg-cover'
    >
      <Form
        name='normal_login'
        className='p-[25px] m-auto bg-slate-500/25 max-w-[380px] rounded-lg shadow-xl backdrop-blur-sm'
        initialValues={{
          remember: true,
          username: 'emilys',
          password: 'emilyspass'
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className='' />} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input prefix={<LockOutlined className='' />} type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='float-right' href='#!'>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full' loading={loading}>
            Log in
          </Button>
          Or <a href='#!'>register now!</a> <br />
          Or <Link to='/'>back to home page</Link>
        </Form.Item>
      </Form>
    </AppLayout>
  )
}
export default Login
