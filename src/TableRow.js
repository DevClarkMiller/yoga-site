import TableFormDataTArea from "./TableFormDataTArea";
import TableFormData from "./TableFormData";

const TableRow = (item) =>{
    const data = item.item;
    return(
        <tr>
            <th>{data.th}</th>
            {(!data.isTArea) ? 
            <TableFormData _type={data._type} id={data.id} val={data.val} change={data.change} labelTxt={data.labelTxt}/> : 
            <TableFormDataTArea _type={data._type} id={data.id} val={data.val} change={data.change} labelTxt={data.labelTxt}/>
            }
        </tr>
    );
}

export default TableRow;