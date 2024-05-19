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
export const RefContext = createContext();

function App() {
  const fetchGetAll = async () =>{
    try{
        const response = await api.get('/get/all', {headers: {
            'Accept': 'application/json'
        }});

        checkResponseStatus(response);

        const allData = response.data;

        setDatesConfigAll({
          general: allData.general,
          header: allData.header,
          footer: allData.footer
        });
    
        if(allData){
          setContentConfig(allData.content);
        }

    }catch(err){
        outputErrors(err);
    }
  } 

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

  //Fetch data everytime the page loads
  useEffect(()=>{
    fetchGetAll();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig}}> 
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
