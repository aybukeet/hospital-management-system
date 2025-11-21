import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Stethoscope, Users, Calendar } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/departments', icon: Building2, label: 'Departments' },
        { path: '/doctors', icon: Stethoscope, label: 'Doctors' },
        { path: '/patients', icon: Users, label: 'Patients' },
        { path: '/appointments', icon: Calendar, label: 'Appointments' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <Stethoscope size={32} />
                <span>Hospital</span>
            </div>
            <nav>
                <ul className="sidebar-nav">
                    {navItems.map((item) => (
                        <li key={item.path} className="sidebar-nav-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                                }
                                end={item.path === '/'}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
