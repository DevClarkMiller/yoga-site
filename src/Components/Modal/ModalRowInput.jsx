
const ModalRowInput = ({value, onChange, name, title, placeholder, required = false, type = "text"}) => {
    return(
        <div className="row flex items-center justify-center">
            <div className="col-4 font-Poetson">{title}: </div>
            <div className="col-8">
                <input type={type}
                    required = {required}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    className="form-control border border-gray-50" 
                    value={value}
                    onChange={e => onChange(e)}
                />
            </div>
        </div>
    );
}
export default ModalRowInput;