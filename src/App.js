import React, { useState, useEffect } from 'react'
import snek from './snek.jpg'
import './App.css'

const LambdaDemo = () => {
  const [loading, setLoading] = useState(false)
  const [endpoint, setEndpoint] = useState(null)
  const [message, setMessage] = useState('')
  const [hasClicked, setHasClicked] = useState(false)

  const handleClick = (api) => (e) => {
    e.preventDefault()
    setEndpoint(api)
    setHasClicked(true)
  }

  useEffect(() => {
    if (!endpoint) return

    setLoading(true)
    fetch('/.netlify/functions/' + endpoint)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false)
        setEndpoint(false)
        setMessage(json.msg)
      })
  }, [endpoint])

  return (
    <p>
      <button disabled={loading} onClick={handleClick('snakes')}>
        {loading
          ? 'Loading...'
          : `Press Me For ${hasClicked ? 'More ' : ''}Snakes!`}
      </button>
      {/* <button onClick={handleClick('async-dadjoke')}>
        {loading ? 'Loading...' : 'Call Async Lambda'}
      </button> */}
      <br />
      <span>{message}</span>
    </p>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={snek} className="App-logo" alt="logo" />
        <h2 className="title">Welcome to Hillary's Snake Quest!</h2>
        <p>Check back later for lots of snake-related fun!</p>
        <LambdaDemo />
        <p className="small">
          <em>Yay! Snakes!</em>
        </p>
      </header>
    </div>
  )
}

export default App
