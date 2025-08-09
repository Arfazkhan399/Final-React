import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector(state => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Error Message */}
                                {error && <p className="text-danger small">{error}</p>}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
