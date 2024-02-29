import  { useState, useEffect } from 'react';
import Entity from './Entity';
import { ToastContainer } from 'react-toastify';

const Entities = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchURL = "https://laws-so-silly.onrender.com/api/getData";
    const [reload, setReload]  = useState(true)
    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await fetch(fetchURL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
            setIsLoading(false);
            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);
    
    return (
        <>
            <ToastContainer />
            {isLoading ? (
                <h1>
                    loading ...
                </h1>

            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <h1>Data from DB</h1>
                    {data.map((law, index) => (
                        <Entity key={index} setReload={setReload} law={law} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Entities;
