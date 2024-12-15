import React from 'react'

const ModalTextArea = ({value, onChange, name, title, placeholder, required = false}) => {
    return (
        <div className="row flex items-center justify-center">
            <div className="col-4 font-Poetson">{title}: </div>
            <div className="col-8">
                <textarea
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

export default ModalTextArea