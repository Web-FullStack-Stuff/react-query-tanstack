const getSinglePost = async (postId) => {
  console.log('getting post:' + postId)
  return fetch(`http://localhost:3030/api/posts/${postId}`).then((response) =>
    response.json()
  )
}

export default getSinglePost