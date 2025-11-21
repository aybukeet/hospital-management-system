const StatsCard = ({ icon: Icon, title, value, color = 'primary' }) => {
    return (
        <div className="stats-card">
            <div className={`stats-icon ${color}`}>
                <Icon size={24} />
            </div>
            <div className="stats-content">
                <h3>{value}</h3>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default StatsCard;
