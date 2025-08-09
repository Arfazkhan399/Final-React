import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'; // ✅ import Redux hook

const BASE_URL = "http://localhost:8080/users";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const authUser = useSelector(state => state.auth.user); // ✅ get logged-in user
    const isAdmin = authUser?.role === 'admin'; // ✅ role check

    const fetchUsers = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setUsers(res.data);
        } catch (error) {
            console.error("Error getting data:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onUserFormSubmit = async (formDataObj) => {
        try {
            if (userId) {
                await axios.put(`${BASE_URL}/${userId}`, formDataObj);
                setUserId(null);
            } else {
                await axios.post(BASE_URL, formDataObj);
            }
            reset();
            fetchUsers();
        } catch (error) {
            console.error("Error while submitting data", error);
        }
    };

    const handleEdit = (user) => {
        setUserId(user.id);
        setValue('name', user.name);
        setValue('salary', user.salary);
        setValue('email', user.email);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">

                {/* ✅ Only show form if admin */}
                {isAdmin && (
                    <div className="col-md-4">
                        <form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit(onUserFormSubmit)}>
                            <h4 className="mb-4 text-center">{userId ? "Update User" : "User Registration"}</h4>

                            {/* User Name */}
                            <div className="form-group mb-3">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('name', {
                                        required: true,
                                        pattern: /^[a-zA-Z\s]{3,30}$/i
                                    })}
                                />
                                {errors.userName?.type === 'required' && <p className='text-danger'>* User Name is required</p>}
                                {errors.userName?.type === 'pattern' && <p className='text-danger'>* 3–30 letters only</p>}
                            </div>

                            {/* Email */}
                            <div className="form-group mb-3">
                                <label>Email ID</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                />
                                {errors.emailId?.type === 'required' && <p className='text-danger'>* Email required</p>}
                                {errors.emailId?.type === 'pattern' && <p className='text-danger'>* Invalid email</p>}
                            </div>

                            {/* Salary */}
                            <div className="form-group mb-3">
                                <label>Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register('salary', {
                                        required: true,
                                        min: 1000
                                    })}
                                />
                                {errors.salary?.type === 'required' && <p className='text-danger'>* Salary is required</p>}
                                {errors.salary?.type === 'min' && <p className='text-danger'>* At least 1000</p>}
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                {userId ? "Update User" : "Add User"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Table Section */}
                <div className={isAdmin ? "col-md-8" : "col-md-12"}>
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>UserName</th>
                                <th>Salary</th>
                                <th>Email ID</th>
                                {/* ✅ Only admin sees Actions */}
                                {isAdmin && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={isAdmin ? "5" : "4"} className="text-center text-muted">No users found.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.salary}</td>
                                        <td>{user.email}</td>
                                        {isAdmin && (
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-info" onClick={() => handleEdit(user)}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
