// import './App.css'
// import Signup from './auth/signup'
// import Login from './auth/Login'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/signup" element={<Signup/>} />  
//           <Route path="/signin" element={<Login/>} />
//         </Routes>
//       </BrowserRouter>
//       {/* <Signup /> */}


//     </>
//   )
// }

// export default App
import './App.css'
import Signup from './pages/signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
