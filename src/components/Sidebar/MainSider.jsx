import { Card, Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { getAllProductsCategories } from '../../services'
import { FilterOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ShoppingImg from '../../assets/images/shopping.svg'

function Sidebar() {
  const [checkedList, setCheckedList] = useState([])
  const [categories, setCategories] = useState([])
  const navigator = useNavigate()

  useEffect(() => {
    getAllProductsCategories().then((resp) => {
      // console.log('🚀 ~ file: index.js:8 ~ getAllProductsCategories ~ resp:', resp)
      setCategories([...resp])
    })
  }, [])

  const onChange = (list) => {
    // console.log('🚀 ~ file: index.js:22 ~ onChange ~ list:', list)
    setCheckedList(list)
    navigator(`/products/categories/${list[0]}`)
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card
        title={
          <div className='text-sm font-medium'>
            <FilterOutlined /> Products Categories
          </div>
        }
        className='border-slate-100 dark:border-slate-800'
      >
        <Checkbox.Group
          options={categories.map((cat) => {
            return { label: cat.name, value: cat.slug }
          })}
          value={checkedList}
          onChange={onChange}
          className='w-full [&_label]:!flex [&_label]:py-1.5'
        />
      </Card>

      <img src={ShoppingImg} alt='Shopping with us' className='w-[350px] max-w-[80%] mx-auto' />
    </div>
  )
}

export default Sidebar
