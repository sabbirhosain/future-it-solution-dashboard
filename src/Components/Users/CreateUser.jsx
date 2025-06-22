import Layout from '../../Layout/Layout'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../Context/Api_Base_Url';
import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowToggle = () => { setShowPassword(!showPassword) };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError({});
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        return setFieldError((prev) => ({
          ...prev, confirmPassword: 'Confirm Password do not match.'
        }));
      }

      const response = await axios.post(createUser, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        country: country,
        password: password,
        confirm_password: confirmPassword
      });

      if (response && response.data) {
        window.confirm(response.data.message);
        navigate("/users/table");
      }

    } catch (error) {
      setFieldError(error.response.data || 'Internal Server Error');
      console.error('Internal Server Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className='shadow-sm bg-white px-5 pt-3 pb-4'>
              <h4 className='text-center py-4'>Create New User</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-6 mb-3">
                  <label className='form-label'>First Name</label>
                  <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Last Name</label>
                  <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Country</label>
                  <input type="text" value={country} onChange={(event) => setCountry(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Phone Number</label>
                  <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Email Address</label>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.email && <small className="text-danger">{fieldError.email}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Password</label>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.password && <small className="text-danger">{fieldError.password}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Confirm Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    {fieldError.confirmPassword && <small className="text-danger">{fieldError.confirmPassword}</small>}
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100'>Create User</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CreateUser