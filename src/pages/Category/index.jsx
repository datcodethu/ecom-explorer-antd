import { useParams } from 'react-router-dom'
import Products from '../../components/Products'
import { makeUpLabel } from '../../utils'

function Category(props) {
  // returned from `useParams`
  const params = useParams()
  const key = params.categoryId

  return (
    <>
      <h2 className='text-2xl font-bold my-4'>Category {makeUpLabel(key)}</h2>
      <div>
        <Products category={key} />
      </div>
    </>
  )
}

export default Category
