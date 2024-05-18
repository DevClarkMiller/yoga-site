import { useEffect } from "react";

const TableFormDataTArea = ({id, _type, val, change, labelTxt}) =>{
    return(
        <td><label className="hide" htmlFor={id}>{labelTxt}</label><textarea value={val} onChange={(e) => change(e.target.value)} id={id} type={(_type) ? _type: "text"}></textarea></td>
    );
}

export default TableFormDataTArea;