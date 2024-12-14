import { createContext, useRef, React, useState, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { fetchGet } from './fetch';

// Components
import Header from './Components/Header';
import HomeHeader from './Components/HomeHeader';
import Footer from './Components/Footer';
import Content from './Components/Content'
import DateConfig from './ConfigFiles/DatesConfig.json';
import scrollTo from './Utilities/ScrollTo';
import Modal from './Components/Modal/Modal';
import ModalRowInputText from './Components/Modal/ModalRowInput';

// Pages
import NotFound from './Components/NotFound';
import Admin from './Components/Admin';
import LocationPage from './Components/LocationPage';
import SingleLocationPage from './Components/SingleLocationPage';
import ClassInfoPanel from './Components/ClassInfoPanel';

export const RefContext = createContext();

const defaultQualifications = [
  "300-Hour Advanced Yoga Teacher Training",
  "Your Yoga Flow",
  "Restorative Yoga Teacher Training",
  "Tianne Allan"
];

const defaultGeneralData = {
  orgName: "Simply Massage and Associates"
}

function App() {
  const location = useLocation();

  // Memoized values
  const defaultDatesConfig = useMemo(() =>(DateConfig), [DateConfig]); 

  const topRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();

  const datesRef = useRef();
  const appRef = useRef();

  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [datesConfigAll, setDatesConfigAll] = useState(defaultDatesConfig);

  const [qualifications, setQualifications] = useState(defaultQualifications);

  //Default values for the contentConfig are here just in case that
  const [contentConfig, setContentConfig] = useState(DateConfig.content);

  const [reviews, setReviews] = useState(null);

  const [generalData, setGeneralData] = useState(defaultGeneralData); 
  const [locations, setLocations] = useState(null);
  const [locationClasses, setLocationClasses] = useState(null);
  const [classes, setClasses] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedClass, setSelectedClass] = useState(JSON.parse(localStorage.getItem('selectedClass')));

  const [modalActive, setModalActive] = useState(false);

  useEffect(() =>{
    const path = location?.pathname;
    setShowHeaderFooter(!path.includes("selectedLocation") && !path.includes("testModal"));
  }, [location?.pathname]);

  //Fetch data everytime the page loads
  useEffect(()=>{
    const fetchAll = async() =>{
      let data = await fetchGet('content');
      setContentConfig(data);

      data = await fetchGet('general');
      setGeneralData(data);

      data = await fetchGet('reviews');
      setReviews(data);

      data = await fetchGet('qualifications');
      setQualifications(data);

      data = await fetchGet('locations');
      setLocations(data);

      data = await fetchGet('locationClass');
      setLocationClasses(data);

      data = await fetchGet('classes');
      setClasses(data);
    }

    fetchAll();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{reviews, setReviews, setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig, qualifications, setQualifications, setShowHeaderFooter, showHeaderFooter, locations, setLocations, selectedClass, setSelectedClass, selectedLocation, setSelectedLocation, generalData, locationClasses, modalActive, setModalActive, classes, setClasses }}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        {!isAdmin && showHeaderFooter ? 
        <Header /> : <HomeHeader/>}
        <Routes>
          <Route path='/' element={<Content />}/>
          <Route path='/location/*' element={<LocationPage />}/>
          <Route path='/location/selectedLocation/:index/*' element={<SingleLocationPage locations={locations} />}/>
          <Route path='/location/selectedLocation/:index/class/' element={<ClassInfoPanel />}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='/testModal/*' element={<Modal rows={
            <ModalRowInputText name="title" title="Class Title" placeholder="Restorative Yoga" />
          }/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
   {!isAdmin && showHeaderFooter && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
