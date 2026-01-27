import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '../../services'
import { Button, Col, Image, Input, Rate, Row, Skeleton, Space, Typography, App } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { addCartItem, addCartItems, hashidsDecode, makeUpLabel } from '../../utils'
import { AppContext } from '../../context'

function Product() {
  const [product, setProduct] = useState()
  const [cartQty, setCartQty] = useState(1)
  const [loadingCheckOut, setLoadingCheckOut] = useState(false)
  const [loadingAddToCart, setLoadingAddToCart] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const { message: messageApi } = App.useApp()
  const { cartItems, setCartItems } = useContext(AppContext)
  const navigator = useNavigate()

  const params = useParams()
  const key = params.productId
  // console.log('🚀 ~ file: index.js:8 ~ Product ~ key:', hashidsDecode(key))

  useEffect(() => {
    setFetchingData(true)
    getSingleProduct(hashidsDecode(key)).then((resp) => {
      // console.log('🚀 ~ file: index.js:13 ~ getSingleProduct ~ resp:', resp)
      setTimeout(() => {
        setProduct(resp)
        setFetchingData(false)
      }, 1000)
    })
  }, [key])

  const handleAddToCart = () => {
    setLoadingAddToCart(true)

    messageApi.success(`${product.title} has been added to cart 👌`)
    let addedItems = Array.from({ length: cartQty }, () => product)
    // console.log('🚀 ~ file: index.js:50 ~ handleAddToCart ~ addedItems:', addedItems)

    let newCartItems = addCartItems(cartItems, addedItems)
    setCartItems(newCartItems)
    setTimeout(() => {
      setLoadingAddToCart(false)
    }, 1500)
  }

  const handleCheckout = () => {
    setLoadingCheckOut(true)

    messageApi.success(`${product.title} has been added to cart 👌`)
    let newCartItems = addCartItem(cartItems, product)
    setCartItems(newCartItems)
    setTimeout(() => {
      setLoadingCheckOut(false)
      navigator('/cart')
    }, 1500)
  }

  return (
    <>
      {!fetchingData && !!product ? (
        <Row gutter={[8, 16]} wrap>
          <Col flex={2} xs={0} sm={0} md={10}>
            <div className='flex flex-col'>
              <div className='p-[25px] flex justify-center'>
                <Image src={product.thumbnail} width={300} className='rounded-lg shadow-sm' />
              </div>
              <div className='flex justify-center'>
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => {} // console.log(`current index: ${current}, prev index: ${prev}`)
                  }}
                >
                  <Space size={'middle'} wrap justify='center'>
                    {product.images.map((img, index) => (
                      <Image
                        src={img}
                        width={60}
                        key={index}
                        className='rounded border border-slate-200 p-1 hover:border-blue-400 cursor-pointer transition-colors'
                      />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              </div>
            </div>
          </Col>
          <Col flex={3} sm={24} md={14}>
            <div className='flex flex-col gap-4'>
              <Typography.Title level={3} className='!mb-0 !text-2xl !font-bold'>
                {product.title}
              </Typography.Title>
              <div className='px-4'>
                <Space>
                  <Rate value={product.rating} allowHalf disabled></Rate>
                  <Typography.Text strong className='bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded'>
                    Sold {product.stock}
                  </Typography.Text>
                </Space>
              </div>
              <div className='px-4 flex items-center justify-start gap-6'>
                <span className='text-3xl font-bold text-slate-900 dark:text-white'>
                  Price: ${parseFloat((product.price * (100 - product.discountPercentage)) / 100).toFixed(0)}
                </span>
                <div className='flex flex-row gap-2 items-center'>
                  <Typography.Text className='bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-bold w-fit'>
                    {parseFloat(product.discountPercentage).toFixed(0)}% OFF
                  </Typography.Text>
                  <Typography.Text delete strong type='danger' className='text-base opacity-60'>
                    ${product.price}
                  </Typography.Text>
                </div>
              </div>
              <div className='flex flex-col w-full max-w-md gap-2 items-start'>
                <div className='flex p-4 border-b border-slate-50 dark:border-slate-800/50'>
                  <span className='w-1/4 min-w-[85px] text-slate-500 font-medium'>Brand</span>
                  <span className='flex-1 font-semibold'>{product.brand || 'Unknown'}</span>
                </div>
                <div className='flex p-4 border-b border-slate-50 dark:border-slate-800/50'>
                  <span className='w-1/4 min-w-[85px] text-slate-500 font-medium'>Category</span>
                  <span className='flex-1'>
                    <Link
                      to={`/products/categories/${product.category}`}
                      className='text-blue-500 hover:underline font-semibold'
                    >
                      {makeUpLabel(product.category)}
                    </Link>
                  </span>
                </div>
                <div className='flex items-center p-4 border-b border-slate-50 dark:border-slate-800/50'>
                  <span className='w-1/4 min-w-[85px] text-slate-500 font-medium'>Delivery</span>
                  <span className='flex-1 font-semibold text-green-600'>FREE Delivery 📦</span>
                </div>
                <div className='flex items-center p-4'>
                  <span className='w-1/4 min-w-[85px] text-slate-500 font-medium'>Quantity</span>
                  <div className='flex-1 flex items-center gap-1'>
                    <Button
                      onClick={() => setCartQty(cartQty > 0 ? cartQty - 1 : 0)}
                      className='!px-2.5 !w-[35px] !rounded-sm'
                    >
                      <MinusOutlined />
                    </Button>
                    <Input value={cartQty} min={0} className='!w-[50px] !rounded-sm text-center' />
                    <Button onClick={() => setCartQty(cartQty + 1)} className='!px-2.5 !w-[35px] !rounded-sm'>
                      <PlusOutlined />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='px-4'>
                <Typography.Text className='text-slate-600 dark:text-slate-400 italic leading-relaxed'>
                  {product.description}
                </Typography.Text>
              </div>

              <div className='px-4 flex gap-4 mt-4'>
                <Button
                  type='primary'
                  onClick={handleAddToCart}
                  loading={loadingAddToCart}
                  className='h-12 px-8 text-lg font-bold'
                >
                  Add To cart
                </Button>
                <Button
                  type='primary'
                  danger
                  onClick={handleCheckout}
                  loading={loadingCheckOut}
                  className='h-12 px-8 text-lg font-bold'
                >
                  Checkout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Row gutter={[8, 16]} wrap>
          <Col flex={2} xs={0} sm={0} md={10}>
            <div className='flex flex-col'>
              <div className='p-[25px] flex justify-center'>
                <Skeleton.Image active style={{ width: '200px' }} />
              </div>
              <div className='flex justify-center'>
                <Space size={'middle'}>
                  <Skeleton.Image active style={{ width: '50px', height: '25px' }} />
                  <Skeleton.Image active style={{ width: '50px', height: '25px' }} />
                  <Skeleton.Image active style={{ width: '50px', height: '25px' }} />
                  <Skeleton.Image active style={{ width: '50px', height: '25px' }} />
                </Space>
              </div>
            </div>
          </Col>
          <Col flex={3} sm={24} md={14}>
            <div className='flex flex-col gap-4'>
              <Skeleton.Input active size={'default'} />
              <div className='px-4'>
                <Space>
                  <Skeleton.Input active size={'small'} />
                  <Skeleton.Input active size={'small'} />
                </Space>
              </div>
              <div className='px-4'>
                <Skeleton.Input active size={'default'} />
              </div>
              <div className='px-4'>
                <Skeleton
                  paragraph={{
                    rows: 3
                  }}
                  active
                />
              </div>
              <div className='px-4'>
                <Skeleton
                  paragraph={{
                    rows: 1
                  }}
                  active
                />
              </div>
              <div className='px-4 flex gap-4 mt-4'>
                <Skeleton.Button active className='!h-12 !w-32' />
                <Skeleton.Button active className='!h-12 !w-32' />
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Product
