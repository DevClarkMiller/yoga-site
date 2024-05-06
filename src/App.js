import {Route, Routes} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer';
import Content from './Content'
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Content />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
