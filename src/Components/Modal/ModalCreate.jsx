import { useContext } from "react"
import { useNavigate } from 'react-router-dom';

// Context
import { RefContext } from "../../App"
const ModalCreate = ({modalTitle = "Modal Title", cardTitle = "Modal", rows, onSubmit}) => {
    const navigate = useNavigate();

    const onSub = async (e, submitEvent) =>{
        e.preventDefault();
        await submitEvent();
    }

    return (
        <form onSubmit={e => onSub(e, onSubmit)} className="size-full min-h-screen flex-grow col-flex-center absolute backdrop-blur-md">
            <div className="modal !block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-between">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button onClick={() => navigate(-1)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <div className="card-header text-center bg-success text-white">{cardTitle}</div>
                                <div className="card-body">
                                    {rows && rows}
                                </div>
                                <div className="card-footer text-center" id="card-footer">
                                    <input type="submit" className="m-3 bg-success text-white rounded border-white p-2" value="create" id="actionbutton"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ModalCreate;