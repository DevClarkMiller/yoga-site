import {Route, Routes} from 'react-router-dom';
import { createContext, useRef, React, useState, useEffect } from 'react';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content'
import DateConfig from './ConfigFiles/DatesConfig.json';
import scrollTo from './Utilities/ScrollTo';

// Pages
import NotFound from './Components/NotFound';
import Admin from './Components/Admin';

import { fetchGet } from './fetch';
export const RefContext = createContext();

function App() {
  const topRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();

  const datesRef = useRef();
  const appRef = useRef();

  const [isAdmin, setIsAdmin] = useState(false);
  const [datesConfigAll, setDatesConfigAll] = useState({
    general: DateConfig.general,
    header: DateConfig.header,
    footer: DateConfig.footer
  });

  const [qualifications, setQualifications] = useState([
    "300-Hour Advanced Yoga Teacher Training",
    "Your Yoga Flow",
    "Restorative Yoga Teacher Training",
    "Tianne Allan"
  ]);

  //Default values for the contentConfig are here just in case that
  const [contentConfig, setContentConfig] = useState(DateConfig.content);

  const [reviews, setReviews] = useState(null);

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
      <RefContext.Provider value={{reviews, setReviews, setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig, qualifications, setQualifications }}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        {!isAdmin && <Header />}
        <Routes>
          <Route path='/' element={<Content />}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {!isAdmin && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
