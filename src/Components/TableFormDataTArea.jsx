const TableFormDataTArea = ({id, _type, val, change, labelTxt}) =>{
    
    return(
        <td><label className="hide" htmlFor={id}>{labelTxt}</label><textarea value={val} onChange={change} id={id} type={_type}></textarea></td>
    );
}

export default TableFormDataTArea;