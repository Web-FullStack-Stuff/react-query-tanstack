import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import getSinglePost from '../api/getSinglePost'
import deletePost from '../api/deletePost'

const SinglePost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getSinglePost(postId),
  })

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries()
      const currentPost = queryClient.getQueriesData(['posts', postId])

      await 

      // Refetch all active queries that begin with `posts` in the key
      await queryClient.refetchQueries({ queryKey: ['posts'] })

      return { currentPost }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postId], context.currentPost)
    },
    onSuccess: (response) => {
      const postId = response.postId
      queryClient.removeQueries(['posts', postId])
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })

  const handleDelete = (postId) => {
    deleteMutation(postId)
  }
  if (isLoading || isDeleting) {
    return (
      <div className='dark-mode-bg m-4 px-10 py-6 rounded-md max-w-xl h-42 animate-pulse'>
        <h3 className='h-8 w-full rounded-md mb-2 text-2xl font-bold bg-white dark:bg-slate-900'></h3>
        <p className='m-2 h-5 w-5/6 rounded-md bg-white dark:bg-slate-900'></p>
        <p className='m-2 h-5 w-7/8 rounded-md bg-white dark:bg-slate-900'></p>
        <div className='grid place-items-center w-full mt-auto  p-2 items-center text-white'>
          <span className='px-3 py-1 h-8 w-16 rounded-md dark:bg-slate-900 bg-white ml-auto mr-0'></span>
        </div>
      </div>
    )
  }

  if (error) return 'Error occurred:' + error.message

  return (
    <div className='dark-mode-bg m-4 px-10 py-6 rounded-md max-w-xl'>
      <h3 className='text-2xl font-bold first-letter:capitalize'>
        {post.title}
      </h3>
      <p className='p-2'>{post.body}</p>
      <div className='grid place-items-center w-full mt-auto  p-2 items-center text-white'>
        <span
          className='cursor-pointer px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 ml-auto'
          onClick={() => handleDelete(post.postId)}
        >
          Delete
        </span>
      </div>
    </div>
  )
}
export default SinglePost
