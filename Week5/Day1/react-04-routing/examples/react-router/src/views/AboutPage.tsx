import { useLocation, useNavigate } from 'react-router-dom'

const AboutPage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <>
      <h2>This is the About Page at path "{pathname}"</h2>
      <button onClick={goHome}>Go to home page</button>
    </>
  )
}

export default AboutPage
