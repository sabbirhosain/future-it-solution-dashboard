import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordShowToggle = () => { setShowPassword(!showPassword) };

    return (
        <section className='container d-flex align-items-center justify-content-center vh-100'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className='shadow-sm bg-white px-5 py-4'>
                        <h4 className='text-center mb-5'>Register Now</h4>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>First Name</label>
                                <input type="text" className='form-control rounded-0' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>Last Name</label>
                                <input type="text" className='form-control rounded-0' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>User Name</label>
                                <input type="text" className='form-control rounded-0' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>Phone Number</label>
                                <input type="text" className='form-control rounded-0' />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className='form-label'>Email Address</label>
                                <input type="email" className='form-control rounded-0' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>Password</label>
                                <input type={showPassword ? "text" : "password"} className='form-control rounded-0' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className='form-label'>Confirm Password</label>
                                <div className='position-relative'>
                                    <input type={showPassword ? "text" : "password"} className='form-control rounded-0' />
                                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <button type="submit" className='btn btn-dark rounded-0 w-100'>Register Now</button>
                                <p className='text-center mt-4'>I have already an account <Link to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register