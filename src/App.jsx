import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import StockListing from './pages/StockListing.jsx'
import Trading from './pages/Trading.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Transaction from './pages/Transaction.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import "tailwindcss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/stocks" element={<StockListing />} />
  <Route path="/trading" element={<Trading />} />
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/transaction" element={<Transaction />} />
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
