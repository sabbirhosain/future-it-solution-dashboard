import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PremiumToolsSingle, PremiumToolsUpdate } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePremiumTools = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});

  // Form state
  const [premiumTools, setPremiumTools] = useState({
    tools_name: '',
    short_description: '',
    long_description: '',
    important_note: '',
    coupon_code: '',
    status: '',
    availability: ''
  });

  const [attachment, setAttachment] = useState(null);
  const [additionalFeatures, setAdditionalFeatures] = useState([""]);
  const [pricingTiers, setPricingTiers] = useState([{
    package_name: "Basic",
    quantity: 1,
    price: 0,
    currency: "USD",
    currency_exchange_price: 0,
    expired: 1,
    expired_type: "Month",
    discount: 0
  }]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setPremiumTools((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };


  // Get premium tools data
  useEffect(() => {
    const getPremiumTools = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${PremiumToolsSingle}${id}`);
        const data = response.data.payload
        setPremiumTools(response.data.payload)

        // Set additional features
        if (data.additional_feature && data.additional_feature.length > 0) {
          setAdditionalFeatures(data.additional_feature);
        } else {
          setAdditionalFeatures([""]);
        }

        // Set pricing tiers
        if (data.pricing_tiers && data.pricing_tiers.length > 0) {
          const cleanTiers = data.pricing_tiers.map(({ _id, ...rest }) => rest);
          setPricingTiers(cleanTiers);
        } else {
          setPricingTiers([{
            package_name: "Basic",
            quantity: 1,
            price: 0,
            currency: "USD",
            currency_exchange_price: 0,
            expired: 1,
            expired_type: "Month",
            discount: 0
          }]);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPremiumTools()
  }, [id]);

  // Pricing Tier Functions
  const addPricingTier = () => {
    setPricingTiers([...pricingTiers, {
      package_name: "",
      quantity: 1,
      price: 0,
      currency: "USD",
      currency_exchange_price: 0,
      expired: 1,
      expired_type: "Month",
      discount: 0
    }]);
  };

  const removePricingTier = (index) => {
    if (pricingTiers.length <= 1) return;
    const newTiers = [...pricingTiers];
    newTiers.splice(index, 1);
    setPricingTiers(newTiers);
  };

  const handleTierChange = (index, field, value) => {
    const newTiers = [...pricingTiers];
    newTiers[index][field] = value;
    setPricingTiers(newTiers);
  };

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
      formData.append("tools_name", premiumTools.tools_name || '');
      formData.append("short_description", premiumTools.short_description || '');
      formData.append("long_description", premiumTools.long_description || '');
      formData.append("important_note", premiumTools.important_note || '');
      formData.append("coupon_code", premiumTools.coupon_code || '');
      formData.append("status", premiumTools.status || '');
      formData.append("availability", premiumTools.availability || '');
      if (attachment) { formData.append("attachment", attachment) }

      // Append each additional feature separately
      additionalFeatures
        .filter(feature => feature.trim() !== '')  // Filter out empty strings
        .forEach((feature, index) => {
          formData.append(`additional_feature[${index}]`, feature);
        });

      pricingTiers.forEach((tier, index) => {
        Object.entries(tier).forEach(([key, value]) => {
          formData.append(`pricing_tiers[${index}][${key}]`, value);
        });
      });

      const response = await axios.put(`${PremiumToolsUpdate}${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response && response.data) {
        toast.success(response.data.message);
        navigate("/premium-tools/table");
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
  };

  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form className='shadow-sm bg-white px-5 pt-3 pb-4' onSubmit={handleSubmit}>
              <h4 className='text-center py-4'>Update Premium Tools</h4>
              <div className="row border-top border-warning pt-4">

                {/* Basic Information */}
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Tools Name</label>
                  <input type="text" name="tools_name" value={premiumTools.tools_name} maxLength='100' onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.tools_name && <div className="text-danger">{fieldError.tools_name}</div>}
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Short Description</label>
                  <input type="text" name="short_description" value={premiumTools.short_description} onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.short_description && <div className="text-danger">{fieldError.short_description}</div>}
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Long Description</label>
                  <textarea rows='3' name="long_description" value={premiumTools.long_description} onChange={handleInputChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.long_description && <div className="text-danger">{fieldError.long_description}</div>}
                </div>

                {/* Status and Availability */}
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Status</label>
                  <select name="status" value={premiumTools.status} onChange={handleInputChange} className="form-select rounded-0" disabled={loading}>
                    <option value="show">Show</option>
                    <option value="hide">Hide</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Availability</label>
                  <select name="availability" value={premiumTools.availability} onChange={handleInputChange} className="form-select rounded-0" disabled={loading}>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                {/* Pricing Tiers */}
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>Pricing Tiers</h5>
                    <button type="button" className='btn btn-sm btn-outline-secondary rounded-0' onClick={addPricingTier} disabled={loading}>Add New</button>
                  </div>

                  <div className="pricing-tier-container">
                    {pricingTiers.map((tier, index) => (
                      <div key={`tier-${index}`} className="row border p-3 mb-3 position-relative">
                        {pricingTiers.length > 1 && (
                          <button type="button" className="btn btn-sm btn-danger rounded-0" style={{ position: 'absolute', width: '40px', top: '0px', right: '0px' }} onClick={() => removePricingTier(index)} disabled={loading} >×</button>
                        )}
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Package Name</label>
                          <input type="text" className='form-control rounded-0' value={tier.package_name} onChange={(e) => handleTierChange(index, 'package_name', e.target.value)} required disabled={loading} />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Quantity</label>
                          <input type="number" min="1" className='form-control rounded-0' value={tier.quantity} onChange={(e) => handleTierChange(index, 'quantity', parseInt(e.target.value))}
                            required disabled={loading} />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Price</label>
                          <input type="number" min="0" step="0.01" className='form-control rounded-0' value={tier.price} onChange={(e) => handleTierChange(index, 'price', parseFloat(e.target.value))} required disabled={loading} />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Currency</label>
                          <select className="form-select rounded-0" value={tier.currency} onChange={(e) => handleTierChange(index, 'currency', e.target.value)} required disabled={loading}>
                            <option value="USD">USD</option>
                            <option value="BDT">BDT</option>
                          </select>
                        </div>

                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Expired</label>
                          <input type="number" min="1" className='form-control rounded-0' value={tier.expired} onChange={(e) => handleTierChange(index, 'expired', parseInt(e.target.value))} required disabled={loading} />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Expired Type</label>
                          <select className="form-select rounded-0" value={tier.expired_type} onChange={(e) => handleTierChange(index, 'expired_type', e.target.value)} required disabled={loading}>
                            <option value="Day">Day</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Discount (%)</label>
                          <input type="number" min="0" max="100" className='form-control rounded-0' value={tier.discount} onChange={(e) => handleTierChange(index, 'discount', parseInt(e.target.value))} required disabled={loading} />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className='form-label'>Exchange Price</label>
                          <input type="number" min="0" step="0.01" className='form-control rounded-0' value={tier.currency_exchange_price} onChange={(e) => handleTierChange(index, 'currency_exchange_price', parseFloat(e.target.value))} required disabled={loading} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {fieldError.pricing_tiers && <div className="text-danger">{fieldError.pricing_tiers}</div>}
                </div>

                {/* Additional Features */}
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>Additional Features</h5>
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
                  {fieldError.additional_feature && <div className="text-danger">{fieldError.additional_feature}</div>}
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Important Note</label>
                  <textarea name="important_note" value={premiumTools.important_note} onChange={handleInputChange} rows='3' className='form-control rounded-0' required disabled={loading} />
                  {fieldError.important_note && <div className="text-danger">{fieldError.important_note}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Attachment</label>
                  <input type="file" className='form-control rounded-0' onChange={handleFileChange} disabled={loading} />
                  {fieldError.attachment && <div className="text-danger">{fieldError.attachment}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Coupon Code</label>
                  <input type="text" name="coupon_code" value={premiumTools.coupon_code} onChange={handleInputChange} className='form-control rounded-0' disabled={loading} />
                  {fieldError.coupon_code && <div className="text-danger">{fieldError.coupon_code}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mt-3">
                    <Link to='/premium-tools/table' className='btn btn-dark rounded-0 w-100' disabled={loading}>Cancel</Link>
                  </div>
                  <div className="col-md-6 mt-3">
                    <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>{loading ? 'Updating...' : 'Update Premium'}</button>
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