import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserContextProvider } from '../../Context/UserContext';
import { useAuthContextProvider } from '../../Context/AuthContext';
import { singleUser, updateUser } from '../../Context/Api_Base_Url';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userDataFetch } = useUserContextProvider()
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({ first_name: '', last_name: '', user_name: '', gender: '', country: '', address: '', attachment: null });

  // Get user data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${singleUser}${id}`);
        setUserData(response.data.payload);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setUserData({ ...userData, attachment: e.target.files[0] });
  };

  // Update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === "attachment" && userData.attachment === null) { return; }
        formData.append(key, userData[key]);
      });

      const response = await axios.put(`${updateUser}${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response && response.data) {
        toast.success(response.data.message || "User Updated Success");
        userDataFetch(1);
        navigate("/users/table");
      }
    } catch (error) {
      console.log('Internal Server Error', error);
      setFieldError(error.response.data)

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
              <h4 className='text-center py-4'>Update User Details</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-6 mb-3">
                  <label className='form-label'>First Name</label>
                  <input type="text" name="first_name" value={userData?.first_name || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Last Name</label>
                  <input type="text" name="last_name" value={userData?.last_name || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>User Name</label>
                  <input type="text" name="user_name" value={userData?.user_name || ""} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                  {fieldError.user_name && <small className='text-danger'>{fieldError.user_name}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Gender</label>
                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value="male" checked={userData.gender === "male"} onChange={handleChange} name="gender" id="radioMale" disabled={loading} />
                      <label className="form-check-label" htmlFor="radioMale">Male</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" value="female" checked={userData.gender === "female"} onChange={handleChange} name="gender" id="radioFemale" disabled={loading} />
                      <label className="form-check-label" htmlFor="radioFemale">Female</label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Country</label>
                  <input type="text" name="country" value={userData?.country || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Address</label>
                  <input type="text" name="address" value={userData?.address || ""} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Image</label>
                  <input type="file" onChange={handleFileChange} className='form-control rounded-0' disabled={loading} />
                </div>
                <div className="col-md-6 mt-3">
                  <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100' disabled={loading}>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>Update User</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default UpdateUser