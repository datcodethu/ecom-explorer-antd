import { Link } from 'react-router-dom'
import ShoppingCart from '../ShoppingCart'
import MainMenu from '../Menu/MainMenu'
import SearchBox from '../SearchBox'
import { Typography } from 'antd'
import ToogleModeColor from '../DarkMode'

function AppHeader() {
  return (
    <div className='flex flex-row flex-wrap items-center justify-between h-[64px] w-full'>
      <div className='w-[10%] lg:w-[45%] h-full'>
        <MainMenu />
      </div>
      <div className='flex items-center justify-center flex-grow text-center h-full'>
        <Link to='/' className='hover:opacity-80 transition-opacity'>
          <Typography.Title level={2} className='!m-0 !text-2xl whitespace-nowrap !font-heading !tracking-wider'>
            Toni Store 🛍️
          </Typography.Title>
        </Link>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <SearchBox />
        <ShoppingCart />
        <span className='w-[1px] h-6 bg-gray-300'></span>
        <ToogleModeColor />
      </div>
    </div>
  )
}

export default AppHeader
