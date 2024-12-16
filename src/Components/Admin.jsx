import { useEffect, useState, useContext, createContext, useReducer } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// Functions
import { fetchGet, fetchPut } from "../fetch";
import api from "../ConfigFiles/api";

// Components
import TableFormData from "./TableFormData";
import { Oval } from "react-loading-icons";
import Modal from "./Modal/Modal";
import ModalRowInput from "./Modal/ModalRowInput";
import ModalTextArea from "./Modal/ModalTextArea";
import ModalRowSelect from "./Modal/ModalRowSelect";
import HyperLinkWithIcon from "./Utilities/HyperLinkWithIcon";
import AdminNavList from "./AdminPages/AdminNavList";

// Icons
import { IoIosLogIn } from "react-icons/io";
import { MdInfo } from "react-icons/md";


// Pages
import AdminPage from "./AdminPages/AdminPage";
import AdminReviewsPage from "./AdminPages/AdminReviewsPage";
import AdminDeleteReviewsPage from "./AdminPages/AdminDeleteReviewsPage";
import NotFound from "./NotFound";

// Reducers
import { classReducer, INITIAL_CLASS } from "./AdminPages/classReducer";
import { locationReducer, INITIAL_LOCATION } from "./AdminPages/locationReducer";
import { contentReducer, INITIAL_CONTENT } from "./AdminPages/contentReducer";
import { qualificationReducer, INITIAL_QUALIFICATION } from "./AdminPages/qualificationReducer";

//Context
import { RefContext } from '../App'
export const AdminDatesContext = createContext();
export const AdminContentContext = createContext();
export const AdminReviewsContext = createContext();
export const AdminReviewsDeleteContext = createContext();
export const AdminQualificationsContext = createContext();

