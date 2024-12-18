import { useEffect } from "react";

const ModalRowSelect = ({value, onChange, name, title, required = false, options}) => {
    useEffect(() =>{
        if ((value === undefined) && options?.length > 0){
            onChange({target: {name: name, value: options[0].value} });
        }
    }, [value, options]);
    return(
        <div className="row flex items-center justify-center">
            <div className="col-4 font-Poetson">{title}: </div>
            <div className="col-8">
                <select
                    required = {required}
                    id={name}
                    name={name}
                    className="form-control border border-gray-50" 
                    value={value}
                    onChange={e => onChange(e)}
                >
                    {options&& options.map((option) => <option value={option.value}>{option.label}</option>)}
                </select>
            </div>
        </div>
    );
}
export default ModalRowSelect;