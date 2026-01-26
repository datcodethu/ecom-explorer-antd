import { Typography } from 'antd'

function AppFooter() {
  return (
    <div className='flex items-center justify-center gap-1 opacity-80 select-none'>
      Made with ❤️ by
      <Typography.Link href='https://github.com/tonidevvn' target='_blank'>
        {' Toni'}
      </Typography.Link>
    </div>
  )
}

export default AppFooter
