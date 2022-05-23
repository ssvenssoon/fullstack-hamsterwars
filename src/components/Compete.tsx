import { useState, useEffect } from "react"
import hamster from "../hamsters/hamster-1.jpg"
import { useRecoilValue } from 'recoil'
import { Hamster } from '../models/Hamster'
import AtomHamster from '../Atoms/AtomHamster'
import { fixUrl } from '../utils'

const Compete = () => {

 // State variables 
  const [firstHamster, setFirstHamster] = useState('')
  const [secondHamster, setSecondHamster] = useState('')
  const [firstWinner, setFirstWinner] = useState([])
  const [secondWinner, setSecondWinner] = useState([])
  const [enableFirstWinner, setEnableFirstInfo] = useState<boolean>(false)
  const [enableSecondWinner, setEnableSecondInfo] = useState<boolean>(false)




 // onClick get first hamster info and firestore update
  const firstHamsterInfo = (e: any) => {

    // Add stats to winner
    if (typeof firstHamster !== 'undefined') {

        let newFirstHamster = {
          name: firstHamster.name,
          games: firstHamster.games + 1,
          wins: firstHamster.wins + 1,
          defeats: firstHamster.defeats
        }
      setFirstWinner(newFirstHamster)
      //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

      fetch(fixUrl(`/hamsters/${firstHamster?.id}`), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFirstHamster)
      })
    }

    // Add stats do loser
    if (typeof secondHamster !== 'undefined') {

      let newSecondHamster = {
        name: secondHamster.name,
        games: secondHamster.games + 1,
        wins: secondHamster.wins ,
        defeats: secondHamster.defeats + 1
      }
    setSecondWinner(newSecondHamster)
    //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

    fetch(fixUrl(`/hamsters/${secondHamster?.id}`), {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSecondHamster)
    })
   }
    setEnableFirstInfo(true)
  }





  // onClick get second hamster info and firestore update
  const secondHamsterInfo = (e: any) => {

    // Add stats to winner
    if (typeof secondHamster !== 'undefined') {

      let newSecondHamster = {
        name: secondHamster.name,
        games: secondHamster.games + 1,
        wins: secondHamster.wins + 1,
        defeats: secondHamster.defeats
      }
    setSecondWinner(newSecondHamster)
    //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

    fetch(fixUrl(`/hamsters/${secondHamster?.id}`), {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSecondHamster)
    })
   }

  // Add stats to loser 
   if (typeof firstHamster !== 'undefined') {

    let newFirstHamster = {
      name: firstHamster.name,
      games: firstHamster.games + 1,
      wins: firstHamster.wins,
      defeats: firstHamster.defeats + 1
    }
  setFirstWinner(newFirstHamster)
  //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

  fetch(fixUrl(`/hamsters/${firstHamster?.id}`), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFirstHamster)
  })
}
   setEnableSecondInfo(true)
  }





  // Close fist hamster info
  const closeFirstWinner = () => {
    setEnableFirstInfo(false)
  }

  // Close second hamster info
  const closeSecondWinner = () => {
    setEnableSecondInfo(false)
  }
  


  // Fetch both hamsters 
  const getBothHamsters = () => {

    setEnableFirstInfo(false)
    setEnableSecondInfo(false)

      fetch(fixUrl(`/hamsters/random`))
      .then((res) =>  res.json())
        .then(
          ( result) => {
            setFirstHamster(result)
          }
        )

      fetch(fixUrl(`/hamsters/random`))
        .then((res) => res.json())
        .then(
          (result) => {
            setSecondHamster(result)
          }
        )
  }

  function fixImgSrcPath(image: string) {
    return fixUrl(`/img/${image}`)
  }
    
    return (
      <div>
          <img style={{width: '100px', height: '100px'}} src={hamster} alt="" />
            <h1>Vote for cutest hamster</h1>
            <button onClick={getBothHamsters} style={{fontSize: '16px'}}>Fight!!</button>
            <div className="compete-area">
              <div onClick={firstHamsterInfo}  className="hamsters">
                <p >{firstHamster.name}</p>
                <img style={{width: '200px', height: '200px'}} src={fixImgSrcPath(firstHamster.imgName)} alt="" />
              </div>
              <div onClick={secondHamsterInfo} className="hamsters">
                <p>{secondHamster.name}</p>
                <img style={{width: '200px', height: '200px'}} src={fixImgSrcPath(secondHamster.imgName)} alt="" />
              </div>
            </div>


          <div className={enableFirstWinner ? 'first-winner' : 'closed-info-container'}>
            <button
              className='close-info'
              onClick={closeFirstWinner}
            >
              x
          </button>
              <h3>Vinnare!!!</h3>
              <h4>Du röstade på {firstWinner.name}!</h4>
              <h4>{firstWinner.name} har:</h4>
              <p className='info-text'>{firstWinner.games} matcher spelade</p>
              <p className='info-text'>{firstWinner.wins} matcher vunna </p>
              <p className='info-text'>{firstWinner.defeats} matcher förlorade</p>
          </div>
          <div className={enableSecondWinner ? 'second-winner' : 'closed-info-container'}>
            <button
              className='close-info'
              onClick={closeSecondWinner}
            >
              x
          </button>
              <h3>Vinnare!!!</h3>
              <h4>Du röstade på {secondWinner.name}!</h4>
              <h4>{secondWinner.name} har:</h4>
              <p className='info-text'>{secondWinner.games} matcher spelade</p>
              <p className='info-text'>{secondWinner.wins} matcher vunna </p>
              <p className='info-text'>{secondWinner.defeats} matcher förlorade</p>
          </div>
        </div>
    )
 }
 
 export default Compete