import {Route, Routes} from 'react-router-dom';
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
  const [datesConfigAll, setDatesConfigAll] = useState({
    general: DateConfig.general,
    header: DateConfig.header,
    footer: DateConfig.footer
  });

  useEffect( ()=>{
    const fetchDatesConfig = async () =>{
      try{
        console.log('Now attempting to download data');
        const response = await api.get('/get/all', {
          headers: {
            'Accept': 'application/json'
          }
        });      
        
        if(response.status != 200){
          throw new Error('Failed to fetch data, status code: ' + response.status)
        }
        
        const data = response.data; 
        console.log(data);
        setDatesConfigAll({
          general: data.general,
          header: data.header,
          footer: data.footer
        });
        console.log('Dates data recieved');
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
      <RefContext.Provider value={{setIsAdmin, isAdmin, topRef, aboutRef, contactRef, datesRef, appRef, scrollTo, setDatesConfigAll, datesConfigAll}}> 
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
