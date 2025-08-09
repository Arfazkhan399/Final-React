import React from 'react';
import logo from '../images/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { LOGOUT } from '../redux/actions/authActions';
import { logout } from '../redux/actions/authActions';
import "./header.css";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth); // ✅ auth state

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar text-light navbar-expand-lg navbar-info">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/' >
                    <img src={logo} alt="logo" width="45" height="45" />
                    {' '} <h4>CAR-HUB</h4>
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>Home</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to='/users'>Users</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to='/products'>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">
                                Cart <span className="count">{cartCount}</span>
                            </Link>
                        </li>
                        {!user ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">{user.name} ({user.role})</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
