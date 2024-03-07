import { useState, useEffect } from 'react';
import Entity from './Entity';
import { ToastContainer } from 'react-toastify';

const Entities = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [filteredData, setFilteredData] = useState(null);
    const [continents, setContinents] = useState(null);
    const [filter, setFilter] = useState("all");
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
            // Extract continents from data
            const uniqueContinents = [...new Set(jsonData.map(law => law.Continent))];
            setContinents(uniqueContinents);
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

    useEffect(() => {
        // Filter data based on selected continent
        setFilteredData(filter === "all" ? data : data.filter(law => law.Continent === filter));
    }, [filter, data]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <>
            <ToastContainer />
            {isLoading ? (
                <h1>
                    Loading ...
                </h1>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <h1>Data laws from <span style={{ color: "red" }}>{filter}</span> {filter === "all" ? "continents" : "continent"} from DB</h1>
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        {continents && continents.map((continent, index) => (
                            <option key={index} value={continent}>{continent}</option>
                        ))}
                    </select>
                    {filteredData && filteredData.map((law, index) => (
                        <Entity key={index} setReload={setReload} law={law} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Entities;
