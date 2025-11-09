import Dashboard from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}


export default App
