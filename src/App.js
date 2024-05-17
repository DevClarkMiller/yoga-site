import {Route, Routes, HashRouter} from 'react-router-dom';
import { createContext, useRef, React, useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer';
import Content from './Content'
import NotFound from './NotFound';
import Admin from './Admin';
import DateConfig from './ConfigFiles/DatesConfig.json';
import api from './ConfigFiles/api'
export const RefContext = createContext();

function App() {
  const topRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();

  const datesRef = useRef();
  const appRef = useRef();

  const [isAdmin, setIsAdmin] = useState(false);
  const [datesHeader, setDatesHeader] = useState(DateConfig[0]);
  const [datesFooter, setDatesFooter] = useState(DateConfig[1]);

  useEffect( ()=>{
    const fetchDatesConfig = async () =>{
      try{
        const response = await api.get('/get/all');        
        setDatesHeader(response.data[0]);
        setDatesFooter(response.data[1]);
        console.log('Dates data recieved');
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`);
        }
        //console.log(err);
        alert("connection to the back-end server couldn't be secured, please try-again");
      }
    }
    fetchDatesConfig();
  }, []);

  //Scrolls you to a given element, make sure to give 'ref.current'
  const scrollTo = (ref) => {    //Takes in a refsCurrent
    const comp = ref.current;
    if(!comp) return;   //Returns if the component hasn't been referenced yet
    
    const yCoord = comp.offsetTop;

    const scrollOptions = {
        behavior: 'smooth',
        block: 'start'
    };

    window.scrollTo({ top: yCoord, ...scrollOptions });
}

  return (
    <div className="App" ref={appRef}>
      <RefContext.Provider value={{topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, datesHeader, datesFooter}}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        {!isAdmin && <Header />}
        <Routes>
          <Route path='/' element={<Content setIsAdmin={setIsAdmin} />}/>
          <Route path='/admin' element={<Admin setIsAdmin={setIsAdmin} datesHeader={datesHeader} setDatesHeader={setDatesHeader} datesFooter={datesFooter} setDatesFooter={setDatesFooter}/>}/> 
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {!isAdmin && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
