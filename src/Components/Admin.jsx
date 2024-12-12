import { useEffect, useState, useContext, createContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// Functions
import { fetchPut } from "../fetch";

// Components
import TableFormData from "./TableFormData";

// Icons
import { IoIosLogIn } from "react-icons/io";

// Pages
import AdminDatesPage from "./AdminPages/AdminDatesPage";
import AdminContentPage from "./AdminPages/AdminContentPage";
import AdminReviewsPage from "./AdminPages/AdminReviewsPage";
import AdminDeleteReviewsPage from "./AdminPages/AdminDeleteReviewsPage";
import AdminQualificationsPage from "./AdminPages/AdminQualificationsPage";
import NotFound from "./NotFound";

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

    const [editLogin, setEditLogin] = useState({username: "", password: ""});
    const [editGeneral, setEditGeneral] = useState(datesConfigAll.general);
    const [editHeader, setEditHeader] = useState(datesConfigAll.header);
    const [editFooter, setEditFooter] = useState(datesConfigAll.footer);

    const [editContentP1, setEditContentP1] = useState(null);
    const [editContentP2, setEditContentP2] = useState(null);
    const [editContentP3, setEditContentP3] = useState(null);

    const [editNewReview, setEditNewReview] = useState("");

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

    return(
        <main className="min-h-screen size-full col-flex-center justify-center gap-3">
            <h1>Admin Panel</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <TableFormData _type={"text"} id={"username2"} val={editLogin.username} change={(e) => setEditLogin({...editLogin, username: e.target.value})} labelTxt={"Username"}/>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <TableFormData _type={"password"} id={"password2"} val={editLogin.password} change={(e) => setEditLogin({...editLogin, password: e.target.value})} labelTxt={"Password"}/>
                    </tr> 
                </tbody>
            </table>
            <Routes>
                <Route path="/" element={<div></div>} />
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
            <div className="buttonsNav col-flex-center font-bold">
                {/* <button onClick={() => navigate('/admin/dates')} className="sendButton">1</button> */}
                <button onClick={() => navigate('/admin/content')} className="sendButton">Edit Content</button>
                <button onClick={() => navigate('/admin/content/qualifications')} className="sendButton">Edit Qualifications</button>
                <button onClick={() => navigate('/admin/reviews')} className="sendButton">Add Reviews</button>
                <button onClick={() => navigate('/admin/deleteReviews')} className="sendButton">Delete Reviews</button>
            </div>
        </main>
        
    );
}

export default Admin;