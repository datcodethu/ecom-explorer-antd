import { useContext, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, App, Typography } from 'antd'
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
    <div
      style={{
        backgroundImage: 'url(https://picsum.photos/1920/1080)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className='min-h-screen w-full flex justify-center items-center p-6'
    >
      <div className='w-full max-w-[440px] glass-premium p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/20 dark:border-stone-800/40'>
        <div className='text-center mb-10'>
          <Typography.Title level={1} className='!m-0 !text-4xl !font-black !tracking-tighter !leading-none mb-3'>
            Welcome Back
          </Typography.Title>
          <Typography.Text className='text-xs font-bold uppercase tracking-[0.2em] opacity-40 italic'>
            Toni Store 🛍
          </Typography.Text>
        </div>

        <Form
          name='normal_login'
          layout='vertical'
          initialValues={{
            remember: true,
            username: 'emilys',
            password: 'emilyspass'
          }}
          onFinish={onFinish}
          requiredMark={false}
          className='space-y-4'
        >
          <Form.Item
            name='username'
            label={<span className='text-[10px] font-bold uppercase tracking-widest opacity-60'>Username</span>}
            rules={[{ required: true, message: 'Please input your username' }]}
          >
            <Input
              prefix={<UserOutlined className='opacity-40' />}
              placeholder='Your username'
              className='h-12 !rounded-xl !bg-stone-50/50 dark:!bg-stone-900/50 !border-stone-200 dark:!border-stone-800 focus:!border-accent'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label={<span className='text-[10px] font-bold uppercase tracking-widest opacity-60'>Password</span>}
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='opacity-40' />}
              placeholder='••••••••'
              className='h-12 !rounded-xl !bg-stone-50/50 dark:!bg-stone-900/50 !border-stone-200 dark:!border-stone-800 focus:!border-accent'
            />
          </Form.Item>

          <div className='flex items-center justify-between pb-2 pt-1'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox className='text-xs font-medium opacity-60 italic'>Stay signed in</Checkbox>
            </Form.Item>
            <a className='text-xs font-bold text-accent hover:underline uppercase tracking-tighter' href='#!'>
              Forgot?
            </a>
          </div>

          <Form.Item className='!mb-0'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full !h-14 !rounded-xl !bg-sky-900 dark:!bg-sky-100 dark:!text-sky-900 !border-none !text-xs !font-black !uppercase !tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl'
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>

          <div className='text-center pt-8 space-y-3 border-t border-sky-200/20 mt-4'>
            <div>
              <Link
                to='/'
                className='text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity flex items-center justify-center gap-2'
              >
                <span>←</span> Back to Home
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default Login
