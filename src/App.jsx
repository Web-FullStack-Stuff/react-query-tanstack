import { Routes, Route } from 'react-router-dom'

import './App.css'

import CreatePost from './features/posts/components/CreatePost'
import PostsList from './features/posts/components/PostsList'
import Layout from './common/Layout'
import SinglePost from './features/posts/components/SinglePost'

const App = () => {
  return (
    <div className='bg-white text-black dark:bg-black dark:text-white px-10 py-2'>
      <Routes>
        <Route exact path='/' element={<Layout />}>
            <Route index element={<PostsList />}/>
            <Route path='/posts/create' element={<CreatePost />}/>
            <Route path='/posts/:postId' element={<SinglePost />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
