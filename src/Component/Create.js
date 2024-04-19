import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const Create = () => {
    const [name, setName] = useState('');
    const [service1, setService1] = useState('');
    const [service2, setService2] = useState('');
    const [relationship, setRelationship] = useState('order');
    const [threshold, setThreshold] = useState(''); 
    const [services, setServices] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => { 
      fetch('http://10.136.149.225:8888/services', { 
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      }) 
          .then(response => response.json())
          .then(data => setServices(data.result))
          .catch(error => console.error('Failed to load data', error));}, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      const id = services.length + 1; 
      let app = { name, id, service1, service2, relationship };

      if (relationship === 'condition') {
        app = { ...app, threshold };
      }
  
      fetch('http://10.136.149.225:8888/apps', { 
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app)
      }).then(() => {
        navigate('/'); 
      })
    }
  

    return (
      <div className="create">
          <h2>Add a New Application</h2>
          <form onSubmit={handleSubmit}>
              <label>Service Name:</label>
              <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <label>Please Select First Service:</label>
              <select
                  value={service1}
                  onChange={(e) => setService1(e.target.value)}
              >
                  <option value="">-- Select a Service --</option> 
                  {services.map(service => (
                      <option key={service.name} value={service.name}>{service.name}</option>
                  ))}
              </select>
              <label>Please Select Second Service:</label>
              <select
                  value={service2}
                  onChange={(e) => setService2(e.target.value)}
              >
                  <option value="">-- Select a Service --</option> 
                  {services.map(service => (
                      <option key={service.name} value={service.name}>{service.name}</option>
                  ))}
              </select>
              <label>Please Select Relationship:</label>
              <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
              >
                  <option value="order">order</option>
                  <option value="condition">condition</option>
              </select>
              {relationship === 'condition' && (
                  <div>
                      <label>Threshold:</label>
                      <input
                          type="text"
                          value={threshold}
                          onChange={(e) => setThreshold(e.target.value)}
                          placeholder="Enter threshold"
                      />
                  </div>
              )}
              <button>Add</button>
          </form>
      </div>
  );
}

   
export default Create;
