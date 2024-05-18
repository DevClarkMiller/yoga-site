import TableFormDataTArea from "./TableFormDataTArea";
import TableFormData from "./TableFormData";
import TableRow from "./TableRow";
const AdminTable = ({tableRows}) =>{
    return(
        <table>
            <tbody>
                {
                    tableRows.map((item) =>(
                        <TableRow key={tableRows.indexOf(item)} item={item}/>
                    ))
                }
            </tbody>
        </table>

    );
}

export default AdminTable;