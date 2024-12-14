import { useEffect, useState, useContext, createContext, useReducer } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// Functions
import { fetchGet, fetchPut } from "../fetch";
import api from "../ConfigFiles/api";
import checkResponseStatus from "../Utilities/checkResponseStatus";

// Components
import TableFormData from "./TableFormData";
import { Oval } from "react-loading-icons";
import Modal from "./Modal/Modal";
import ModalCreate from './Modal/ModalCreate';
import ModalRowInput from "./Modal/ModalRowInput";

// Icons
import { IoIosLogIn } from "react-icons/io";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs"

// Pages
import AdminClasses from './AdminPages/AdminClasses';
import AdminDatesPage from "./AdminPages/AdminDatesPage";
import AdminContentPage from "./AdminPages/AdminContentPage";
import AdminReviewsPage from "./AdminPages/AdminReviewsPage";
import AdminDeleteReviewsPage from "./AdminPages/AdminDeleteReviewsPage";
import AdminQualificationsPage from "./AdminPages/AdminQualificationsPage";
import NotFound from "./NotFound";

// Reducers
import { classReducer, INITIAL_CLASS } from "./AdminPages/classReducer";

//Context
import { RefContext } from '../App'
export const AdminDatesContext = createContext();
export const AdminContentContext = createContext();
export const AdminReviewsContext = createContext();
export const AdminReviewsDeleteContext = createContext();
export const AdminQualificationsContext = createContext();

