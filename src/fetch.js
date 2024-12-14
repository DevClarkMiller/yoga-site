
import checkResponseStatus from "./Utilities/checkResponseStatus";
import outputErrors from "./Utilities/outputErrors";
import api from "./ConfigFiles/api";

const fetchGet = async (path, params = null) =>{
    try{
        const response = await api.get(`${path}`, {headers: {
            'Accept': 'application/json'
        },
        params: params});

        checkResponseStatus(response);
        return response.data;

    }catch(err){
        outputErrors(err);
    }
}

const fetchPut = async (path, data, params = null, onResolve) =>{
    try{
        const response = await api.put(`${path}`, data, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    params: params});   

        checkResponseStatus(response);
        onResolve(response.data);
    }catch(err){
        outputErrors(err);
    }
}

export { fetchGet, fetchPut }
