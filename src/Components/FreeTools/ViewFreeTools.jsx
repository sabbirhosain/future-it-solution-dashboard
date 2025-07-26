import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useParams } from 'react-router-dom';
import { FreeToolsSingle } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ViewFreeTools.css';

const ViewFreeTools = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [freeTools, setFreeTools] = useState(null);

  useEffect(() => {
    const getFreeTools = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${FreeToolsSingle}${id}`);
        if (response && response.data) {
          setFreeTools(response.data.payload);
        }

      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getFreeTools();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <section className='container vh-100 d-flex align-items-center justify-content-center'>
          <div className="loading-spinner">Loading...</div>
        </section>
      </Layout>
    );
  }

  if (!freeTools) {
    return (
      <Layout>
        <section className='container vh-100 d-flex align-items-center justify-content-center'>
          <div className="not-found">Premium Tool not found</div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className='container premium-tool-view'>
        <div className="premium-tool-header">
          <h2>{freeTools.item_name}</h2>
          <div className='d-flex align-items-center justify-content-between'>
            <div className="category-badge">{freeTools.categories}</div>
            <Link to={`/free-tools/update/${id}`} className="btn btn-danger btn-sm rounded-0">Edit</Link>
          </div>
        </div>

        <div className="premium-tool-details">
          <div className="detail-card">
            <h3>Description</h3>
            <p className="short-desc">{freeTools.short_description}</p>
            <p className="long-desc">{freeTools.long_description}</p>
          </div>

          {freeTools.features && freeTools.features.length > 0 && (
            <div className="detail-card">
              <h3>Key Features</h3>
              <ul className="features-list">
                {freeTools.features.map((feature, index) => (
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
                <span>Original Price</span>
                <span>{freeTools.price} {freeTools.currency}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span>{freeTools.discount}%</span>
              </div>
              <div className="price-row">
                <span>Cash Out Fee</span>
                <span>{freeTools.cash_out_fee} {freeTools.currency}</span>
              </div>
              <div className="price-row grand-total">
                <span>Grand Total</span>
                <span>{freeTools.grand_total} {freeTools.currency}</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Subscription Details</h3>
            <div className="subscription-info">
              <div className="info-row">
                <span>Package Name</span>
                <span>{freeTools.package_name}</span>
              </div>
              <div className="info-row">
                <span>Quantity</span>
                <span>{freeTools.quantity}</span>
              </div>
              <div className="info-row">
                <span>Duration</span>
                <span>{freeTools.expired} {freeTools.expired_type}</span>
              </div>
              <div className="info-row">
                <span>Status</span>
                <span className={`status-badge ${freeTools.status}`}>
                  {freeTools.status}
                </span>
              </div>
              <div className="info-row">
                <span>Availability</span>
                <span className={`availability-badge ${freeTools.availability}`}>
                  {freeTools.availability}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Ratings & Sales</h3>
            <div className="rating-sales-info">
              <div className="rating">
                <span>Average Rating : </span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < freeTools.avg_rating ? 'filled' : ''}>★</span>
                  ))}
                  <span>({freeTools.avg_rating})</span>
                </div>
              </div>
              <div className="sales">
                <span>Total Sold : </span>
                <span>{freeTools.total_sold}</span>
              </div>
            </div>
          </div>

          {freeTools.notes && (
            <div className="detail-card">
              <h3>Notes</h3>
              <p className="notes">{freeTools.notes}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ViewFreeTools