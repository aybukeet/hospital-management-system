import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { appointmentsAPI, doctorsAPI, patientsAPI } from '../services/api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        doctor_id: '',
        patient_id: '',
        date: '',
        reason: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [appsRes, docsRes, patsRes] = await Promise.all([
                appointmentsAPI.getAll(),
                doctorsAPI.getAll(),
                patientsAPI.getAll(),
            ]);
            setAppointments(appsRes.data);
            setDoctors(docsRes.data);
            setPatients(patsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await appointmentsAPI.create(formData);
            fetchData();
            closeModal();
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Error: ' + (error.response?.data?.date?.[0] || 'Failed to create appointment'));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await appointmentsAPI.delete(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting appointment:', error);
            }
        }
    };

    const openModal = () => {
        setFormData({ doctor_id: '', patient_id: '', date: '', reason: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ doctor_id: '', patient_id: '', date: '', reason: '' });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'doctor',
            label: 'Doctor',
            render: (row) => row.doctor?.name || 'N/A',
        },
        {
            key: 'patient',
            label: 'Patient',
            render: (row) => row.patient?.name || 'N/A',
        },
        {
            key: 'date',
            label: 'Date',
            render: (row) => new Date(row.date).toLocaleString(),
        },
        { key: 'reason', label: 'Reason' },
    ];

    if (loading) {
        return (
            <Layout title="Appointments">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Appointments">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Appointments</h2>
                    <button className="btn btn-primary" onClick={openModal}>
                        <Plus size={20} />
                        Book Appointment
                    </button>
                </div>
                <Table
                    columns={columns}
                    data={appointments}
                    actions={(appointment) => (
                        <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>
                            <Trash2 size={16} />
                        </button>
                    )}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Book Appointment">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Doctor</label>
                        <select
                            className="form-select"
                            value={formData.doctor_id}
                            onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                            required
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.name} - {doc.department?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Patient</label>
                        <select
                            className="form-select"
                            value={formData.patient_id}
                            onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                            required
                        >
                            <option value="">Select Patient</option>
                            {patients.map((pat) => (
                                <option key={pat.id} value={pat.id}>
                                    {pat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date & Time</label>
                        <input
                            type="datetime-local"
                            className="form-input"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Reason</label>
                        <textarea
                            className="form-textarea"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-outline" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Book
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Appointments;
