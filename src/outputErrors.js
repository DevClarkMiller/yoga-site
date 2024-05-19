const outputErrors = (err) =>{
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
}

export default outputErrors;