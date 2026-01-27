import { Layout, theme } from 'antd'
import AppFooter from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import AuthHeader from '../components/Header/AuthHeader'
import AuthSider from '../components/Sidebar/AuthSider'
import App from '../App'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context'
const { Header, Footer, Content } = Layout

function AuthLayout(props) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { user, setUser } = useContext(AppContext)
  const userInfo = localStorage.getItem('user')

  useEffect(() => {
    if (!!userInfo) setUser(JSON.parse(userInfo))
  }, [setUser, userInfo])

  useEffect(() => {
    if (!!user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.setItem('user', '')
  }, [user])

  if (!user || !userInfo) {
    // console.log('🚀 ~ file: AuthLayout.js:61 ~ AuthLayout ~ user:', user)

    // user is not authenticated
    return <Navigate to='/login' />
  }

  return (
    <>
      {!!user ? (
        <>
          <Header className='overflow-hidden text-center h-16 !px-12 !leading-[64px] !bg-inherit shadow-[1px_4px_4px_rgba(0,0,0,0.2)] w-full'>
            <AuthHeader />
          </Header>
          <Content className='flex flex-1 !leading-auto my-5'>
            <Layout className='!bg-inherit'>
              <AuthSider />
              <Content
                style={{ background: colorBgContainer }}
                className='!leading-auto p-5 m-2.5 rounded-lg shadow-sm transition-colors duration-300'
              >
                <Outlet />
                {props.children}
              </Content>
            </Layout>
          </Content>
        </>
      ) : (
        <>
          <Content className='flex flex-1 !leading-auto my-5'>
            <Outlet />
            {props.children}
          </Content>
        </>
      )}

      <Footer className='text-center h-[60px] !text-emerald-50 !bg-black flex items-center justify-center'>
        <AppFooter />
      </Footer>
    </>
  )
}

export default AuthLayout
