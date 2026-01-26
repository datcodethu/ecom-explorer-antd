import { Avatar, Badge, Button, Popover, Typography } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context'
import { removeCartItem } from '../../utils'
import { useNavigate } from 'react-router-dom'

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const navigator = useNavigate()
  const [popovervisible, setPopovervisible] = useState(false)

  useEffect(() => {
    const cartHistory = JSON.parse(localStorage.getItem('order'))
    if (!!cartHistory) {
      // console.log('🚀 ~ file: index.js:16 ~ useEffect ~ cartHistory:', cartHistory)
      setCartItems([...cartHistory])
    }
  }, [setCartItems])

  useEffect(() => {
    if (!!cartItems) localStorage.setItem('order', JSON.stringify(cartItems))
    else localStorage.setItem('order', '')
  }, [cartItems])

  const handleCheckoutSubmit = () => {
    navigator('/cart')
    setPopovervisible(false)
  }

  const CartHolder = () => {
    const handleRemoveCartItem = (item) => {
      const newCartItems = removeCartItem(cartItems, item)
      setCartItems(newCartItems)
    }

    return (
      <div className='cartHolder w-[400px] max-w-[80vw]'>
        <div className='max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar'>
          {cartItems.length > 0 ? (
            <div className='divide-y divide-slate-100 dark:divide-slate-800'>
              {cartItems.map((item, index) => (
                <div key={item.id || index} className='py-4 flex items-center justify-between gap-4 group'>
                  <div className='flex items-center gap-3 overflow-hidden'>
                    <Avatar
                      src={item.thumbnail}
                      size='large'
                      className='flex-shrink-0 border border-slate-100 dark:border-slate-700'
                    />
                    <div className='flex flex-col min-w-0'>
                      <a
                        href='/'
                        className='text-slate-900 dark:text-slate-100 font-medium truncate hover:text-blue-500 transition-colors'
                      >
                        {item.title}
                      </a>
                      <Typography.Text type='danger' strong className='text-xs'>
                        {item.quantity} x ${item.price}
                      </Typography.Text>
                    </div>
                  </div>
                  <button
                    className='opacity-60 group-hover:opacity-100 p-2 hover:bg-red-50 dark:hover:bg-red-900/60 rounded-full text-gray-500 hover:text-red-600 transition-all cursor-pointer flex-shrink-0 size-8 flex items-center justify-center'
                    onClick={() => handleRemoveCartItem(item)}
                    title='Remove item'
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='py-8 text-center text-slate-400 italic text-sm'>Your cart is empty</div>
          )}
        </div>

        <div className='mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3'>
          {cartItems.length > 0 && (
            <div className='flex justify-between items-center'>
              <span className='text-slate-500 dark:text-slate-400'>Total:</span>
              <span className='text-lg font-bold text-slate-900 dark:text-white'>
                ${cartItems.reduce((acc, item) => acc + item.total, 0)}
              </span>
            </div>
          )}
          <Button type='primary' onClick={() => handleCheckoutSubmit()} className='w-full !h-10 font-bold'>
            Checkout
          </Button>
        </div>
      </div>
    )
  }

  const handlePopoverChange = (newOpen) => {
    setPopovervisible(newOpen)
  }

  return (
    <>
      <Popover
        placement='bottomRight'
        title={'Your Cart'}
        content={<CartHolder />}
        trigger='click'
        open={popovervisible}
        onOpenChange={handlePopoverChange}
      >
        <Badge count={cartItems.length || 0}>
          <ShoppingCartOutlined className='shoppingCardIcon' />
        </Badge>
      </Popover>
    </>
  )
}

export default ShoppingCart
