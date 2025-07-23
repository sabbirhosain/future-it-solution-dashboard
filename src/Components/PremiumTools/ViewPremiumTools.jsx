import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { PremiumToolsSingle } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ViewPremiumTools.css';

const ViewPremiumTools = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const [premiumTools, setPremiumTools] = useState(null);

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

    return (
        <Layout>
            <section className='container'>
                Hello
            </section>
        </Layout>
    );
}

export default ViewPremiumTools;