import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { singleUser } from '../../Context/Api_Base_Url';
const DEFAULT_IMAGE = "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg";

const SingleUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    console.log(userData);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`${singleUser}${id}`);
                setUserData(response.data.payload);
            } catch (error) {
                console.log('Internal Server Error', error);
            } finally {
                setIsLoading(false);
            }
        }
        getUserData()
    }, []);

    return (
        <Layout>
            <section className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form className='shadow-sm bg-white px-5 pt-3 pb-4'>
                            <h4 className='text-center py-4'>Single User Details</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-4 mb-3">
                                    <img src={userData?.attachment?.secure_url || DEFAULT_IMAGE} className='img-thumbnail' alt={userData.full_name ?? "User Image"} />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Join Date : </span></div>
                                                <div className="col-8"><span>{userData?.join_date_formated}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Full Name : </span></div>
                                                <div className="col-8"><span>{userData?.full_name}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Gender : </span></div>
                                                <div className="col-8"><span>{userData?.gender}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>User Name : </span></div>
                                                <div className="col-8"><span>{userData?.user_name ?? 'N/A'}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Phone : </span></div>
                                                <div className="col-8"><span>{userData?.phone}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Email : </span></div>
                                                <div className="col-8"><span>{userData?.email}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Country : </span></div>
                                                <div className="col-8"><span>{userData?.country ?? 'N/A'}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Address : </span></div>
                                                <div className="col-8"><span>{userData?.address ?? 'N/Á'}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100'>Back</Link>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to={`/users/update/${id}`} type="reset" className='btn btn-dark rounded-0 w-100'>Update</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default SingleUser