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
    <div className='max-w-6xl mx-auto py-8'>
      {!fetchingData && !!product ? (
        <Row gutter={[48, 48]}>
          <Col xs={24} md={12}>
            <div className='flex flex-col gap-6 sticky top-24'>
              <div className='bg-white rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 shadow-sm'>
                <Image src={product.thumbnail} className='max-h-full object-contain hover:scale-105 transition-transform duration-500' />
              </div>
              <div className='flex justify-center'>
                <Image.PreviewGroup>
                  <Space size='middle' wrap justify='center'>
                    {product.images.map((img, index) => (
                      <div key={index} className='w-16 h-16 rounded-xl overflow-hidden border border-stone-100 hover:border-accent cursor-pointer transition-colors bg-white p-1'>
                        <Image
                          src={img}
                          className='w-full h-full object-contain'
                          preview={true}
                        />
                      </div>
                    ))}
                  </Space>
                </Image.PreviewGroup>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='px-3 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest rounded-full leading-none'>
                    {product.brand || 'Luxury Collection'}
                  </span>
                  <span className='w-1 h-1 rounded-full bg-stone-300'></span>
                  <Link to={`/products/categories/${product.category}`} className='text-[10px] font-bold uppercase tracking-widest text-accent hover:underline'>
                    {makeUpLabel(product.category)}
                  </Link>
                </div>
                <Typography.Title level={1} className='!m-0 !text-4xl !font-bold !tracking-tight'>
                  {product.title}
                </Typography.Title>
                <div className='flex items-center gap-3 mt-2'>
                  <div className='flex items-center gap-1.5 px-2 py-1 bg-stone-50 border border-stone-100 rounded-md'>
                    <Rate value={product.rating} allowHalf disabled className='!text-xs !text-accent' />
                    <span className='text-xs font-bold'>{product.rating}</span>
                  </div>
                  <span className='text-xs text-stone-400 font-medium'>
                    {product.stock} items remaining
                  </span>
                </div>
              </div>

              <div className='flex items-baseline gap-4'>
                <span className='text-4xl font-bold text-stone-900'>
                  ${parseFloat((product.price * (100 - product.discountPercentage)) / 100).toFixed(0)}
                </span>
                <div className='flex items-center gap-2'>
                  <Typography.Text delete className='text-lg text-stone-400 font-medium'>
                    ${product.price}
                  </Typography.Text>
                  <span className='bg-accent text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase'>
                    Save {parseFloat(product.discountPercentage).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className='border-y border-stone-100 py-6'>
                <Typography.Text className='text-stone-600 leading-relaxed text-base italic'>
                  {product.description}
                </Typography.Text>
              </div>

              <div className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-bold uppercase tracking-wider text-stone-400'>Quantity</span>
                  <div className='flex items-center gap-1 bg-stone-100 p-1 rounded-full'>
                    <Button
                      shape='circle'
                      type='text'
                      icon={<MinusOutlined className='text-xs' />}
                      onClick={() => setCartQty(cartQty > 1 ? cartQty - 1 : 1)}
                      className='hover:!bg-white shadow-none'
                    />
                    <Input value={cartQty} readOnly className='!w-12 !border-none !bg-transparent text-center !font-bold shadow-none' />
                    <Button
                      shape='circle'
                      type='text'
                      icon={<PlusOutlined className='text-xs' />}
                      onClick={() => setCartQty(cartQty + 1)}
                      className='hover:!bg-white shadow-none'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Button
                    type='primary'
                    onClick={handleAddToCart}
                    loading={loadingAddToCart}
                    className='!h-14 !bg-stone-900 hover:!bg-stone-800 !border-none !rounded-xl !text-sm !font-bold !uppercase !tracking-widest transition-all'
                  >
                    Add to bag
                  </Button>
                  <Button
                    type='default'
                    onClick={handleCheckout}
                    loading={loadingCheckOut}
                    className='!h-14 !border-2 !border-stone-900 !text-stone-900 hover:!border-stone-700 hover:!text-stone-700 !rounded-xl !text-sm !font-bold !uppercase !tracking-widest transition-all'
                  >
                    Buy it now
                  </Button>
                </div>
              </div>

              <div className='flex flex-col gap-4 mt-4'>
                <div className='flex items-center gap-4 text-xs font-medium text-stone-400'>
                  <span className='flex items-center gap-2'><span className='text-accent'>✓</span> Free Shipping</span>
                  <span className='flex items-center gap-2'><span className='text-accent'>✓</span> 30-Day Returns</span>
                  <span className='flex items-center gap-2'><span className='text-accent'>✓</span> Secure Checkout</span>
                </div>
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
    </div>
  )
}

export default Product
