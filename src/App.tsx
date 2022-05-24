import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Start from './components/Start'
import Galleri from './components/Galleri'
import Compete from './components/Compete'
import { useRecoilState } from 'recoil'
import { Hamster } from './models/Hamster'
import AtomHamster from './Atoms/AtomHamster'

function App() {

  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(AtomHamster)

    // useEffect(() => {
    //   fetch("https://hamsterwars-firebase.herokuapp.com/hamsters")
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         setHamsters(result)
    //       }
    //     )
    // }, [])

  return (
    <div className="App">
      <nav>
        <Link to="/"> Startsida </Link>
        <Link to="/compete"> Compete </Link>
        <Link to="/galleri"> Galleri </Link>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Start />}></Route>
          <Route path='/compete' element={<Compete />}></Route>
          <Route path='/galleri' element={<Galleri />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
