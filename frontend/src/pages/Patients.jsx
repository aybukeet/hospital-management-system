import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { patientsAPI } from '../services/api';

const Patients = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [formData, setFormData] = useState({ name: '', age: '', phone: '' });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await patientsAPI.getAll();
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPatient) {
                await patientsAPI.update(editingPatient.id, formData);
            } else {
                await patientsAPI.create(formData);
            }
            fetchPatients();
            closeModal();
        } catch (error) {
            console.error('Error saving patient:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await patientsAPI.delete(id);
                fetchPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
        }
    };

    const openModal = (patient = null) => {
        if (patient) {
            setEditingPatient(patient);
            setFormData({ name: patient.name, age: patient.age, phone: patient.phone });
        } else {
            setEditingPatient(null);
            setFormData({ name: '', age: '', phone: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPatient(null);
        setFormData({ name: '', age: '', phone: '' });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' },
        { key: 'phone', label: 'Phone' },
    ];

    if (loading) {
        return (
            <Layout title="Patients">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Patients">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Patients</h2>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={20} />
                        Add Patient
                    </button>
                </div>
                <Table
                    columns={columns}
                    data={patients}
                    actions={(patient) => (
                        <>
                            <button className="btn btn-outline" onClick={() => navigate(`/patients/${patient.id}`)}>
                                <Eye size={16} />
                            </button>
                            <button className="btn btn-outline" onClick={() => openModal(patient)}>
                                <Edit2 size={16} />
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingPatient ? 'Edit Patient' : 'Add Patient'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-outline" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingPatient ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Patients;
