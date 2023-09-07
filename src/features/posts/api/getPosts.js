const getPosts = async () => {
  console.log('fetching posts')
  return await fetch('http://localhost:3030/api/posts').then((response) =>
    response.json()
  )
}

export default getPosts