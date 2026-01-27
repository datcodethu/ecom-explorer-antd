import { Layout, Breadcrumb } from 'antd'
import { Outlet, useParams } from 'react-router-dom'
import AppFooter from '../components/Footer'
import AppHeader from '../components/Header/AppHeader'
import { hashidsDecode, makeUpLabel } from '../utils'
import App from '../App'
import { getSingleProduct } from '../services'
import { useEffect, useState } from 'react'
const { Header, Footer, Content } = Layout

function DefaultLayout(props) {
  const [breadCrumbs, setBreadCrumbs] = useState([])

  const params = useParams()
  const cid = params.categoryId
  const pid = params.productId

  useEffect(() => {
    if (!!cid) {
      setBreadCrumbs([
        { title: 'Home', href: '/' },
        { title: makeUpLabel(cid), href: `/products/categories/${cid}` }
      ])
    } else if (!!pid) {
      getSingleProduct(hashidsDecode(pid)).then((resp) => {
        setBreadCrumbs([
          { title: 'Home', href: '/' },
          {
            title: makeUpLabel(resp.category),
            href: `/products/categories/${resp.category}`
          }
        ])
      })
    } else {
      setBreadCrumbs([{ title: 'Home', href: '/' }])
    }
  }, [cid, pid])

  return (
    <Layout className='!bg-inherit'>
      <Header className='overflow-hidden text-center h-16 !px-12 !leading-[64px] !bg-inherit shadow-[1px_4px_4px_rgba(255,255,255,0.2)] fixed top-0 w-full z-10'>
        <AppHeader />
      </Header>
      <Content className='flex flex-col flex-1 text-center min-h-[120px] !leading-auto pt-[64px] px-12 pb-0'>
        <Breadcrumb className='!my-4 px-[15px]' items={breadCrumbs}></Breadcrumb>
        <Layout className='py-3 !bg-inherit'>
          <Outlet />
          {props.children}
        </Layout>
      </Content>

      <Footer className='text-center h-[60px] !text-emerald-50 !bg-black flex items-center justify-center'>
        <AppFooter />
      </Footer>
    </Layout>
  )
}

export default DefaultLayout
