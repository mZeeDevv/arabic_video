import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Main from './Pages/Main'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import Forgot from './Pages/Forgot';
import Admin from './Pages/Admin';
import Private from './Components/Private'
import Report from './Pages/Report'
function App() {
  return (
    <>
    
     {/* <Router>
      <Header/>
      <Routes>
      <Route path='/profile' element={<Private/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      </Routes>
      </Router> */}

      <Router>
        <div className='lg:flex'>
        <Header/>
        <Routes>
        <Route path='/' element={<Private/>}> 
        <Route path="/" element={<Main />} />
        
        </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path='/profile' element={<Private/>}>
          <Route path="/profile" element={<Profile />}/>
          </Route>
          <Route path='/report' element={<Private/>}>
          <Route path="/report" element={<Report />}/>
          </Route>

        
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        </div>

      </Router>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  )
}

export default App
