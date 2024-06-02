import { useEffect, useState, useContext, createContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { BsArrowDownSquare, BsArrowDownSquareFill } from "react-icons/bs";
import api from './ConfigFiles/api'
import {Oval } from 'react-loading-icons'
import { RefContext } from './App'
import AdminTable from "./AdminTable";
import NotFound from "./NotFound";
import TableFormData from "./TableFormData";
import TableFormDataTArea from "./TableFormDataTArea";
import DateConfig from './ConfigFiles/DatesConfig.json';
import outputErrors from "./outputErrors";
import checkResponseStatus from "./checkResponseStatus";
import fetchPut from "./fetchPut";
import AdminDatesPage from "./AdminPages/AdminDatesPage";
import AdminContentPage from "./AdminPages/AdminContentPage";
import AdminReviewsPage from "./AdminPages/AdminReviewsPage";
import AdminDeleteReviewsPage from "./AdminPages/AdminDeleteReviewsPage";
import AdminQualificationsPage from "./AdminPages/AdminQualificationsPage";

export const AdminDatesContext = createContext();
export const AdminContentContext = createContext();
export const AdminReviewsContext = createContext();
export const AdminReviewsDeleteContext = createContext();
export const AdminQualificationsContext = createContext();
const Admin = () =>{
    const navigate = useNavigate();

    const { reviews, setReviews, appRef, setIsAdmin, setDatesConfigAll, datesConfigAll, setContentConfig, contentConfig } = useContext(RefContext);

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [editLogin, setEditLogin] = useState({username: "", password: ""});
    const [editGeneral, setEditGeneral] = useState(datesConfigAll.general);
    const [editHeader, setEditHeader] = useState(datesConfigAll.header);
    const [editFooter, setEditFooter] = useState(datesConfigAll.footer);

    const [editContentP1, setEditContentP1] = useState(contentConfig.firstPanel);
    const [editContentP2, setEditContentP2] = useState(contentConfig.secondPanel);
    const [editContentP3, setEditContentP3] = useState(contentConfig.thirdPanel);

    const [editNewReview, setEditNewReview] = useState("");

    const [deletedReviews, setDeletedReviews] = useState([]);

    useEffect(()=>{
        setIsAdmin(true);        
        if(appRef.current){
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }
    }, []);

    useEffect(()=>{
        console.log(contentConfig);

        setEditContentP1(contentConfig.firstPanel);
        setEditContentP2(contentConfig.secondPanel)
        setEditContentP3(contentConfig.thirdPanel);

        setEditGeneral(datesConfigAll.general);
        setEditHeader(datesConfigAll.header);
        setEditFooter(datesConfigAll.footer);
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

        console.log(updatedData);
        fetchPut('/content', updatedData, (data) =>{
            setContentConfig(data);
            console.log('Dates data recieved');
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

        const reviewObj = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            url: editNewReview
        }

        console.log(reviewObj);
        if(editNewReview != null || editNewReview != ""){
            fetchPut('/reviewURL', reviewObj, (data) =>{
                setReviews(data);
                console.log('Put new review onto server!');
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
    
        //1. Filter out any deleted reviews
        let deletedReviewsIDS = [];
        deletedReviews.forEach((review) =>{
            deletedReviewsIDS.push(review.id);
        })

        const updatedData = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            reviews: deletedReviewsIDS
        }

        //3. Send new array to the back-end
        fetchPut('/reviews', updatedData, (data) =>{
            setReviews(data);
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    return(
        <div className="adminPage">
            <h1>Admin Panel</h1>
            <Link to={'/'}>Take me home</Link>
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
                    <AdminQualificationsContext.Provider value={{loading, submit}}>
                        <AdminQualificationsPage />
                    </AdminQualificationsContext.Provider>
                }/>

                <Route path="/reviews" element={
                    <AdminReviewsContext.Provider value={{onNewUrlSubmit, editLogin, setEditLogin, loading, submit, editNewReview, setEditNewReview}}>
                        <AdminReviewsPage />
                    </AdminReviewsContext.Provider>
                }/>
                <Route path="/deleteReviews" element={
                    <AdminReviewsDeleteContext.Provider value={{deletedReviews, setDeletedReviews, reviews, setReviews, editLogin, setEditLogin, loading, submit, onSubmitDeleteReviews}}>
                        <AdminDeleteReviewsPage />
                    </AdminReviewsDeleteContext.Provider>
                }/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            <div className="buttonsNav">
                <button onClick={() => navigate('/admin/dates')} className="sendButton">1</button>
                <button onClick={() => navigate('/admin/content')} className="sendButton">2</button>
                <button onClick={() => navigate('/admin/content/qualifications')} className="sendButton">3</button>
                <button onClick={() => navigate('/admin/reviews')} className="sendButton">4</button>
                <button onClick={() => navigate('/admin/deleteReviews')} className="sendButton">5</button>
            </div>
        </div>
        
    );
}

export default Admin;