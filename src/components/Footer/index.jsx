import { Typography } from 'antd'

function AppFooter() {
  return (
    <div className='flex items-center justify-center gap-1 opacity-90 select-none'>
      Made with ❤️ by
      <Typography.Link href='https://github.com/tonidevvn' target='_blank'>
        {' Toni'}
      </Typography.Link>
      . All rights reserved.
    </div>
  )
}

export default AppFooter
