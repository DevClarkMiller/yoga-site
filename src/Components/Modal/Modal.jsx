import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Context
import { RefContext } from "../../App"

const Modal = ({modalTitle = "Modal Title", cardTitle = "Modal", rows, actionText = "update", onSubmit, canDelete = false, onDelete, delDialog}) => {
    const navigate = useNavigate();

    const [showDialog, setShowDialog] = useState(false);

    const onSub = async e =>{
        e.preventDefault();
        await onSubmit();
        navigate(-1);
    }

    return (
        <form onSubmit={onSub} className="flex-grow col-flex-center min-h-screen">
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
                                    <input type="submit" className="m-3 bg-success text-white rounded border-white p-2" value={actionText} id="actionbutton"></input>
                                    {canDelete&& <input onClick={() => setShowDialog(true)} type="button" className="m-3 bg-red-500 text-white rounded border-white p-2" value="delete" id="deletebutton"></input>}
                                </div>
                                {showDialog && <div className="alert alert-danger fade show w-80 mt-[2vh] ml-[15%]" role="alert" id="deletedialog">
                                    <div className="font-bold">{delDialog}</div>
                                    <div className="row">
                                    <input onClick={onDelete} type="button" className="btn btn-secondary mt-3" value="yes" id="yesbutton"></input>
                                    <input onClick={() => setShowDialog(false)} type="button" className="btn btn-secondary mt-3" value="no" id="nobutton"></input>
                                    </div>
                                </div>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Modal