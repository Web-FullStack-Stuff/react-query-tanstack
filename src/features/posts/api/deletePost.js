const deletePost = async (postId) => {
  console.log("delete", postId);
  return await fetch(`http://localhost:3030/api/posts/${postId}`, {
    method: 'DELETE',
  }).then((response) => response.json())
}

export default deletePost