import './App.css'

const App = () => {
  return (
    <div className='app'>
      <h1>Country Population</h1>

      <select>
        {[{ countryName: 'United Kingdom', countryCode: 'GBR' }].map((item) => (
          <option key={item.countryCode} value={item.countryCode}>
            {item.countryName}
          </option>
        ))}
      </select>

      <p className='result'>LATEST: 67215293</p>
    </div>
  )
}

export default App
