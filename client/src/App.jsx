import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header/Header'
import About from './pages/About'
import Flowers from './pages/Flowers'
import Profile from './pages/Profile'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import CreateProduct from './pages/CreateProduct'
import SingleProduct from './pages/SingleProduct'
import useAuth from './hooks/useAuth'

function App() {
  const { user } = useAuth()

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/flowers' element={<Flowers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/single-product/:id' element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