const Admin = () =>{
    const navigate = useNavigate();

    const { reviews, setReviews, appRef, setIsAdmin, contentConfig, qualifications, setQualifications, fetchClasses, fetchLocations, classes, locations, fetchContent, fetchQualifications, modalActive } = useContext(RefContext);

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [editLogin, setEditLogin] = useState(
        sessionStorage.getItem("login") !== null ? JSON.parse(sessionStorage.getItem("login")) :
        {username: "", password: ""}
    );

    const [editNewReview, setEditNewReview] = useState("");

    // Reducers
    const [editClass, dispatchClass] = useReducer(classReducer, INITIAL_CLASS);
    const [editLocation, dispatchLocation] = useReducer(locationReducer, INITIAL_LOCATION);
    const [editContent, dispatchContent] = useReducer(contentReducer, INITIAL_CONTENT);
    const [editQualification, dispatchQualification] = useReducer(qualificationReducer, INITIAL_QUALIFICATION);

    useEffect(()=>{
        setIsAdmin(true);        
        if(appRef.current){
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }
    }, []);


    // Whenever page loads and there's valid login credentials in the sessionStorage
    useEffect(() =>{
        if (sessionStorage.getItem("login")){
            setEditLogin(JSON.parse(sessionStorage.getItem("login")));
            if (login())
                setIsLoggedIn(true);
        }
    }, []);

    const handleChange = (dispatchFunc, e) =>{
        dispatchFunc({
            type:"CHANGE_INPUT", 
            payload:{ name: e.target.name, value:e.target.value }
        });
    }

    const handleClassChange = e =>{ handleChange(dispatchClass, e); }
    const handleLocationChange = e => { handleChange(dispatchLocation, e); }
    const handleContentChange = e => { handleChange(dispatchContent, e); }
    const handleQualificationChange = e => { handleChange(dispatchQualification, e); }

    const handleSet = (dispatchFunc, name, payload) =>{
        dispatchFunc({
            type: `SET_${name}`,
            payload: payload
        });
    }

    const handleSetClass = (_class) =>{ handleSet(dispatchClass, "CLASS", _class); }
    const handleSetLocation = (location) =>{ handleSet(dispatchLocation, "LOCATION", location); }
    const handleSetContent = (content) =>{ handleSet(dispatchContent, "CONTENT", content); }
    const handleSetQualification = (qualification) =>{ handleSet(dispatchQualification, "QUALIFICATION", qualification); }

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

    const login = async () =>{
        sessionStorage.setItem("login", JSON.stringify(editLogin));

        try{
            setSubmit(true);
            await api.get(`/login`, {headers: {
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

    const onLogin = async e =>{
        e.preventDefault();
        setLoading(true);
        login();
    }

    const onUpdate = (path, updatedData, fetchFunc) =>{
        setLoading(true);
        fetchPut(path, updatedData, editLogin, (data) =>{
            setLoading(false);
            setSubmit(true);
            fetchFunc();
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        });
    }

    // Use session storage to store a class object when it's updated from state
    const onUpdateClass = async () =>{
        onUpdate('/class', editClass, fetchClasses);
        localStorage.removeItem("selectedClass");
        sessionStorage.removeItem("selectedClass");
    }

    const onUpdateLocation = async () =>{
        onUpdate('/location', editLocation, fetchLocations);
    }

    const onUpdateQualification = async () =>{
        onUpdate('/qualification', editQualification, fetchQualifications);
    }

    const onDelete = async (dispatchFunc, fetchFunc, path, id) =>{
        setLoading(true);
        try{
            const params = editLogin;
            params[`${path}_ID`] = id;
            setSubmit(true);
            await api.delete(`/${path}`, 
                {params: params});
                fetchFunc();
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

        navigate(-1);        
        dispatchFunc({
            type:"RESET_FIELDS"
        });
    }

    const onDeleteClass = async () =>{
        onDelete(dispatchClass, fetchClasses, 'class', editClass.class_ID);
        localStorage.removeItem("selectedClass");
        sessionStorage.removeItem("selectedClass");
    }

    const onDeleteLocation = async () =>{
        onDelete(dispatchLocation, fetchLocations, 'location', editLocation.location_ID);
    }

    const onDeleteQualification = async () =>{
        onDelete(dispatchQualification, fetchQualifications, 'qualification', editQualification.qualification_ID);
    }

    const onCreate = async (path, newData, fetchFunc, dispatch) => {
        setLoading(true);
        try{
            setSubmit(true);
            await api.post(path, newData, {params: editLogin});
            fetchFunc();
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
        
        dispatch({
            type:"RESET_FIELDS"
        });
    }

    const onCreateClass = async () =>{
        onCreate('/class', editClass, fetchClasses, dispatchClass);
    }
    
    const onCreateQualification = () =>{
        onCreate('/qualification', editQualification, fetchQualifications, dispatchQualification);
    }

    const onCreateLocation = async () =>{
        onCreate('/location', fetchLocations, dispatchLocation);
    }

    const onUpdateContent = async () =>{
        onUpdate('/content', editContent, fetchContent);
    }

    return(
        <main className="h-screen justify-between gap-3 pt-24">
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
                <Route path="/classes/*" element={isLoggedIn&& <AdminPage 
                    handleSet={handleSetClass} 
                    dispatch={dispatchContent}
                    content={classes}
                    pageType="Classes"
                    updateID="class_ID"
                    updateName="title"
                    canAdd
                />}/>
                <Route path="/locations/*" element={isLoggedIn&& <AdminPage 
                    handleSet={handleSetLocation} 
                    dispatch={dispatchLocation}
                    content={locations}
                    pageType="Locations"
                    updateID="location_ID"
                    updateName="address"
                    canAdd
                    extraRows={<li className="list-btn font-bold">
                        <HyperLinkWithIcon href="https://www.latlong.net/convert-address-to-lat-long.html" icon={<MdInfo />}>Get Long and Lat from Address</HyperLinkWithIcon>
                    </li>}
                />}/>

                <Route path="/content/*" element={isLoggedIn&& <AdminPage 
                    handleSet={handleSetContent} 
                    dispatch={dispatchContent}
                    content={contentConfig}
                    pageType="Content"
                    updateID="contentPanel_ID"
                    updateName="header"
                />}/>

                <Route path="/content/qualifications/*" element={isLoggedIn&& <AdminPage 
                    handleSet={handleSetQualification} 
                    dispatch={dispatchQualification}
                    content={qualifications}
                    pageType="Qualification"
                    updateID="qualification_ID"
                    updateName="text"
                    canAdd
                />}/>

                <Route path="/content/qualifications/create" element={
                    <Modal  
                        actionText="create"
                        modalTitle="Create Qualification"
                        cardTitle="Create Qualification"
                        onSubmit={onCreateQualification}
                        rows={<>
                                <ModalRowInput name="text"
                                    placeholder="100 hour yoga course"
                                    title="Qualification Text"
                                    value={editQualification.text}
                                    required
                                    onChange={handleQualificationChange}
                                    key="text"
                                />
                            </>}
                    />
                } />

                <Route path="/content/qualifications/update/:qualification_ID" element={isLoggedIn&&
                    <Modal  
                        modalTitle="Update Qualification"
                        cardTitle="Update Qualification"
                        onSubmit={onUpdateQualification}
                        delDialog="Delete Qualification?"
                        canDelete
                        onDelete={onDeleteQualification}
                        actionText="update"
                        rows={<>
                                <ModalRowInput name="text"
                                    placeholder="100 hour yoga course"
                                    title="Qualification Text"
                                    value={editQualification.text}
                                    required
                                    onChange={handleQualificationChange}
                                    key="text"
                                />
                            </>}
                    />
                } />
                
                <Route path="/locations/create" element={
                    <Modal  
                        actionText="create"
                        modalTitle="Create Location"
                        cardTitle="Create Location"
                        onSubmit={onCreateLocation}
                        rows={<>
                                <ModalRowInput name="address"
                                    placeholder="123 something street"
                                    title="Location Address"
                                    value={editLocation.address}
                                    required
                                    onChange={handleLocationChange}
                                    key="address"
                                />
                                <ModalRowInput name="lat"
                                    type="number"
                                    placeholder="40"
                                    title="Location Latitude"
                                    value={editLocation.lat}
                                    required
                                    onChange={handleLocationChange}
                                    key="latitude"
                                />
                                <ModalRowInput name="long"
                                    type="number"
                                    placeholder="40"
                                    title="Location Longitude"
                                    value={editLocation.long}
                                    required
                                    onChange={handleLocationChange}
                                    key="longitude"
                                />
                            </>}
                    />
                } />

                <Route path="/locations/update/:location_ID" element={isLoggedIn&&
                    <Modal  
                        modalTitle="Update Location"
                        cardTitle="Update Location"
                        onSubmit={onUpdateLocation}
                        delDialog="Delete location?"
                        canDelete
                        onDelete={onDeleteLocation}
                        actionText="update"
                        rows={<>
                                <ModalRowInput name="address"
                                    placeholder="123 something street"
                                    title="Location Address"
                                    value={editLocation.address}
                                    required
                                    onChange={handleLocationChange}
                                    key="address"
                                />
                                <ModalRowInput name="lat"
                                    type="number"
                                    placeholder="40"
                                    title="Location Latitude"
                                    value={editLocation.lat}
                                    required
                                    onChange={handleLocationChange}
                                    key="latitude"
                                />
                                <ModalRowInput name="long"
                                    type="number"
                                    placeholder="40"
                                    title="Location Longitude"
                                    value={editLocation.long}
                                    required
                                    onChange={handleLocationChange}
                                    key="longitude"
                                />
                            </>}
                    />
                } />


                <Route path="/classes/create" element={isLoggedIn&&
                    <Modal  
                        actionText="create"
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
                                <ModalTextArea name="description"
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

                <Route path="/classes/update/:class_ID" element={isLoggedIn&&
                    <Modal  
                        modalTitle="Update Class"
                        cardTitle="Update Class"
                        onSubmit={onUpdateClass}
                        delDialog="Delete class?"
                        canDelete
                        onDelete={onDeleteClass}
                        actionText="update"
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

                <Route path="/content/update/:contentPanel_ID" element={isLoggedIn&&
                    <Modal  
                        modalTitle="Update Content"
                        cardTitle="Update Content"
                        onSubmit={onUpdateContent}
                        actionText="update"
                        rows={<>
                                <ModalRowInput name="header"
                                    placeholder="This is a header"
                                    title="Panel Header"
                                    value={editContent.header}
                                    required
                                    onChange={handleContentChange}
                                    key="header"
                                />
                                <ModalTextArea name="text"
                                    placeholder="Here is some content"
                                    title="Panel Text"
                                    value={editContent.text}
                                    required
                                    onChange={handleContentChange}
                                    key="text"
                                />
                                <ModalRowSelect name="layout"
                                    title="Panel Layout"
                                    value={editContent.layout}
                                    required
                                    onChange={handleContentChange}
                                    key="layout"
                                    options={[0, 1]}
                                />
                                <ModalRowInput name="colour"
                                    type="color"
                                    placeholder="#BCFCEC"
                                    title="Panel Colour"
                                    value={editContent.colour}
                                    required
                                    onChange={handleContentChange}
                                    key="colour"
                                />
                            </>}
                    />
                } />

                <Route path="/reviews" element={isLoggedIn&&
                    <AdminReviewsContext.Provider value={{onNewUrlSubmit, editLogin, setEditLogin, loading, submit, editNewReview, setEditNewReview}}>
                        <AdminReviewsPage />
                    </AdminReviewsContext.Provider>
                }/>
                <Route path="/deleteReviews" element={isLoggedIn&&
                    <AdminReviewsDeleteContext.Provider value={{reviews, setReviews, editLogin, setEditLogin, loading, submit, onSubmitDeleteReviews}}>
                        <AdminDeleteReviewsPage />
                    </AdminReviewsDeleteContext.Provider>
                }/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            <footer className="col-flex-center h-fit !py-[2%]">
                {isLoggedIn&&!modalActive&& <AdminNavList links={[
                    {to: "/classes", name: "Classes"},
                    {to: "/locations", name: "Locations"},
                    {to: "/content", name: "Content"},
                    {to: "/content/qualifications", name: "Qualifications"},
                    {to: "/reviews", name: "Reviews"},
                    {to: "/deleteReviews", name: "Delete Reviews"},
                ]}/>}
            </footer>
        </main>
    );
}

export default Admin;