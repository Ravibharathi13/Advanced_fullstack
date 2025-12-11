import { useState } from 'react'
import './App.css'
import Home from "./Home.jsx";
import BookList from "./BookList.jsx";
import {Routes, Route, Link} from "react-router-dom";

function App() {

  return (
    <>
    <h3>Hi</h3>
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/books">Books</Link>
      </li>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books' element={<BookList/>}/>
    </Routes>
      </>
  )
}

export default App
