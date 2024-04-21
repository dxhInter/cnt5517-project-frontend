import React, { useState } from 'react';  // Corrected import order
import { Link, useNavigate } from 'react-router-dom';

function ApplicationList({ apps }) {
  const navigate = useNavigate();
  const [threshold, setThreshold] = useState({});
  const [message, setMessage] = useState("");

  const handleClick_delete = (appId) => {
    fetch(`http://10.20.0.74:8888/apps/delete/${appId}`, {
      method: 'DELETE'
    }).then(() => {
      navigate('/'); // Consider using state update here instead of navigating
    });
  }

  const handleThreadStop = (appId) => {
    fetch('http://10.20.0.74:8888/apps/background/stop', {
      method: 'GET'
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

    fetch('http://10.20.0.74:8888/apps/run', { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    }).then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            setMessage("App runs successfully!");
            navigate('/');
          } else {
            setMessage(`App runs failed!: ${data.message}`);
          }
        }).catch(error => {
          setMessage(`request error: ${error.message}`);
        });
  }

  const handleThreadSubmit = (app, event) => {
    event.preventDefault();
    let appData = {
      app_id: app.id,
      relationship: app.relationship,
      threshold: threshold || ""
    };

    fetch('http://10.20.0.74:8888/apps/background', {
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

    fetch('http://10.20.0.74:8888/apps/startOrStop', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    }).then(() => {
      navigate('/');
    });
  }

  return (
      <div>{message && <div className="message">{message}</div>}
    <div className="app-list">
      {apps.map((app) => (
        <div className="app-preview" key={app.id}>
          <div className="details">
            <Link to={`/apps/update/${app.id}`}>
              <h2>{app.name}</h2>
              <p>Services: {app.service1} and {app.service2}</p>
              <p>Relationship: {app.relationship}</p>
              <p>Enabled: {app.enabled}</p>
              <p>Status: {app.status}</p>
            </Link>
          </div>
          <div className="actions">
            <button onClick={() => handleClick_delete(app.id)}>Delete</button>
            <form onSubmit={(e) => handleThreadStop(app.id)}>
              <button type="submit">Thread Stop</button>
            </form>
            <form onSubmit={(e) => handleSubmit(app, e)}>
              {app.relationship === 'condition' && (
                  <input
                      type="text"
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                  />
              )}
              <button type="submit">Run</button>
            </form>
            <form onSubmit={(e) => handleStop(app, e)}>
              <button type="submit">Stop</button>
            </form>
            <form onSubmit={(e) => handleThreadSubmit(app, e)}>
              <button type="submit">Thread Run</button>
            </form>
          </div>
        </div>
      ))}
    </div>
      </div>
  );
}

export default ApplicationList;
