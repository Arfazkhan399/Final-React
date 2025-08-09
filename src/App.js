import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Users from './components/Users';
import Header from './components/Header';
import Products from './components/Products';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';

function PrivateRoute({ children }) {
  const { user } = useSelector(state => state.auth);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
