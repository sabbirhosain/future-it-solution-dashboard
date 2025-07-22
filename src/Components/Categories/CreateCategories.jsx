import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom';
import { CategoriesCreate } from '../../Context/Api_Base_Url';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

const CreateCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [fieldError, setFieldError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldError({});
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("categories", categories);
            if (attachment) { formData.append("attachment", attachment) }

            const response = await axios.post(CategoriesCreate, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                navigate("/categories/table");
            } else {
                window.alert(response.data.message)
                setFieldError(response.data.message)
            }

        } catch (error) {
            toast.error(error.response.data || 'Internal Server Error');
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
                            <h4 className='text-center py-4'>Create Catrgories</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Categories Name</label>
                                    <input type="text" value={categories} onChange={(event) => setCategories(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Attachment</label>
                                    <input type="file" className='form-control rounded-0' onChange={(e) => setAttachment(e.target.files[0])} disabled={loading} />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to='/categories/table' type="reset" className='btn btn-dark rounded-0 w-100'>Cancel</Link>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>{loading ? 'Please Wait...' : 'Create Categories'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default CreateCategories