const InputPair = ({labelText, placeHolder, id, inputType, control, setControl, aria}) =>{
    
    return(
        <div className="inputPair">
            <label htmlFor={id}>{labelText}</label>

            {(inputType) ? 
                <input aria-label={aria} value={control} onChange={(e) => setControl(e.target.value)} required placeholder={placeHolder} id={id} type={inputType} /> 
            : 
                <input aria-label={aria} value={control} onChange={(e) => setControl(e.target.value)} required placeholder={placeHolder} id={id} type='text' />}
            
        </div>
    );
}

export default InputPair;