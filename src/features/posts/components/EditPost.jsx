// import { useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'

// const EditPost = () => {
//   const { postId } = useParams()
//   const [title, setTitle] = useState('')
//   const [body, setBody] = useState('')

//   const getPost = () => {
//     console.log('getting post:' + postId)
//     return fetch(`http://localhost:3030/api/posts/${postId}`).then((response) =>
//       response.json()
//     )
//   }
// }

// export default EditPost