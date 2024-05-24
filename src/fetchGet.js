import checkResponseStatus from "./checkResponseStatus";
import outputErrors from "./outputErrors";
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

export default fetchGet;