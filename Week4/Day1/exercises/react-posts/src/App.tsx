import './App.css'

function App() {
  const comments = [
    {
      date: '01/04/2022 09:09:23',
      text: 'Just writing some stuff on the internet!',
      author: {
        name: 'Fiona Worx',
        avatarUrl: 'https://robohash.org/Fiona?size=60x60',
      },
    },
    {
      date: '02/04/2022 10:14:34',
      text: 'I\'m learning react at the moment, it is great!',
      author: {
        name: 'Fiona Worx',
        avatarUrl: 'https://robohash.org/Fiona?size=60x60',
      },
    },
  ]

  return (
    <div className='app'>
      <h1>My Great Social Media Posts</h1>

      <div className='comment'>
        <div className='user'>
          <img
            className='user-image'
            src={comments[0].author.avatarUrl}
            alt={comments[0].author.name}
          />
          <div className='user-name'>{comments[0].author.name}</div>
        </div>

        <div className='comment-text'>{comments[0].text}</div>

        <div className='comment-date'>{comments[0].date}</div>
      </div>

      <div className='comment'>
        <div className='user'>
          <img
            className='user-image'
            src={comments[1].author.avatarUrl}
            alt={comments[1].author.name}
          />
          <div className='user-name'>{comments[1].author.name}</div>
        </div>

        <div className='comment-text'>{comments[1].text}</div>

        <div className='comment-date'>{comments[1].date}</div>
      </div>
    </div>
  )
}

export default App
