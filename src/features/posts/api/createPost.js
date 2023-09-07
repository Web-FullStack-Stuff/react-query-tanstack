const submitPost = async ({ postId, title, body }) => {
  return await fetch('http://localhost:3030/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      title,
      body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json())
}

export default submitPost