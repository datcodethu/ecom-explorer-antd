import { Link } from 'react-router-dom'
import ShoppingCart from '../ShoppingCart'
import MainMenu from '../Menu/MainMenu'
import SearchBox from '../SearchBox'
import { Typography } from 'antd'
import ToogleModeColor from '../DarkMode'

function AppHeader() {
  return (
    <div className='flex flex-row flex-wrap items-center justify-between h-16 w-full'>
      <div className='w-[10%] lg:w-[45%]'>
        <MainMenu />
      </div>
      <div className='flex-grow text-center'>
        <Link to='/' className='hover:opacity-80 transition-opacity'>
          <Typography.Title level={2} className='!m-0 !text-2xl whitespace-nowrap'>
            Toni Store 🛍
          </Typography.Title>
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <div className='cursor-pointer select-none'>
          <SearchBox />
        </div>
        <div className='cursor-pointer select-none'>
          <ToogleModeColor />
        </div>
        <div className='cursor-pointer select-none'>
          <ShoppingCart />
        </div>
      </div>
    </div>
  )
}

export default AppHeader
