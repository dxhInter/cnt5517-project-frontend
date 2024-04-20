import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationDetails = () => {
    const { id } = useParams(); // Extracting the 'id' from the route parameter
    const [name, setName] = useState('');
    const [enabled, setEnabled] = useState('');
    const [service1, setService1] = useState('');
    const [service2, setService2] = useState('');
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch application details and available services
        Promise.all([
            fetch(`http://10.20.0.74:8888/apps/${id}`, { method: 'GET' }),
            fetch('http://10.20.0.74:8888/services', { method: 'GET' })
        ]).then(async ([appRes, servicesRes]) => {
            if (!appRes.ok || !servicesRes.ok) {
                throw new Error('Failed to fetch data');
            }
            const appData = await appRes.json();
            const servicesData = await servicesRes.json();
            setName(appData.name);
            setEnabled(appData.enabled);
            setService1(appData.service1);
            setService2(appData.service2);
            setServices(servicesData.result);
        }).catch(error => {
            console.error('Failed to load data:', error);
            navigate('/'); // Redirecting to home on error
        });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const app = { name, enabled,service1, service2 };
        fetch(`http://10.20.0.74:8888/apps/update/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(app)
        })
        .then(() => navigate('/'))
        .catch(error => console.error('Failed to update data', error));
    };

    return (
        <div className="app-details">
            <h2>Modify Application</h2>
            <form onSubmit={handleSubmit}>
                <label>Service Name:</label>
                <input
                    type="text"
                    value={name?name:''}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Service status:</label>
                <input
                    type="text"
                    value={enabled?enabled:''}
                    onChange={(e) => setEnabled(e.target.value)}
                />
                <label>Please Select First Service:</label>
                <select
                    value={service1}
                    onChange={(e) => setService1(e.target.value)}>
                    <option value="">Please select</option>
                    {services.map(service => (
                        <option key={service.name} value={service.name}>{service.name}</option>
                    ))}
                </select>
                <label>Please Select Second Service:</label>
                <select
                    value={service2}
                    onChange={(e) => setService2(e.target.value)}>
                    <option value="">Please select</option>
                    {services.map(service => (
                        <option key={service.name} value={service.name}>{service.name}</option>
                    ))}
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ApplicationDetails;
