import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { PremiumToolsSingle } from '../../Context/Api_Base_Url';
import { FaStar, FaRegStar, FaArrowLeft, FaCopy } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ViewPremiumTools.css';

const ViewPremiumTools = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const [premiumTools, setPremiumTools] = useState(null);
    const [copied, setCopied] = useState(false);

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
        getPremiumTools();
    }, [id]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Coupon code copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStar key={i} className="text-warning half-star" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-warning" />);
            }
        }

        return stars;
    };

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
                    <button onClick={() => navigate(-1)} className="btn btn-primary"><FaArrowLeft />Go Back</button>
                </section>
            </Layout>
        );
    }

    if (!premiumTools) {
        return null;
    }

    return (
        <Layout>
            <section className='container my-5'>
                <div className="card premium-tool-card mb-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <h2 className="card-title">{premiumTools.tools_name}</h2>
                            <span className={`badge rounded-0 ${premiumTools.availability === 'available' ? 'bg-success' : 'bg-danger'}`}>{premiumTools.availability}</span>
                        </div>

                        <div className="mb-3">
                            {renderRating(premiumTools.total_rating)}
                            <span className="ms-2">({premiumTools.total_rating.toFixed(1)})</span>
                            <span className="ms-3 text-muted">{premiumTools.total_sold} Sold</span>
                        </div>

                        <p className="lead mb-4">{premiumTools.short_description}</p>

                        {premiumTools.coupon_code && (
                            <div className="alert alert-info mb-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Special Offer: </strong>
                                    <span className="coupon-code">{premiumTools.coupon_code}</span>
                                </div>
                                <button onClick={() => copyToClipboard(premiumTools.coupon_code)} className="btn btn-sm btn-outline-dark"><FaCopy /> {copied ? 'Copied!' : 'Copy'}</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h3 className="card-title mb-3">Pricing Plans</h3>
                        <div className="row">
                            {premiumTools.pricing_tiers.map((tier, index) => (
                                <div key={index} className="col-md-4 mb-3">
                                    <div className={`card pricing-tier-card rounded-0 h-100 position-relative ${index === premiumTools.pricing_tiers.length - 1 ? 'popular-tier' : ''}`}>
                                        <div className="card-body">
                                            <h5 className="card-title">{tier.package_name}</h5>
                                            {/* {index === premiumTools.pricing_tiers.length - 1 && (
                                                <span className="badge bg-primary mb-2">Most Popular</span>
                                            )} */}
                                            <div className="d-flex align-items-baseline">
                                                <h3 className="mb-0">{tier.price}</h3>
                                                <span className="ms-2 text-muted"> ≈ ৳ {tier.currency_exchange_price}</span>
                                            </div>
                                            <p className="card-text">Quentity : {tier.quantity} ≈ {tier.expired} {tier.expired_type}</p>
                                            {tier.discount > 0 && (<span className="position-absolute top-0 end-0 badge bg-danger rounded-0">{tier.discount} % OFF</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h3 className="card-title mb-3">Description</h3>
                        <p className="card-text">{premiumTools.long_description}</p>
                    </div>
                </div>

                {premiumTools.additional_feature && premiumTools.additional_feature.length > 0 && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title mb-3">Key Features</h3>
                            <ul className="list-group list-group-flush">
                                {premiumTools.additional_feature.map((feature, index) => (
                                    <li key={index} className="list-group-item d-flex align-items-center">
                                        <div className="feature-icon me-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4BB543" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {premiumTools.important_note && (
                    <div className="card mb-4 border-warning">
                        <div className="card-header bg-warning bg-opacity-10 d-flex align-items-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                <path d="M12 9V11M12 15H12.01M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className="card-title mb-0">Important Note</h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{premiumTools.important_note}</p>
                        </div>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-3">Reviews</h3>
                        {premiumTools.reviews && premiumTools.reviews.length > 0 ? (
                            premiumTools.reviews.map((review, index) => (
                                <div key={index} className="mb-3 pb-3 border-bottom">
                                    <div className="d-flex justify-content-between">
                                        <h5>{review.user_name}</h5>
                                        <div>{renderRating(review.rating)}</div>
                                    </div>
                                    <p className="mb-1">{review.comment}</p>
                                    <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-muted">No reviews yet. Be the first to review!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default ViewPremiumTools;