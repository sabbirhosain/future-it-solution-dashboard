import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CategoriesSingle, CategoriesUpdate } from '../../Context/Api_Base_Url';
import Layout from '../../Layout/Layout'
import axios from 'axios';
import { useCategoriesContextProvider } from '../../Context/CategoriesContext';
import { toast } from 'react-toastify';

const UpdateCategories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const { getCategories } = useCategoriesContextProvider()
    const [categories, setCategories] = useState({ categories: '' });
    const handleInputChange = (e) => {
        setCategories((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setFieldError((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCategories({ ...categories, attachment: e.target.files[0] });
        }
    };

    // Get user data
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${CategoriesSingle}${id}`);
                if (response && response.data) {
                    setCategories(response.data.payload);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCategories()
    }, [id]);

    // Update Categories
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.keys(categories).forEach((key) => {
                if (key === "attachment" && categories.attachment === null) { return; }
                formData.append(key, categories[key]);
            });

            const response = await axios.put(`${CategoriesUpdate}${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                getCategories(1);
                navigate("/categories/table");
            } else {
                window.alert(response.data.message)
                setFieldError(response.data.message)
            }

        } catch (error) {
            console.log('Internal Server Error', error);
            toast.error(error.response.data || 'Internal Server Error');
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
                            <h4 className='text-center py-4'>Create Catrgories</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Categories Name</label>
                                    <input type="text" name="categories" value={categories?.categories || ""} onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Attachment</label>
                                    <input type="file" className='form-control rounded-0' onChange={handleFileChange} disabled={loading} />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to='/categories/table' type="reset" className='btn btn-dark rounded-0 w-100'>Cancel</Link>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>{loading ? 'Please Wait...' : 'Update Categories'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default UpdateCategories