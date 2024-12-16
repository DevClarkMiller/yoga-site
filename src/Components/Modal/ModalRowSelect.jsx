
const ModalRowSelect = ({value, onChange, name, title, required = false, options}) => {
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
                    {options&& options.map((option) => <option value={option}>{`Layout: ${option + 1}`}</option>)}
                </select>
            </div>
        </div>
    );
}
export default ModalRowSelect;