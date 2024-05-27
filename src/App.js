import {Route, Routes} from 'react-router-dom';
import { createContext, useRef, React, useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer';
import Content from './Content'
import NotFound from './NotFound';
import Admin from './Admin';
import DateConfig from './ConfigFiles/DatesConfig.json';
import api from './ConfigFiles/api'
import scrollTo from './ScrollTo';
import outputErrors from './outputErrors';
import checkResponseStatus from './checkResponseStatus';
import fetchGet from './fetchGet';
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

  //Default values for the contentConfig are here just in case that
  const [contentConfig, setContentConfig] = useState(DateConfig.content);

  const [reviews, setReviews] = useState(null);

  //Fetch data everytime the page loads
  useEffect(()=>{
    const fetchAll = async () =>{
      const data = await fetchGet('all');
      setDatesConfigAll({
        general: data.general,
        header: data.header,
        footer: data.footer
      });
  
      if(data){
        setContentConfig(data.content);
      }
    }

    const fetchReviews = async () =>{
      const data = await fetchGet('reviews');
      console.log(data);
      setReviews(data);
    }
    
    fetchAll();
    fetchReviews();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{reviews, setReviews, setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig }}> 
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
