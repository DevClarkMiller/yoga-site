import TableFormDataTArea from "./TableFormDataTArea";
import TableFormData from "./TableFormData";

const TableRow = ({item}) =>{
    const { th, isTArea, _type, id, val, change, labelTxt, property } = item;
    return(
        <tr>
            <th>{th}</th>
            {(!isTArea) ? 
            <TableFormData 
                _type={_type} 
                id={id} 
                val={val} 
                change={change} 
                labelTxt={labelTxt} 
            /> : 
            <TableFormDataTArea 
                _type={_type} 
                id={id} 
                val={val} 
                change={change} 
                labelTxt={labelTxt} 
            />
            }
        </tr>
    );
}

export default TableRow;