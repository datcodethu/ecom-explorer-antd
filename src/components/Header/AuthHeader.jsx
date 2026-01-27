import { Badge, Button, Drawer, Popover, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { BellOutlined, CoffeeOutlined, MailOutlined, MenuOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AuthMenu from '../Menu/AuthMenu'
import { getComments, getSingleCart } from '../../services'

function AuthHeader() {
  const [visible, setVisible] = useState(false)
  const [showingMessages, setShowingMessages] = useState(false)
  const [comments, setComments] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments.slice(0, 10))
    })

    getSingleCart().then((res) => {
      setMessages(res.products.slice(0, 10))
    })
  }, [])

  return (
    <div className='flex flex-row flex-wrap items-center justify-between h-16 w-full'>
      <div>
        <Button icon={<MenuOutlined />} onClick={() => setVisible(true)} type='dashed' className='lg:!hidden'></Button>

        <Drawer title='Toni Store' placement='left' onClose={() => setVisible(false)} open={visible}>
          <AuthMenu />
        </Drawer>
      </div>
      <div className='appTitle'>
        <Link to='/admin/dash-board'>
          <Typography.Title>
            <CoffeeOutlined style={{ fontSize: '24px' }} /> IamAdmin
          </Typography.Title>
        </Link>
      </div>
      <div className='appNotif'>
        <Space size='middle'>
          <Popover
            placement='bottom'
            trigger='click'
            title='Notifications'
            content={
              <div className='max-h-[300px] overflow-y-auto w-[320px] px-4'>
                {comments.length > 0 ? (
                  <div className='divide-y divide-slate-100 dark:divide-slate-800'>
                    {comments.map((comment, index) => (
                      <div key={comment.id || index} className='py-2 text-sm'>
                        <Typography.Text mark className='mr-1 px-1 rounded'>
                          [{comment.user.username}]
                        </Typography.Text>{' '}
                        <span className='text-slate-600 dark:text-slate-400'>{comment.body}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='py-4 text-center text-slate-400 italic text-xs'>No notifications</div>
                )}
              </div>
            }
          >
            <Badge dot className='appNotifStyle'>
              <MailOutlined style={{ fontSize: '24px' }} />
            </Badge>
          </Popover>
          <Badge count={messages.length} className='appNotifStyle' onClick={() => setShowingMessages(true)}>
            <BellOutlined style={{ fontSize: '24px' }} />
          </Badge>
          <Drawer
            title='New Messages'
            placement='right'
            onClose={() => setShowingMessages(false)}
            open={showingMessages}
          >
            <div className='divide-y divide-slate-100 dark:divide-slate-800'>
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={message.id || index} className='py-3 flex gap-2'>
                    <span className='flex-shrink-0'>🔔</span>
                    <span className='text-sm text-slate-700 dark:text-slate-300'>
                      <Typography.Text strong>{message.title}</Typography.Text> has been ordered
                    </span>
                  </div>
                ))
              ) : (
                <div className='py-8 text-center text-slate-400 italic'>No new messages</div>
              )}
            </div>
          </Drawer>
        </Space>
      </div>
    </div>
  )
}

export default AuthHeader
