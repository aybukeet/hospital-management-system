import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Phone, User } from 'lucide-react';
import { patientsAPI } from '../services/api';

const PatientProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const fetchPatient = async () => {
        try {
            const response = await patientsAPI.getOne(id);
            setPatient(response.data);
        } catch (error) {
            console.error('Error fetching patient:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Patient Profile">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    if (!patient) {
        return (
            <Layout title="Patient Profile">
                <div className="error-message">Patient not found</div>
            </Layout>
        );
    }

    return (
        <Layout title="Patient Profile">
            <button className="btn btn-outline" onClick={() => navigate('/patients')} style={{ marginBottom: '1rem' }}>
                <ArrowLeft size={20} />
                Back to Patients
            </button>
            <div className="card">
                <h2 className="card-title">{patient.name}</h2>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={20} />
                        <span><strong>Age:</strong> {patient.age} years</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={20} />
                        <span><strong>Phone:</strong> {patient.phone}</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientProfile;
