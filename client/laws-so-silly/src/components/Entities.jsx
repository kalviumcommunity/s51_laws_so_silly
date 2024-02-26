import { useState, useEffect } from 'react';

const Entities = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("first")
                const response = await fetch("http://localhost:3000/api/getData");
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {data && (
                <div>
                    {
                        data.map((law, index) =>
                            <div key={index}>
                                <h1>{law.Country}</h1>
                                <p>{law.Law}</p>
                                <p>{law.Penalty}</p>
                                <p>{law.State_Region_if_applicable}</p>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    );
};

export default Entities;