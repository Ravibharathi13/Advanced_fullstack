import { useState } from 'react'
import './App.css'
import Home from './Home.jsx';
import Greeting from './Greeting.jsx';
import Counter from './counter.jsx';

function App() {
  
  return (
    <>
      
      <h1>Welcome to React App</h1>
      <Home />
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Counter />
    </>
  )
}

export default App;
