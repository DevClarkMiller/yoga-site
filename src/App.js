import {Route, Routes} from 'react-router-dom';
import { createContext, useRef, React } from 'react';
import Header from './Header'
import Footer from './Footer';
import Content from './Content'
import NotFound from './NotFound';
export const RefContext = createContext();
function App() {
 
  const topRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const datesRef = useRef();

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
    <div className="App" >
      <RefContext.Provider value={{topRef, aboutRef, contactRef, datesRef, scrollTo}}> 
      <div ref={topRef}></div>{/*Only exists so that I have a ref for the topRef */}
        <Header />
        <Routes>
          <Route path='/' element={<Content />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <Footer />
      </ RefContext.Provider>
    </div>
  );
}
export default App;
