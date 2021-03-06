import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Start from './components/Start'
import Galleri from './components/Galleri'
import Compete from './components/Compete'
import Data from '../src/components/data.json'
import { useRecoilState } from 'recoil'
import { Hamster } from './models/Hamster'
import AtomHamster from './Atoms/AtomHamster'
import { fixUrl } from './utils'


function App() {
  
  const [hamsters, setHamsters] = useRecoilState(AtomHamster)
  const [error, setError] = useState<any>(null)
  const [haveStarted, setHaveStarted] = useState<boolean>(false)
  const [haveBeenAdded, setHaveBeenAdded] = useState<boolean>(false)

  const getData: () => Promise<void> = async () => {
    console.log('App.tsx');
    fetch(fixUrl(`/hamsters`))
      .then((res) => res.json())
      .then(
        (result) => {
          setError(null)
          setHamsters(result)
        },
        (error) => {
          setError(error)
        }
      )
    setHaveStarted(true)
    setHaveBeenAdded(false)
  }
  

  useEffect(() => {
    getData()
  }, [haveStarted])

  useEffect(() => {
    getData()
  }, [haveBeenAdded])

  return (
    <div className="App">
      <nav>
        <Link className='nav-link' to="/"> Startsida </Link>
        <Link className='nav-link' to="/compete"> Tävla </Link>
        <Link className='nav-link' to="/galleri"> Galleri </Link>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Start error={error}/>} ></Route>
          <Route path='/compete' element={<Compete />}></Route>
          <Route path='/galleri' element={<Galleri setHaveBeenAdded={setHaveBeenAdded} />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
