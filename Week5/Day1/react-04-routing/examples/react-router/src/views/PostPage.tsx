import { useParams, Link, useLocation } from 'react-router-dom'

const PostPage = () => {
  const { id } = useParams()
  const { pathname } = useLocation()

  if (id !== undefined) {
    return (
      <h2>
        This is blog post {id} at path "{pathname}"
      </h2>
    )
  }

  return (
    <>
      <h2>This is the Blog Page at path "{pathname}"</h2>
      <h3>All My Blog Posts</h3>
      <ul>
        <li>
          Read my awesome <Link to='/blog/1'>first blog post</Link>
        </li>
        <li>
          Read my awesome <Link to='/blog/2'>second blog post</Link>
        </li>
        <li>
          Read my awesome <Link to='/blog/3'>third blog post</Link>
        </li>
      </ul>
    </>
  )
}

export default PostPage
