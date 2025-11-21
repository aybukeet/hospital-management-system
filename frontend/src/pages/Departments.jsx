import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { departmentsAPI } from '../services/api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await departmentsAPI.getAll();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDept) {
                await departmentsAPI.update(editingDept.id, formData);
            } else {
                await departmentsAPI.create(formData);
            }
            fetchDepartments();
            closeModal();
        } catch (error) {
            console.error('Error saving department:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await departmentsAPI.delete(id);
                fetchDepartments();
            } catch (error) {
                console.error('Error deleting department:', error);
            }
        }
    };

    const openModal = (dept = null) => {
        if (dept) {
            setEditingDept(dept);
            setFormData({ name: dept.name, description: dept.description });
        } else {
            setEditingDept(null);
            setFormData({ name: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDept(null);
        setFormData({ name: '', description: '' });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
    ];

    if (loading) {
        return (
            <Layout title="Departments">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Departments">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Departments</h2>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={20} />
                        Add Department
                    </button>
                </div>
                <Table
                    columns={columns}
                    data={departments}
                    actions={(dept) => (
                        <>
                            <button className="btn btn-outline" onClick={() => openModal(dept)}>
                                <Edit2 size={16} />
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(dept.id)}>
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingDept ? 'Edit Department' : 'Add Department'}
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
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-outline" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingDept ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Departments;
