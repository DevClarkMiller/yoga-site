const TableFormData = ({id, _type, val, change, labelTxt}) => {

    return(
        <td><label className="hide" htmlFor={id}>{labelTxt}</label><input value={val} onChange={change} id={id} type={_type}></input></td>
    );
}

export default TableFormData;