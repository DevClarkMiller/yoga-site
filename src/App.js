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

  const fetchDatesConfig = async () =>{
    try{
      const response = await api.get('/get/all', {
        headers: {
          'Accept': 'application/json'
        }
      });  

      if(response.status !== 200){
        throw new Error('Failed to fetch data');
      }
      
      const data = response.data; 
      setDatesConfigAll({
        general: data.general,
        header: data.header,
        footer: data.footer
      });

      setContentConfig(data.content);
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }else{
        console.log(`Error: ${err.message}`);
      }
    }
  }

  //Fetch data everytime the page loads
  useEffect( ()=>{
    fetchDatesConfig();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll, contentConfig, setContentConfig}}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        {!isAdmin && <Header />}
        <Routes>
          <Route path='/' element={<Content setIsAdmin={setIsAdmin} />}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {!isAdmin && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
