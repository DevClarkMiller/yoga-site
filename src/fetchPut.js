import outputErrors from "./outputErrors";
import checkResponseStatus from "./checkResponseStatus";
import api from "./ConfigFiles/api";

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

export default fetchPut;