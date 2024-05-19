import { useState, useEffect } from "react";
import api from "./ConfigFiles/api";

const useFetchGet = (url) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try{
                const response = await api.get(url, {headers: {
                    'Accept': 'application/json'
                }});
                setData(response.data);
                setLoading(false);
            }catch(err){
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error }
}

export default useFetchGet;