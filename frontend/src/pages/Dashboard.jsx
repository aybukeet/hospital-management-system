import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import { Building2, Stethoscope, Users, Calendar } from 'lucide-react';
import { departmentsAPI, doctorsAPI, patientsAPI, appointmentsAPI } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        departments: 0,
        doctors: 0,
        patients: 0,
        appointments: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [depts, docs, pats, apps] = await Promise.all([
                    departmentsAPI.getAll(),
                    doctorsAPI.getAll(),
                    patientsAPI.getAll(),
                    appointmentsAPI.getAll(),
                ]);
                setStats({
                    departments: depts.data.length,
                    doctors: docs.data.length,
                    patients: pats.data.length,
                    appointments: apps.data.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <Layout title="Dashboard">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Dashboard">
            <div className="stats-grid">
                <StatsCard
                    icon={Building2}
                    title="Departments"
                    value={stats.departments}
                    color="primary"
                />
                <StatsCard
                    icon={Stethoscope}
                    title="Doctors"
                    value={stats.doctors}
                    color="secondary"
                />
                <StatsCard
                    icon={Users}
                    title="Patients"
                    value={stats.patients}
                    color="success"
                />
                <StatsCard
                    icon={Calendar}
                    title="Appointments"
                    value={stats.appointments}
                    color="warning"
                />
            </div>
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Welcome to Hospital Management System</h2>
                </div>
                <p>Use the sidebar to navigate through different sections.</p>
            </div>
        </Layout>
    );
};

export default Dashboard;
