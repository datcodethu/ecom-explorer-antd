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
          className={`flex flex-col w-full min-h-screen transition-all duration-1000 ${
            colorMode === 'dark' ? 'dark text-stone-100' : 'text-stone-900'
          } bg-[var(--bg-main)] ${className}`}
        >
          {children}
        </div>
      </AntApp>
    </ThemeProvider>
  )
}

export default App
