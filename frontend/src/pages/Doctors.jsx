import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { doctorsAPI, departmentsAPI } from '../services/api';

const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({ name: '', department_id: '', phone: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [docsRes, deptsRes] = await Promise.all([
                doctorsAPI.getAll(),
                departmentsAPI.getAll(),
            ]);
            setDoctors(docsRes.data);
            setDepartments(deptsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDoctor) {
                await doctorsAPI.update(editingDoctor.id, formData);
            } else {
                await doctorsAPI.create(formData);
            }
            fetchData();
            closeModal();
        } catch (error) {
            console.error('Error saving doctor:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await doctorsAPI.delete(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting doctor:', error);
            }
        }
    };

    const openModal = (doctor = null) => {
        if (doctor) {
            setEditingDoctor(doctor);
            setFormData({
                name: doctor.name,
                department_id: doctor.department?.id || '',
                phone: doctor.phone,
            });
        } else {
            setEditingDoctor(null);
            setFormData({ name: '', department_id: '', phone: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDoctor(null);
        setFormData({ name: '', department_id: '', phone: '' });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        {
            key: 'department',
            label: 'Department',
            render: (row) => row.department?.name || 'N/A',
        },
        { key: 'phone', label: 'Phone' },
    ];

    if (loading) {
        return (
            <Layout title="Doctors">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Doctors">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Doctors</h2>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={20} />
                        Add Doctor
                    </button>
                </div>
                <Table
                    columns={columns}
                    data={doctors}
                    actions={(doctor) => (
                        <>
                            <button className="btn btn-outline" onClick={() => navigate(`/doctors/${doctor.id}`)}>
                                <Eye size={16} />
                            </button>
                            <button className="btn btn-outline" onClick={() => openModal(doctor)}>
                                <Edit2 size={16} />
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
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
                        <label className="form-label">Department</label>
                        <select
                            className="form-select"
                            value={formData.department_id}
                            onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
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
                            {editingDoctor ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Doctors;