const Admin = () =>{
    const navigate = useNavigate();

    const { reviews, setReviews, appRef, setIsAdmin, setDatesConfigAll, datesConfigAll, setContentConfig, contentConfig, qualifications, setQualifications } = useContext(RefContext);

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [editLogin, setEditLogin] = useState(
        sessionStorage.getItem("login") !== null ? JSON.parse(sessionStorage.getItem("login")) :
        {username: "", password: ""}
    );
    const [editGeneral, setEditGeneral] = useState(datesConfigAll.general);
    const [editHeader, setEditHeader] = useState(datesConfigAll.header);
    const [editFooter, setEditFooter] = useState(datesConfigAll.footer);

    const [editContentP1, setEditContentP1] = useState(null);
    const [editContentP2, setEditContentP2] = useState(null);
    const [editContentP3, setEditContentP3] = useState(null);

    const [editNewReview, setEditNewReview] = useState("");

    // Reducers
    const [editClass, dispatchClass] = useReducer(classReducer, INITIAL_CLASS);


    useEffect(()=>{
        setIsAdmin(true);        
        if(appRef.current){
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }
    }, []);

    useEffect(()=>{
        console.log(contentConfig);
        if(contentConfig){
            setEditContentP1(contentConfig[0]);
            setEditContentP2(contentConfig[1]);
            setEditContentP3(contentConfig[2]);
        }

        // setEditGeneral(datesConfigAll.general);
        // setEditHeader(datesConfigAll.header);
        // setEditFooter(datesConfigAll.footer);
    }, [contentConfig]);

    const handleClassChange = e =>{
        dispatchClass({
            type:"CHANGE_INPUT", 
            payload:{ name: e.target.name, value:e.target.value }
        });
    }

    const handleAddImage = e =>{
        const file = e.target.files[0];
        let reader = new FileReader();
        if (file)
            reader.readAsDataURL(file);
        reader.onload = readerEvt =>{
            const binStr = reader.result;
            const encodedStr = btoa(binStr);

            dispatchClass({
                type:"CHANGE_INPUT", 
                payload:{ name: e.target.name, value:encodedStr }
            });
        }
    }

    const onSubmit = async (e) =>{
        setLoading(true);
        console.log('VERSION: 1.16');
        e.preventDefault();

        const updatedData = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            general: {
                title: editGeneral.title,
                subtitle: editGeneral.subtitle,
                description: editGeneral.description,
                orgName: editGeneral.orgName,
                location: editGeneral.location,
                fee: editGeneral.fee
            },
            header: {
                day: editHeader.day,
                month: editHeader.month,
                daysAvailable: editHeader.daysAvailable,
                times: editHeader.times,
                colour: editHeader.colour
            },

            footer: {
                day: editFooter.day,
                month: editFooter.month,
                daysAvailable: editFooter.daysAvailable,
                times: editFooter.times,
                colour: editFooter.colour
            }
        }

        fetchPut('/all', updatedData, (data) =>{
            setDatesConfigAll({
                general: data.general,
                header: data.header,
                footer: data.footer
            });
            
            console.log('Dates data recieved');
            setLoading(false);
            setSubmit(true);
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    const onContentSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        const updatedData = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            firstPanel: editContentP1,
            secondPanel: editContentP2,
            thirdPanel: editContentP3
        }

        fetchPut('/content', updatedData, editLogin, (data) =>{
            setContentConfig(data);
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    const onNewUrlSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        if(editNewReview != null || editNewReview != ""){
            fetchPut('/reviewURL', { url: editNewReview }, editLogin, (data) =>{
                setReviews(data);
                setLoading(false);
                setSubmit(true);
                //Delays un-filling the downloading button
                setTimeout(()=>{
                    setSubmit(false);
                }, 1000);
            });
        }
    }

    const onSubmitDeleteReviews = (e) =>{
        e.preventDefault();
        setLoading(true);

        //3. Send new array to the back-end
        fetchPut('/reviews', reviews, editLogin, (data) =>{
            setReviews(data);
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    const onSubmitQualifications = (e) =>{
        e.preventDefault();
        setLoading(true);

        fetchPut('/qualifications', qualifications, editLogin, (data) =>{
            setQualifications(data);
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    const onLogin = async e =>{
        e.preventDefault();
        setLoading(true);

        sessionStorage.setItem("login", JSON.stringify(editLogin));

        try{
            setSubmit(true);
            const response = await api.get(`/login`, {headers: {
                'Accept': 'application/json'
            },
            params: editLogin});
            setIsLoggedIn(true);
        }catch(err){
            if (err.response.data){
                alert(err.response.data.error);
            }else
                alert("Error: Unknown, try checking login credentials");
        }finally{
            setLoading(false);
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        }
    }

    const onCreateClass = async () =>{
        setLoading(true);
        try{
            setSubmit(true);
            const response = await api.post('/class', editClass, {params: editLogin});
            console.log(response.data);
        }catch(err){
            if (err.response.data){
                alert(err.response.data.error);
            }else
                alert("Error: Unknown, try checking login credentials");
        }finally{
            setLoading(false);
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        }
        
        dispatchClass({
            type:"RESET_FIELDS"
        });
    }

    // Use session storage to store a class object when it's updated from state
    const onEditClass = async () =>{
        setLoading(true);
        fetchPut('/class', editClass, editLogin, (data) =>{
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    return(
        <main className="min-h-screen size-full col-flex-center justify-center gap-3">
            <h1>Admin Panel</h1>
            {!isLoggedIn && <form onSubmit={onLogin} className="col-flex-center gap-2">
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <TableFormData required _type={"text"} id={"username2"} val={editLogin.username} change={(e) => setEditLogin({...editLogin, username: e.target.value})} labelTxt={"Username"}/>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <TableFormData required _type={"password"} id={"password2"} val={editLogin.password} change={(e) => setEditLogin({...editLogin, password: e.target.value})} labelTxt={"Password"}/>
                        </tr> 
                    </tbody>
                </table>
                <button className="adminBtn text-4xl" type="submit">{
                    (loading) ? <Oval /> : (submit) ? <IoIosLogIn className="text-blue"/> : <IoIosLogIn />}
                </button> 
            </form>}
            <Routes>
                <Route path="/" element={<div></div>} />
                <Route path="/classes/*" element={<AdminClasses />} />
                <Route path="/classes/create" element={
                    <ModalCreate  
                        modalTitle="Create Class"
                        cardTitle="Create Class"
                        onSubmit={onCreateClass}
                        rows={<>
                                <ModalRowInput name="title"
                                    placeholder="Restorative Yoga"
                                    title="Class Title"
                                    value={editClass.title}
                                    required
                                    onChange={handleClassChange}
                                    key="title"
                                />
                                <ModalRowInput name="subtitle"
                                    placeholder="Rest and Relax"
                                    title="Class Subtitle"
                                    value={editClass.subtitle}
                                    required
                                    onChange={handleClassChange}
                                    key="subtitle"
                                />
                                <ModalRowInput name="description"
                                    placeholder="Something descriptive"
                                    title="Class Description"
                                    value={editClass.description}
                                    required
                                    onChange={handleClassChange}
                                    key="description"
                                />
                                <ModalRowInput name="fee"
                                    type="number"
                                    placeholder="10"
                                    title="Class Fee"
                                    value={editClass.fee}
                                    required
                                    onChange={handleClassChange}
                                    key="fee"
                                />
                                <ModalRowInput name="image64"
                                    type="file"
                                    placeholder=""
                                    title="Class Image"
                                    onChange={handleAddImage}
                                    key="image64"
                                />
                            </>}
                    />
                    } />

                <Route path="/dates" element={
                    <AdminDatesContext.Provider value={{onSubmit, editLogin, setEditLogin, editGeneral, setEditGeneral, editHeader, setEditHeader, editFooter, setEditFooter, loading, submit}}>
                        <AdminDatesPage />
                    </AdminDatesContext.Provider>
                }/>

                <Route path="/content" element={ 
                    <AdminContentContext.Provider value={{onContentSubmit, editLogin, setEditLogin, editContentP1, setEditContentP1, editContentP2, setEditContentP2, editContentP3, setEditContentP3, loading, submit}}> 
                        <AdminContentPage /> 
                    </AdminContentContext.Provider>
                }/>

                <Route path="/content/qualifications" element={
                    <AdminQualificationsContext.Provider value={{loading, submit, qualifications, setQualifications, editLogin, setEditLogin, onSubmitQualifications}}>
                        <AdminQualificationsPage />
                    </AdminQualificationsContext.Provider>
                }/>

                <Route path="/reviews" element={
                    <AdminReviewsContext.Provider value={{onNewUrlSubmit, editLogin, setEditLogin, loading, submit, editNewReview, setEditNewReview}}>
                        <AdminReviewsPage />
                    </AdminReviewsContext.Provider>
                }/>
                <Route path="/deleteReviews" element={
                    <AdminReviewsDeleteContext.Provider value={{reviews, setReviews, editLogin, setEditLogin, loading, submit, onSubmitDeleteReviews}}>
                        <AdminDeleteReviewsPage />
                    </AdminReviewsDeleteContext.Provider>
                }/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            {isLoggedIn&&<div className="buttonsNav col-flex-center font-bold">
                {/* <button onClick={() => navigate('/admin/dcontentates')} className="sendButton">1</button> */}
                <button onClick={() => navigate('/admin/classes')} className="sendButton">Edit Classes</button>
                <button onClick={() => navigate('/admin/content')} className="sendButton">Edit Content</button>
                <button onClick={() => navigate('/admin/content/qualifications')} className="sendButton">Edit Qualifications</button>
                <button onClick={() => navigate('/admin/reviews')} className="sendButton">Add Reviews</button>
                <button onClick={() => navigate('/admin/deleteReviews')} className="sendButton">Delete Reviews</button>
            </div>}
        </main>
        
    );
}

export default Admin;