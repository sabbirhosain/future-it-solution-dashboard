import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useParams } from 'react-router-dom';
import { PremiumToolsSingle } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ViewPremiumTools.css';

const ViewPremiumTools = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const [premiumTools, setPremiumTools] = useState(null);
    console.log(premiumTools);

    useEffect(() => {
        const getPremiumTools = async () => {
            try {
                setFieldError({});
                setLoading(true);

                const response = await axios.get(`${PremiumToolsSingle}${id}`);
                if (response && response.data) {
                    setPremiumTools(response.data.payload);
                }

            } catch (error) {
                toast.error(error.response.data || 'Internal Server Error');
                console.error('Internal Server Error', error);
            } finally {
                setLoading(false);
            }
        }
        getPremiumTools();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <section className='container'>
                    <div className="loading-spinner">Loading...</div>
                </section>
            </Layout>
        );
    }

    if (!premiumTools) {
        return (
            <Layout>
                <section className='container'>
                    <div className="not-found">Premium Tool not found</div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className='container premium-tool-view'>
                <div className="premium-tool-header">
                    <h2>{premiumTools.item_name}</h2>
                    <div className="category-badge">{premiumTools.categories}</div>
                </div>

                <div className="premium-tool-details">
                    <div className="detail-card">
                        <h3>Description</h3>
                        <p className="short-desc">{premiumTools.short_description}</p>
                        <p className="long-desc">{premiumTools.long_description}</p>
                    </div>

                    {premiumTools.features && premiumTools.features.length > 0 && (
                        <div className="detail-card">
                            <h3>Key Features</h3>
                            <ul className="features-list">
                                {premiumTools.features.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <span className="feature-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="detail-card">
                        <h3>Pricing Information</h3>
                        <div className="price-info">
                            <div className="price-row">
                                <span>Original Price:</span>
                                <span>${premiumTools.price} {premiumTools.currency}</span>
                            </div>
                            <div className="price-row">
                                <span>Discount:</span>
                                <span>{premiumTools.discount}%</span>
                            </div>
                            <div className="price-row">
                                <span>Cash Out Fee:</span>
                                <span>${premiumTools.cash_out_fee}</span>
                            </div>
                            <div className="price-row grand-total">
                                <span>Grand Total:</span>
                                <span>${premiumTools.grand_total} {premiumTools.currency}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <h3>Subscription Details</h3>
                        <div className="subscription-info">
                            <div className="info-row">
                                <span>Package Name:</span>
                                <span>{premiumTools.package_name}</span>
                            </div>
                            <div className="info-row">
                                <span>Quantity:</span>
                                <span>{premiumTools.quantity}</span>
                            </div>
                            <div className="info-row">
                                <span>Duration:</span>
                                <span>{premiumTools.expired} {premiumTools.expired_type}(s)</span>
                            </div>
                            <div className="info-row">
                                <span>Status:</span>
                                <span className={`status-badge ${premiumTools.status}`}>
                                    {premiumTools.status}
                                </span>
                            </div>
                            <div className="info-row">
                                <span>Availability:</span>
                                <span className={`availability-badge ${premiumTools.availability}`}>
                                    {premiumTools.availability}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <h3>Ratings & Sales</h3>
                        <div className="rating-sales-info">
                            <div className="rating">
                                <span>Average Rating:</span>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < premiumTools.avg_rating ? 'filled' : ''}>★</span>
                                    ))}
                                    <span>({premiumTools.avg_rating})</span>
                                </div>
                            </div>
                            <div className="sales">
                                <span>Total Sold:</span>
                                <span>{premiumTools.total_sold}</span>
                            </div>
                        </div>
                    </div>

                    {premiumTools.notes && (
                        <div className="detail-card">
                            <h3>Notes</h3>
                            <p className="notes">{premiumTools.notes}</p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ViewPremiumTools;