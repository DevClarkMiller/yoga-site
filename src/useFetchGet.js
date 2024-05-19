import { useState, useEffect } from "react";
import api from "./ConfigFiles/api";

const useFetchGet = (path) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () =>{
            if(path){
                setLoading(true);
                try{
                    const response = await api.get(path, {headers: {
                        'Accept': 'application/json'
                    }});
                    setData(response.data);
                    setLoading(false);
                }catch(err){
                    setError(err);
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [path]);

    return { data, loading, error }
}

export default useFetchGet;