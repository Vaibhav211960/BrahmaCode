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
<<<<<<< HEAD
import CoachRecipientPage from './pages/CoachRecipientPage'
import YoloTestPerformance from './pages/YoloTestPerformance'
=======
import Athletes from './pages/Athletes'

import toast, { Toaster } from 'react-hot-toast';
>>>>>>> 496a3b4ff67538108f04b49f0cb42155cec32e77

function App() {

  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otp-verification' element={<OtpVerification />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/coach-dashboard' element={<CoachDashboard />} />
        <Route path='/athlete-dashboard' element={<AthleteDashboard />} />
        <Route path='/YoloTestForm' element={<YoloTestForm/>}/>
        <Route path='/RunningMockTest' element={<RunningMockTest/>}/>
        <Route path='/LongJumpMockTest' element={<LongJumpMockTest/>}/>
        <Route path='/JavelinMockTest' element={<JavelinMockTest/>}/>
        <Route path='/RelayMockTest' element={<RelayMockTest/>}/>
<<<<<<< HEAD
        <Route path='/CoachRecipientPage' element={<CoachRecipientPage/>}/>
        <Route path='/YoloTestPerformance' elsement={<YoloTestPerformance/>}/>
=======
        <Route path='/athletes' element={<Athletes/>}/>
>>>>>>> 496a3b4ff67538108f04b49f0cb42155cec32e77
      </Routes>
    </>
  )
}

export default App