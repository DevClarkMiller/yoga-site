import {Route, Routes, HashRouter} from 'react-router-dom';
import { createContext, useRef, React, useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer';
import Content from './Content'
import NotFound from './NotFound';
import Admin from './Admin';
import DateConfig from './ConfigFiles/DatesConfig.json';
export const RefContext = createContext();

function App() {
 
  const topRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const datesRef = useRef();
  const appRef = useRef();

  const [isAdmin, setIsAdmin] = useState(false);
  const [datesHeader, setDatesHeader] = useState('');
  const [datesFooter, setDatesFooter] = useState('');

  useEffect(()=>{
    setDatesHeader(DateConfig[0]);
    setDatesFooter(DateConfig[1]);
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
          <Route path='/' element={<Content />}/>
          <Route path='/admin' element={<Admin setIsAdmin={setIsAdmin} datesHeader={datesHeader} setDatesHeader={setDatesHeader} datesFooter={datesFooter} setDatesFooter={setDatesFooter}/>}/> 
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {!isAdmin && <Footer />}
      </ RefContext.Provider>
    </div>
  );
}
export default App;
