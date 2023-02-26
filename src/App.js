
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import GoogleForm from './components/GoogleForm';
import SimpleForm from './components/SimpleForm';

function App() {
  return (
    <>
    <Link to="/Google-form" className='me-4' >Google-form</Link>
    <Link to="/Simple-form" >Simple-form</Link>
    <Routes>
      <Route path='/Google-form' element={<GoogleForm></GoogleForm>}></Route>
      <Route path='/Simple-form' element={<SimpleForm></SimpleForm>}></Route>
    </Routes>
    </>

    
  );
}

export default App;
