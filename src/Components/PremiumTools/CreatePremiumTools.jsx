import { useCategoriesContextProvider } from '../../Context/CategoriesContext';
import { PremiumToolsCreate } from '../../Context/Api_Base_Url';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';
import Select from 'react-select';
import axios from 'axios';

const CreatePremiumTools = () => {
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px" }) };
    const { getCategories, isLoading, optionList, optionSelectValue, setOptionSelectValue, optionOnChange, optionInputChange, searchFilter } = useCategoriesContextProvider()
    useEffect(() => { getCategories(1) }, [searchFilter]);

    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");
    const [features, setFeatures] = useState([""]);
    const [packageName, setPackageName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("");
    const [expired, setExpired] = useState("");
    const [expiredType, setExpiredType] = useState("");
    const [discount, setDiscount] = useState("");
    const [notes, setNotes] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});

    // Additional Features Functions
    const addAdditionalFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeAdditionalFeature = (index) => {
        if (features.length <= 1) return;
        const newFeatures = [...features];
        newFeatures.splice(index, 1);
        setFeatures(newFeatures);
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldError({});
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("item_name", itemName);
            formData.append("categories_id", optionSelectValue.value);
            formData.append("short_description", shortDesc);
            formData.append("long_description", longDesc);
            formData.append("package_name", packageName);
            formData.append("quantity", quantity);
            formData.append("price", price);
            formData.append("currency", currency);
            formData.append("expired", expired);
            formData.append("expired_type", expiredType);
            formData.append("discount", discount);
            formData.append("notes", notes);
            if (attachment) { formData.append("attachment", attachment) }
            features.forEach((feature, index) => {
                if (feature.trim() !== '') { formData.append(`features[${index}]`, feature) }
            });

            const response = await axios.post(PremiumToolsCreate, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                navigate("/premium-tools/table");
                setOptionSelectValue(null)
            } else {
                console.log(response.data);
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
                    <div className="col-md-10">
                        <form className='shadow-sm bg-white px-5 pt-3 pb-4' onSubmit={handleSubmit}>
                            <h4 className='text-center py-4'>Create Premium Tools</h4>
                            <div className="row border-top border-warning pt-4">

                                {/* Basic Information */}
                                <div className="col-md-7 mb-3">
                                    <label className='form-label'>Tools Name</label>
                                    <input value={itemName} maxLength='50' onChange={(e) => setItemName(e.target.value)} type="text" className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label className='form-label'>Categories</label>
                                    <Select
                                        options={optionList}
                                        value={optionSelectValue}
                                        onChange={optionOnChange}
                                        onInputChange={optionInputChange}
                                        isLoading={isLoading}
                                        placeholder={isLoading ? "Loading..." : "Select Option"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Short Description</label>
                                    <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} type="text" className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Long Description</label>
                                    <textarea value={longDesc} onChange={(e) => setLongDesc(e.target.value)} rows='3' className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Package Name</label>
                                    <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Quantity</label>
                                    <input type="number" min='0' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Price</label>
                                    <input type="number" min='0' value={price} onChange={(e) => setPrice(e.target.value)} className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Currency</label>
                                    <select onChange={(event) => setCurrency(event.target.value)} className="form-select rounded-0">
                                        <option value="">Select Currency</option>
                                        <option value="BDT">BDT</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Expired</label>
                                    <input type="number" min='0' value={expired} onChange={(e) => setExpired(e.target.value)} className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Expired Type</label>
                                    <select onChange={(event) => setExpiredType(event.target.value)} className="form-select rounded-0">
                                        <option value="">Select Expired</option>
                                        <option value="Day">Day</option>
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className='form-label'>Discount</label>
                                    <input type="number" min='0' max='100' value={discount} onChange={(e) => setDiscount(e.target.value)} className='form-control rounded-0' disabled={loading} />
                                </div>

                                {/* Additional Features */}
                                <div className="col-12 mb-3">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h5>Features</h5>
                                        <button type="button" className='btn btn-sm btn-outline-secondary rounded-0' onClick={addAdditionalFeature} disabled={loading}>Add New</button>
                                    </div>

                                    <div className="features-container">
                                        {features.map((feature, index) => (
                                            <div key={`feature-${index}`} className="row mb-3 position-relative">
                                                <div className="col-md-10">
                                                    <input type="text" className='form-control rounded-0' value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Enter feature" required disabled={loading} />
                                                </div>
                                                <div className="col-md-2">
                                                    {features.length > 1 && (
                                                        <button type="button" className="btn btn-danger w-100 rounded-0" onClick={() => removeAdditionalFeature(index)} disabled={loading}>Remove</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Important Note</label>
                                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows='3' className='form-control rounded-0' required disabled={loading} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Attachment</label>
                                    <input type="file" className='form-control rounded-0' onChange={(e) => setAttachment(e.target.files[0])} disabled={loading} />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <Link to='/premium-tools/table' className='btn btn-dark rounded-0 w-100' disabled={loading}>Cancel</Link>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>{loading ? 'Creating...' : 'Create Premium'}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CreatePremiumTools;