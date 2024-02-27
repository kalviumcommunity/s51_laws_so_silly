import  { useState, useEffect } from 'react';
import Entity from './Entity';

const Entities = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchURL = "https://laws-so-silly.onrender.com/api/getData";
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
    }, []);
    
    return (
        <>
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
                        <Entity key={index} law={law} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Entities;
