import { useContext } from 'react'
import ThemeProvider from './themes/ThemeProvider'
import { AppContext } from './context'
import { App as AntApp } from 'antd'

function App({ children, className = '', style = {} }) {
  const { colorMode } = useContext(AppContext)
  return (
    <ThemeProvider>
      <AntApp className='h-full'>
        <div
          style={style}
          className={`flex flex-col w-full h-auto min-h-screen transition-colors duration-300 ${
            colorMode === 'dark' ? 'bg-black text-white dark' : 'bg-white text-black'
          } [&_header]:!bg-inherit [&_main]:!bg-inherit [&_.ant-layout]:!bg-inherit [&_header]:!text-inherit [&_main]:!text-inherit [&_.ant-layout]:!text-inherit ${className}`}
        >
          {children}
        </div>
      </AntApp>
    </ThemeProvider>
  )
}

export default App
