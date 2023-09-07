/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import getPosts from '../api/getPosts'

const PostsList = () => {
  const navigate = useNavigate()

  // query
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  let loadingContent

  if (isLoading) {
    loadingContent = new Array(12)
      .fill('')
      .map((_, index) => <PostPulse key={index} />)
  }

  if (error) return 'Error occurred:' + error.message

  return (
    <>
      <h3 className='text-xl'>Posts</h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
        {isLoading ? (
          loadingContent
        ) : posts.length === 0 ? (
          <span className='col-span-3 text-center text-2xl self-center px-3 py-2 font-bold'>Posts not available!!</span>
        ) : (
          posts.map((post) => (
            <Post key={post.postId} post={post} navigate={navigate} />
          ))
        )}
      </div>
    </>
  )
}

export const Post = ({ post, navigate }) => {
  return (
    <div className='post-list-card flex flex-col shadow'>
      <p className='text-clip overflow-hidden first-letter:capitalize text-lg'>
        {post.title}
      </p>
      <div className='grid place-items-center w-full mt-auto  p-2 items-center text-white'>
        <span
          className='cursor-pointer px-3 py-1 rounded-md bg-blue-400 hover:bg-blue-500'
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          Open
        </span>
      </div>
    </div>
  )
}

export const PostPulse = () => {
  return (
    <div className='post-list-card-pulse flex flex-col shadow animate-pulse'>
      <p className='h-5 w-full rounded-md bg-white mt-1 dark:bg-slate-900'></p>
      <p className='h-5 w-2/3 rounded-md bg-white dark:bg-slate-900 mt-2'></p>
      <div className='flex flex-row w-full mt-auto p-3 '>
        <span className='px-3 py-1 h-7 w-16 rounded-md dark:bg-slate-900 bg-white'></span>
      </div>
    </div>
  )
}
export default PostsList
