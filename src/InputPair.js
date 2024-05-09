const InputPair = ({labelText, placeHolder, id, inputType, control, setControl}) =>{
    return(
        <div className="inputPair">
            <label htmlFor={id}>{labelText}</label>
            <input value={control} onChange={(e) => setControl(e.target.value)} required placeholder={placeHolder} id={id} type="text" />
        </div>
    );
}

export default InputPair;