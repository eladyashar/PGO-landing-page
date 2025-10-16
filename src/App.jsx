import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.scss'
import Home from './Pages/Home/Home.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <>
      <BrowserRouter basename="/PGO-landing-page">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
