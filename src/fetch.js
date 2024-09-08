
import checkResponseStatus from "./Utilities/checkResponseStatus";
import outputErrors from "./Utilities/outputErrors";
import api from "./ConfigFiles/api";

const fetchGet = async (path) =>{
    try{
        const response = await api.get(`/get/${path}`, {headers: {
            'Accept': 'application/json'
        }});

        checkResponseStatus(response);
        return response.data;

    }catch(err){
        outputErrors(err);
    }
}

const fetchPut = async (path, data, onResolve) =>{
    try{
        const response = await api.put(`/put${path}`, data, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});   

        checkResponseStatus(response);
        onResolve(response.data);
    }catch(err){
        outputErrors(err);
    }
}

export { fetchGet, fetchPut }
