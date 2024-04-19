import React, { useState } from 'react';  // Corrected import order
import { Link, useNavigate } from 'react-router-dom';

function ApplicationList({ apps }) {
  const navigate = useNavigate();
  const [threshold, setThreshold] = useState({}); 

  const handleClick_delete = (appId) => {
    fetch(`http://10.136.149.225:8888/apps/delete/${appId}`, { 
      method: 'DELETE'
    }).then(() => {
      navigate('/'); // Consider using state update here instead of navigating
    });
  }

  const handleClick_background = (appId) => {
    fetch('http://10.136.149.225:8888/apps/delete', { 
      method: 'DELETE'
    }).then(() => {
      navigate('/'); // Consider using state update here instead of navigating
    });
  }
  const handleSubmit = (app, event) => {
    event.preventDefault();
    let appData = {
      app_id: app.id,
      relationship: app.relationship,
      threshold: threshold || "" 
    };

    fetch('http://10.136.149.225:8888/apps/run', { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    }).then(() => {
      navigate('/');
    });
  }
  const handleStop = (app, event) => {
    event.preventDefault();
    let appData = {
      app_id: app.id,
      enabled: "stopped"
    };

    fetch('http://10.136.149.225:8888/apps/startOrStop', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    }).then(() => {
      navigate('/');
    });
  }
  
  return (
    <div className="app-list">
      {apps.map((app) => (
        <div className="app-preview" key={app.id}>
          <div className="details">
            <Link to={`/apps/update/${app.id}`}>
              <h2>{app.name}</h2>
              <p>Services: {app.service1} and {app.service2}</p>
              <p>Relationship: {app.relationship}</p>
              <p>Status: {app.enabled}</p>
            </Link>
          </div>
          <div className="actions">
            <button onClick={() => handleClick_delete(app.id)}>Delete</button>
            <form onSubmit={(e) => handleStop(app, e)}>
                <button type="submit">Stop</button>
            <form onSubmit={(e) => handleSubmit(app, e)}>
              {app.relationship === 'condition' && (
                <input
                  type="text"
                  value="Input threshold"
                  onChange={(e) => setThreshold(e.target.value)}
                />
              )}
              <button type="submit">Run</button>
              </form>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
