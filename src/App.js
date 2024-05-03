import {Route, Routes} from 'react-router-dom';
import Header from './Header'
import Content from './Content'
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Content />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
