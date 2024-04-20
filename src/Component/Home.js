import React, { useState, useEffect } from 'react';
import ApplicationList from "./ApplicationList";

const Home = () => {
    const [apps, setApps] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://10.20.0.74:8888/apps', { 
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }) 
            .then(res => {
                if (!res.ok) { 
                    throw Error('Could not fetch the data for the resource');
                }
                return res.json();
            })
            .then(data => {
                setApps(data.result); 
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });
    }, []);

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {apps && <ApplicationList apps={apps} />}
        </div>
    );
}

export default Home;
