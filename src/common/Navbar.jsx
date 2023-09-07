import { NavLink } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import {GiSpellBook} from 'react-icons/gi'
const Navbar = () => {
  return (
    <nav className='flex flex-row gap-4 w-full'>
      <GiSpellBook className='text-blue-500 text-3xl' />
      <span className='font-serif text-2xl font-extrabold text-orange-500 hover:text-orange-500'>Post App</span>
      <NavLink className='nav-item' to='/'>Posts</NavLink>
      <NavLink className='nav-item' to='/posts/create'>Create</NavLink>
      <ThemeSwitcher />
    </nav>
  )
}

export default Navbar
