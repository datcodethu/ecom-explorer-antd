import { CiLight, CiDark } from 'react-icons/ci'
import { useContext } from 'react'
import { AppContext } from '../../context'

function ToogleModeColor() {
  const { colorMode, setColorMode } = useContext(AppContext)

  return (
    <>
      <div className='colorModeToogle'>
        <a
          href='#!'
          className='colorModeToogleBtn'
          onClick={(e) => {
            e.preventDefault()
            const newMode = colorMode === 'light' ? 'dark' : 'light'
            setColorMode(newMode)
            // console.log('color mode >>> ', newMode)
          }}
          alt='Switch between dark and light mode'
        >
          {colorMode === 'dark' ? <CiLight className='size-6' /> : <CiDark className='size-6' />}
        </a>
      </div>
    </>
  )
}

export default ToogleModeColor
