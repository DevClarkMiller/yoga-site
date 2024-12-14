const TableFormData = ({id, _type, val, change, labelTxt, required = false}) => {

    return(
        <td><label className="hide" htmlFor={id}>{labelTxt}</label><input required = {required} value={val} onChange={change} id={id} type={_type}></input></td>
    );
}

export default TableFormData;