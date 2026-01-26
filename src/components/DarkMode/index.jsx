import LightToogleIco from '../../assets/images/lightToogle.svg?react'
import DarkToogleIco from '../../assets/images/darkToogle.svg?react'
import { useContext } from 'react'
import { AppContext } from '../../context'

function ToogleModeColor() {
  const { colorMode, setColorMode } = useContext(AppContext)

  return (
    <>
      <div className='ms-1 colorModeToogle'>
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
          {colorMode === 'dark' ? <LightToogleIco /> : <DarkToogleIco />}
        </a>
      </div>
    </>
  )
}

export default ToogleModeColor
