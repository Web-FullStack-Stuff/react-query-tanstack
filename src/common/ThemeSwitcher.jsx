import { useState } from 'react'
import useDarkTheme from '../hooks/useDarkMode'

import {BsFillSunFill, BsFillMoonStarsFill} from 'react-icons/bs'

const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = useDarkTheme()
  const [useDarkMode, setUseDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setTheme(colorTheme)
    setUseDarkMode(!useDarkMode)
  }
  return (
    <>
      <span
        onClick={toggleDarkMode}
        className='dark-mode-bg nav-item place-content-center text-[25px]'
      >
        {colorTheme === 'dark' ? <BsFillSunFill className='text-slate-950' /> : <BsFillMoonStarsFill className='text-slate-100'/>}
      </span>
    </>
  )
}

export default ThemeSwitcher
