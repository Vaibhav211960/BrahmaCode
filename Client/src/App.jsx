import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Features from './pages/Features'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from "./pages/ForgotPassword"
import OtpVerification from "./pages/OtpVerification"
import ResetPassword from "./pages/ResetPassword"
import CoachDashboard from './pages/CoachDashboard';
import AthleteDashboard from './pages/AthleteDashboard'
import YoloTestForm from './pages/YoloTestForm'
import RunningMockTest from './pages/RunningMockTest'
import LongJumpMockTest from './pages/LongJumpMockTest'
import JavelinMockTest from './pages/JavelinMockTest'
import RelayMockTest from './pages/RelayMockTest'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otp-verification' element={<OtpVerification />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Dashboard Routes */}
        <Route path='/coach-dashboard' element={<CoachDashboard />} />

        <Route path='/athlete-dashboard' element={<AthleteDashboard />} />
        <Route path='/YoloTestForm' element={<YoloTestForm/>}/>
        <Route path='/RunningMockTest' element={<RunningMockTest/>}/>
        <Route path='/LongJumpMockTest' element={<LongJumpMockTest/>}/>
        <Route path='/JavelinMockTest' element={<JavelinMockTest/>}/>
        <Route path='/RelayMockTest' element={<RelayMockTest/>}/>
      </Routes>
    </>
  )
}

export default App