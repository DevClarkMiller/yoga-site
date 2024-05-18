import { useEffect } from "react";

const TableFormData = ({id, _type, val, change, labelTxt}) => {
    return(
        <td><label className="hide" htmlFor={id}>{labelTxt}</label><input value={val} onChange={(e) => change(e.target.value)} id={id} type={(_type) ? _type: "text"}></input></td>
    );
}

export default TableFormData;