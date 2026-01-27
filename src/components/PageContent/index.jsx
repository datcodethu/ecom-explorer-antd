import Sider from 'antd/es/layout/Sider'
import { Layout, theme } from 'antd'
import Sidebar from '../Sidebar/MainSider'

const { Content } = Layout

function PageContent(props) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { hasSider, children } = props

  return (
    <div className='flex flex-1 max-w-full'>
      {hasSider && (
        <Sider
          style={{ background: colorBgContainer }}
          width={200}
          breakpoint={'lg'}
          collapsedWidth={0}
          trigger={null}
          className='transition-colors duration-300'
        >
          <Sidebar />
        </Sider>
      )}

      <Content className='leading-normal px-5 max-w-full w-full max-w-7xl mx-auto transition-all duration-300'>
        {children}
      </Content>
    </div>
  )
}

export default PageContent
