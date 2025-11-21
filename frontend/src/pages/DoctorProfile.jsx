import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Phone, Building2 } from 'lucide-react';
import { doctorsAPI } from '../services/api';

const DoctorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const fetchDoctor = async () => {
        try {
            const response = await doctorsAPI.getOne(id);
            setDoctor(response.data);
        } catch (error) {
            console.error('Error fetching doctor:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Doctor Profile">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    if (!doctor) {
        return (
            <Layout title="Doctor Profile">
                <div className="error-message">Doctor not found</div>
            </Layout>
        );
    }

    return (
        <Layout title="Doctor Profile">
            <button className="btn btn-outline" onClick={() => navigate('/doctors')} style={{ marginBottom: '1rem' }}>
                <ArrowLeft size={20} />
                Back to Doctors
            </button>
            <div className="card">
                <h2 className="card-title">{doctor.name}</h2>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={20} />
                        <span><strong>Department:</strong> {doctor.department?.name || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={20} />
                        <span><strong>Phone:</strong> {doctor.phone}</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DoctorProfile;
