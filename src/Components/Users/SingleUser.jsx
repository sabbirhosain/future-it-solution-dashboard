import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { singleUser } from '../../Context/Api_Base_Url';
import DEFAULT_IMAGE from '../../assets/user.png';
import axios from 'axios';
import { FaEdit, FaUserShield, FaCheckCircle, FaTimesCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
import './SingleUser.css';

const SingleUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            try {
                setFieldError({});
                setLoading(true);

                const response = await axios.get(`${singleUser}${id}`);
                if (response && response.data) {
                    setUserData(response.data.payload);
                }

            } catch (error) {
                if (error.response && error.response.data) {
                    setFieldError(error.response.data);
                } else {
                    setFieldError({ message: 'Internal Server Error' });
                }
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <section className='container vh-100 d-flex align-items-center justify-content-center'>
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (fieldError.message) {
        return (
            <Layout>
                <section className='container my-5'>
                    <div className="alert alert-danger">
                        {fieldError.message}
                    </div>
                    <Link to="/users" className="btn btn-primary">
                        Back to Users
                    </Link>
                </section>
            </Layout>
        );
    }

    if (!userData._id) {
        return null;
    }

    return (
        <Layout>
            <section className='container my-5'>
                <div className="card user-profile-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img
                                    src={userData.attachment?.secure_url || DEFAULT_IMAGE}
                                    alt={userData.full_name}
                                    className="img-fluid rounded-circle user-avatar mb-3"
                                />
                                <h3>{userData.full_name}</h3>
                                <p className="text-muted">@{userData.user_name}</p>

                                <div className="d-flex justify-content-center gap-2 my-2">
                                    <span className={`badge rounded-0 ${userData.isAdmin ? 'bg-danger' : 'bg-secondary'}`}>{userData.isAdmin ? 'Admin' : 'User'}</span>
                                    <span className={`badge rounded-0 ${userData.status === 'active' ? 'bg-success' : 'bg-warning'}`}>{userData.status}</span>
                                    <span className="badge rounded-0 bg-info text-capitalize">{userData.gender}</span>
                                </div>

                                <div className="verification-badge mb-3">
                                    {userData.isVerified ? (<span className="text-success"> <FaCheckCircle /> Verified</span>) : (<span className="text-danger"><FaTimesCircle /> Not Verified </span>)}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="user-details-section">
                                    <h4 className="section-title">Personal Information</h4>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaUserShield className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Username</span>
                                                    <span className="detail-value">{userData.user_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaVenusMars className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Gender</span>
                                                    <span className="detail-value text-capitalize">{userData.gender}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaPhone className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Phone</span>
                                                    <span className="detail-value">{userData.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaEnvelope className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Email</span>
                                                    <span className="detail-value">{userData.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaGlobe className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Country</span>
                                                    <span className="detail-value">{userData.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaMapMarkerAlt className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Address</span>
                                                    <span className="detail-value">{userData.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaCalendarAlt className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Joined Date</span>
                                                    <span className="detail-value">
                                                        {new Date(userData.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <FaCalendarAlt className="detail-icon" />
                                                <div>
                                                    <span className="detail-label">Last Updated</span>
                                                    <span className="detail-value">
                                                        {new Date(userData.updatedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <Link to={`/users/update/${userData._id}`} className="btn btn-primary">Edit User</Link>
                </div>
            </section>
        </Layout>
    );
};

export default SingleUser;