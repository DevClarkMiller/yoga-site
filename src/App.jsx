import { createContext, useRef, React, useState, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { fetchGet } from './fetch';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content'
import DateConfig from './ConfigFiles/DatesConfig.json';
import scrollTo from './Utilities/ScrollTo';

// Pages
import NotFound from './Components/NotFound';
import Admin from './Components/Admin';
import LocationPage from './Components/LocationPage';
import SingleLocationPage from './Components/SingleLocationPage';
import ClassInformation from './Components/ClassInformation';

export const RefContext = createContext();

const defaultQualifications = [
  "300-Hour Advanced Yoga Teacher Training",
  "Your Yoga Flow",
  "Restorative Yoga Teacher Training",
  "Tianne Allan"
];

const defaultGeneralData = [{
  orgName: "Simply Massage and Associates"
}]

const defaultLocations = [{
  title: "RESTORATIVE YOGA",
  subtitle: "Rest and Relax",
  description: "Guided breath awareness, meditation and Restorative poses with the support of props.",
  location: "168 Curtis St. Entrance is on Catharine St.",
  fee: 10
}];

const defLocations = [{
  address: "168 Curtis St. Entrance is on Catharine St.",
  lat: 42.779607216517796,
  long: -81.19156646080363, 
  classes: [{
    title: "RESTORATIVE YOGA",
    subtitle: "Rest and Relax",
    description: "Guided breath awareness, meditation and Restorative poses with the support of props.",
    fee: 10,
    dateTimes: [{
      weekDays: "Thursday",
      month: "September",
      days: "6, 13, 20, 27",
      times: "7-8pm"
    }]
  }]
}];

function App() {
  const location = useLocation();

  // Memoized values
  const defaultDatesConfig = useMemo(() =>({
    general: DateConfig.general,
    header: DateConfig.header,
    footer: DateConfig.footer
  }), [DateConfig]);
  
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
  const [locations, setLocations] = useState(defLocations);

  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() =>{
    const path = location?.pathname;
    setShowHeaderFooter(!path.includes("selectedLocation"));
  }, [location?.pathname]);

  //Fetch data everytime the page loads
  useEffect(()=>{
    const fetchAll = async () =>{
      const data = await fetchGet('all');
      setDatesConfigAll({
        general: data?.general,
        header: data?.header,
        footer: data?.footer
      });
  
      if (data) setContentConfig(data.content);
    }

    const fetchReviews = async () =>{
      const data = await fetchGet('reviews');
      setReviews(data);
    }

    const fetchQualifications = async () =>{
      const data = await fetchGet('qualifications');
      setQualifications(data);
    }

    fetchQualifications();
    fetchAll();
    fetchReviews();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{reviews, setReviews, setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig, qualifications, setQualifications, setShowHeaderFooter, showHeaderFooter, locations, setLocations, selectedClass, setSelectedClass }}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        {!isAdmin && showHeaderFooter && <Header />}
        <Routes>
          <Route path='/' element={<Content />}/>
          <Route path='/location/*' element={<LocationPage />}/>
          <Route path='/location/selectedLocation/:index' element={<SingleLocationPage locations={locations} />}/>
          <Route path='/location/selectedLocation/:index/class/:name' element={<ClassInformation />}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {!isAdmin && showHeaderFooter && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
