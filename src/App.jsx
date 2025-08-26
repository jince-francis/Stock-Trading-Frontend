import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import StockListing from './pages/StockListing.jsx'
import "tailwindcss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/stocks" element={<StockListing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
