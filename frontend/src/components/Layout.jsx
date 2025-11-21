import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                {title && (
                    <div className="topbar">
                        <h1>{title}</h1>
                    </div>
                )}
                {children}
            </main>
        </div>
    );
};

export default Layout;
