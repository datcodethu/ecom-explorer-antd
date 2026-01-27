import { useContext, useEffect, useState } from 'react'
import { getAllProducts, getProductsByCategory, getProductsByKeyword } from '../../services'
import { Button, Card, Image, Rate, Tabs, App } from 'antd'

import { Typography, Badge } from 'antd'
import { AppContext } from '../../context'
import { addCartItem, hashidsEncode } from '../../utils'
import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, UpOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card

const AddToCardButton = ({ item }) => {
  const [isLoading, setIsLoading] = useState()
  const { message: messageApi } = App.useApp()

  const { cartItems, setCartItems } = useContext(AppContext)

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    messageApi.success(`${item.title} added to bag 👌`)
    let newCartItems = addCartItem(cartItems, item)
    setCartItems(newCartItems)

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button
      type='primary'
      onClick={onClick}
      loading={isLoading}
      className='!w-full !bg-stone-900 dark:!bg-stone-100 dark:!text-stone-900 hover:!opacity-80 !border-none !rounded-xl !h-10 !text-[10px] !font-black !uppercase !tracking-[0.2em] !shadow-lg active:!scale-95 transition-all'
    >
      Add to bag
    </Button>
  )
}

const ListProducts = ({ products }) => {
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setProductsData(products)
      setLoading(false)
      setCurrentPage(1)
    }, 1000)
  }, [products])

  const indexOfLastProduct = currentPage * pageSize
  const indexOfFirstProduct = indexOfLastProduct - pageSize
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(productsData.length / pageSize)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 mb-12'>
        {currentProducts.map((product) => (
          <div key={product.id} className='group relative h-full'>
            <Badge.Ribbon
              text={`${parseFloat(product.discountPercentage).toFixed()}% OFF`}
              color='#0ea5e9'
              className='!font-bold !text-xs uppercase tracking-tighter'
            >
              <Card
                className='h-full flex flex-col border-none shadow-none bg-transparent p-2'
                cover={
                  <Link
                    to={`/products/${hashidsEncode(product.id)}`}
                    className='block overflow-hidden rounded-2xl bg-white'
                  >
                    <Image
                      alt={product.title}
                      className='w-full h-auto aspect-[16/9] object-contain p-4 group-hover:scale-105 transition-transform duration-500'
                      src={`${product.thumbnail}`}
                      loading='lazy'
                      preview={false}
                    />
                  </Link>
                }
              >
                <div className='flex flex-col gap-3'>
                  <div className='flex justify-between items-start gap-2'>
                    <Link to={`/products/${hashidsEncode(product.id)}`} className='flex-1'>
                      <Typography.Title
                        level={5}
                        className='!m-0 !text-lg !font-semibold !leading-tight group-hover:text-accent transition-colors truncate'
                        ellipsis={true}
                        rows={1}
                      >
                        {product.title}
                      </Typography.Title>
                    </Link>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <Rate value={product.rating} allowHalf disabled className='!text-[10px] !text-accent' />
                      <span className='text-[10px] font-medium opacity-40 uppercase tracking-widest'>
                        ({product.rating})
                      </span>
                    </div>

                    <div className='flex items-baseline gap-2'>
                      <span className='text-xl font-bold text-stone-900 dark:text-stone-100'>
                        ${parseFloat((product.price * (100 - product.discountPercentage)) / 100).toFixed(0)}
                      </span>
                      <Typography.Text delete className='text-sm opacity-40 font-medium'>
                        ${product.price}
                      </Typography.Text>
                    </div>
                  </div>

                  <div className='mt-2 grid grid-cols-1 gap-2'>
                    <AddToCardButton item={product} />
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-3 mt-12 mb-8'>
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className='cursor-pointer flex items-center justify-center p-3 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all'
          >
            ←
          </button>

          <div className='flex gap-2 font-medium'>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xl scale-110'
                    : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className='cursor-pointer flex items-center justify-center p-3 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all'
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}

function Products({ category, query }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!!query) {
      // console.log('🚀 ~ file: index.js:143 ~ useEffect ~ query:', query)
      getProductsByKeyword(query).then((resp) => {
        // console.log('🚀 ~ file: index.js:38 ~ getProductsByKeyword ~ resp:', resp.products)
        setProducts(resp.products)
      })
    } else if (!!category) {
      getProductsByCategory(category).then((resp) => {
        // console.log('🚀 ~ file: index.js:38 ~ getProductsByCategory ~ resp:', resp.products)
        setProducts(resp.products)
      })
    } else {
      getAllProducts().then((resp) => {
        // console.log('🚀 ~ file: index.js:8 ~ getAllProducts ~ resp:', resp.products)
        setProducts(resp.products)
      })
    }
  }, [category, query])

  const sortProductsBy = (sortedBy) => {
    const sortedArr = [...products].sort((a, b) => {
      if (sortedBy === 'az') return a.title > b.title ? 1 : a.title === b.title ? 0 : -1
      else if (sortedBy === 'za') return a.title > b.title ? -1 : a.title === b.title ? 0 : 1
      else if (sortedBy === 'lh') return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
      else if (sortedBy === 'hl') return a.price > b.price ? -1 : a.price === b.price ? 0 : 1
      else return a.title > b.title ? 1 : a.title === b.title ? 0 : -1
    })
    setProducts(sortedArr)
  }

  const onChange = (key) => {
    //console.log(key);
    sortProductsBy(key)
  }

  const sortBy = [
    {
      key: 'az',
      label: (
        <>
          AZ <SortAscendingOutlined />
        </>
      )
    },
    {
      key: 'za',
      label: (
        <>
          ZA <SortDescendingOutlined />
        </>
      )
    },
    {
      key: 'lh',
      label: (
        <>
          Price <UpOutlined />
        </>
      )
    },
    {
      key: 'hl',
      label: (
        <>
          Price <DownOutlined />
        </>
      )
    }
  ]

  return (
    <>
      {!!products && !!products.length ? (
        <>
          <Tabs tabPlacement='top' items={sortBy} onChange={onChange} style={{ width: '100%', maxWidth: '80vw' }} />
          <ListProducts products={products} />
        </>
      ) : (
        <ListProducts products={products} />
      )}
    </>
  )
}

export default Products
