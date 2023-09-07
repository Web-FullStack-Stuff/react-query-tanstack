import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

import submitPost from '../api/createPost'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  // mutation
  const { mutate: createMutate, isLoading: isMutating } = useMutation({
    mutationFn: submitPost,
    // When mutate is called:
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts'])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (posts = []) => [...posts, newPost])
      return { previousPosts }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['posts'], context.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['posts'] })
      // setTitle('')
      // setBody('')
    },
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.setQueryData(['posts', newPost.postId], newPost)

      navigate(`/posts/${newPost.postId}`)
      // navigate('/')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const postId = nanoid()
    createMutate({ postId, title, body })
  }

  return (
    <div className='dark-mode-bg rounded-lg m-6 px-8 py-4 max-w-lg'>
      <h2 className='text-2xl font-bold'>Create Post</h2>
      <form onSubmit={handleSubmit} className='p-5'>
        <label className='block p-1' htmlFor='title'>
          <span className='block text-sm font-medium text-slate-700 dark:text-slate-100'>
            Title
          </span>
          <input
            className='form-input input-element peer/title'
            type='text'
            id='title'
            value={title}
            required
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className='mt-1 invisible peer-invalid/title:visible text-orange-600 text-sm'>
            Please provide a valid post title.
          </p>
        </label>

        <label className='block p-1' htmlFor='body'>
          <span className='block text-sm font-medium text-slate-700 dark:text-slate-100 '>Body</span>
          <textarea
            className='form-input input-element peer/body'
            required
            type='text'
            id='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <p className='mt-1 invisible peer-invalid/body:visible text-orange-600 text-sm'>
            Please provide a valid post body.
          </p>
        </label>

        <button disabled={isMutating} type='submit' className='submit-button'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreatePost
