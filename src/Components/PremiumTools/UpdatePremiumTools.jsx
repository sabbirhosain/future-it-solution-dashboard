import { useCategoriesContextProvider } from '../../Context/CategoriesContext';
import { PremiumToolsSingle, PremiumToolsUpdate } from '../../Context/Api_Base_Url';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdatePremiumTools = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px" }) };
  const { getCategories, isLoading, optionList, optionSelectValue, setOptionSelectValue, optionOnChange, optionInputChange, searchFilter } = useCategoriesContextProvider()
  useEffect(() => { getCategories(1) }, [searchFilter]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});

  // Form state
  const [premiumTools, setPremiumTools] = useState({ item_name: '', short_description: '', long_description: '', package_name: '', quantity: '', price: '', currency: '', expired: '', expired_type: '', discount: '', notes: '', status: '', availability: '' });
  const [attachment, setAttachment] = useState(null);
  const [additionalFeatures, setAdditionalFeatures] = useState([""]);


  // Handle form input changes
  const handleInputChange = (e) => {
    setPremiumTools((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPremiumTools({ ...premiumTools, attachment: e.target.files[0] });
    }
  };


  // Get premium tools data
  useEffect(() => {
    const getPremiumTools = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${PremiumToolsSingle}${id}`);

        if (response && response.data) {
          const data = response.data.payload
          setPremiumTools(response.data.payload)

          // Set additional features
          if (data.features && data.features.length > 0) {
            setAdditionalFeatures(data.features);
          } else {
            setAdditionalFeatures([""]);
          }
        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getPremiumTools()
  }, [id]);


  // Additional Features Functions
  const addAdditionalFeature = () => {
    setAdditionalFeatures([...additionalFeatures, ""]);
  };

  const removeAdditionalFeature = (index) => {
    if (additionalFeatures.length <= 1) return;
    const newFeatures = [...additionalFeatures];
    newFeatures.splice(index, 1);
    setAdditionalFeatures(newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...additionalFeatures];
    newFeatures[index] = value;
    setAdditionalFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError({});
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("item_name", premiumTools.item_name);
      formData.append("categories_id", optionSelectValue.value);
      formData.append("short_description", premiumTools.short_description);
      formData.append("long_description", premiumTools.long_description);
      formData.append("package_name", premiumTools.package_name);
      formData.append("quantity", premiumTools.quantity);
      formData.append("price", premiumTools.price);
      formData.append("currency", premiumTools.currency);
      formData.append("expired", premiumTools.expired);
      formData.append("expired_type", premiumTools.expired_type);
      formData.append("discount", premiumTools.discount);
      formData.append("notes", premiumTools.notes);
      formData.append("status", premiumTools.status);
      formData.append("availability", premiumTools.availability);
      if (attachment) { formData.append("attachment", attachment) }
      additionalFeatures
        .filter(feature => feature.trim() !== '')  // Filter out empty strings
        .forEach((feature, index) => { formData.append(`features[${index}]`, feature) });

      const response = await axios.put(`${PremiumToolsUpdate}${id}`, formData, {
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
                  <input type="text" name='item_name' value={premiumTools.item_name || ''} maxLength='50' onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
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
                    maxMenuHeight={500}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Short Description</label>
                  <input type="text" name='short_description' value={premiumTools.short_description || ''} onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Long Description</label>
                  <textarea name='long_description' value={premiumTools.long_description || ''} onChange={handleInputChange} rows='3' className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Package Name</label>
                  <input type="text" name='package_name' value={premiumTools.package_name || ''} onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Quantity</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='form-control rounded-0' required disabled={loading} />
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
                  <input type="number" value={expired} onChange={(e) => setExpired(e.target.value)} className='form-control rounded-0' required disabled={loading} />
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
                  <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className='form-control rounded-0' disabled={loading} />
                </div>

                {/* Additional Features */}
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>Features</h5>
                    <button type="button" className='btn btn-sm btn-outline-secondary rounded-0' onClick={addAdditionalFeature} disabled={loading}>Add New</button>
                  </div>

                  <div className="features-container">
                    {additionalFeatures.map((feature, index) => (
                      <div key={`feature-${index}`} className="row mb-3 position-relative">
                        <div className="col-md-10">
                          <input type="text" className='form-control rounded-0' value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Enter feature" required disabled={loading} />
                        </div>
                        <div className="col-md-2">
                          {additionalFeatures.length > 1 && (
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

export default UpdatePremiumTools;