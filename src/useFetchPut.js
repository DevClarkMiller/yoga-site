import { useState, useEffect } from "react";
import api from "./ConfigFiles/api";

const useFetchPut = (path, data) =>{
    const [putData, setPutData] = useState(null);
    const [putLoading, setPutLoading] = useState(true);
    const [putError, setPutError] = useState(null);

    useEffect(() => {
        const fetchData = async () =>{
            if(path){
                setPutLoading(true);
                try{
                    const response = await api.put(`/put${path}`, data, {headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }});   
                    setPutData(response.data);
                    setPutLoading(false);
                }catch(err){
                    setPutError(err);
                    setPutLoading(false);
                }
            }
        }
        fetchData();
    }, [path]);

    return { putData, putLoading, putError }
}

export default useFetchPut;