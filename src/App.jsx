import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'
// import signup from './components/signup/signup'


function App() {

  return (
    <>  
    <Routes>
 
   <Route path='/' element={<Home/>}/>

    </Routes>
       
    </>
  )
}

export default App
