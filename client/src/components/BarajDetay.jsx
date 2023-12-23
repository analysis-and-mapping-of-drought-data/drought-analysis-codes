import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function BarajDetay() {
    const { baraj_adi } = useParams();
    const [data, setData] = useState({}); // Initialize with an empty object

    const handleData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/baraj/year/${baraj_adi}`);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <div>
                <h2>{data[0].baraj_adi} Dam Details</h2>
                <ul>
                    {Object.entries(data[0]).map(([key, value]) => {
                        if (key.startsWith('yil_')) {
                            return (
                                <li key={key}>
                                    {key}: {value}
                                </li>
                            );
                        }
                        return null; // Exclude non-year keys
                    })}
                </ul>
            </div>
        </div>
    );
}

export default BarajDetay;
