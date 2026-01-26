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

  const onClick = () => {
    setIsLoading(true)
    messageApi.success(`${item.title} has been added to cart 👌`)
    let newCartItems = addCartItem(cartItems, item)
    setCartItems(newCartItems)
    // console.log('🚀 ~ file: index.js:24 ~ CartHolder ~ cartItems:', newCartItems)

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button type='link' onClick={onClick} loading={isLoading}>
      Add to card
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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
        {currentProducts.map((product) => (
          <div key={product.id} className='m-2 transition-all duration-300 hover:-translate-y-2 h-full'>
            <Badge.Ribbon
              text={`${parseFloat(product.discountPercentage).toFixed()}% OFF`}
              color='volcano'
              placement='start'
            >
              <Card
                hoverable
                className='w-full h-auto flex flex-col border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md'
                cover={
                  <Image
                    alt={product.title}
                    className='w-full h-auto aspect-4/3 flex items-center justify-center p-2 object-contain'
                    src={`${product.thumbnail}`}
                  />
                }
                actions={[
                  <div key='rating' className='flex justify-center py-2 border-t dark:border-slate-800'>
                    <Rate value={product.rating} allowHalf disabled className='text-xs' />
                  </div>,
                  <div key='add-to-cart' className='border-t dark:border-slate-800'>
                    <AddToCardButton item={product} />
                  </div>
                ]}
              >
                <Meta
                  title={
                    <div className='flex flex-col gap-1'>
                      <Typography.Title level={5} className='!m-0 line-clamp-1'>
                        <Link to={`/products/${hashidsEncode(product.id)}`} className='hover:text-blue-500'>
                          {product.title}
                        </Link>
                      </Typography.Title>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg font-bold text-slate-900 dark:text-white'>
                          ${parseFloat((product.price * (100 - product.discountPercentage)) / 100).toFixed(0)}
                        </span>
                        <Typography.Text delete type='danger' className='text-sm opacity-60'>
                          ${product.price}
                        </Typography.Text>
                      </div>
                    </div>
                  }
                  description={
                    <Typography.Paragraph className='!mb-0' ellipsis={{ rows: 2, expandable: false }}>
                      {product.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8 mb-4'>
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className='cursor-pointer flex items-center gap-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            Previous
          </button>

          <div className='flex gap-1'>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                  currentPage === i + 1
                    ? 'bg-blue-600 border-blue-600 !text-white hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-blue-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className='cursor-pointer flex items-center gap-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            Next
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
