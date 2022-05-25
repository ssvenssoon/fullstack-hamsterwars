import { useState, useEffect } from "react"
import { Hamster } from '../models/Hamster'
import { UpdatedHamster } from "../models/updatedHamster"
import { fixUrl } from '../utils'


const Compete = () => {

 // State variables 
  const [firstHamster, setFirstHamster] = useState<Hamster | null>(null)
  const [secondHamster, setSecondHamster] = useState<Hamster | null>(null)
  const [firstWinner, setFirstWinner] = useState<UpdatedHamster | null>(null)
  const [secondWinner, setSecondWinner] = useState<UpdatedHamster | null>(null)
  const [enableFirstWinner, setEnableFirstInfo] = useState<boolean>(false)
  const [enableSecondWinner, setEnableSecondInfo] = useState<boolean>(false)
  const [enableCompeteArea, setEnableCompeteArea] = useState<boolean>(false)

  
  useEffect(() => { 
    if (firstHamster || secondHamster) {      
      setEnableCompeteArea(false)
    } else {
      setEnableCompeteArea(true)
    }
  }, [])
  
  
  // onClick get first hamster info and firestore update
  const firstHamsterInfo = (e: any) => {

    setEnableFirstInfo(true)

    // Add stats to winner
    if (firstHamster) {

        let newFirstHamster: UpdatedHamster = {
          name: firstHamster.name,
          games: firstHamster.games + 1,
          wins: firstHamster.wins + 1,
          defeats: firstHamster.defeats,
          age: firstHamster.age,
          loves: firstHamster.loves,
          imgName: firstHamster.imgName,
          favFood: firstHamster.favFood
        }
        
      setFirstWinner(newFirstHamster)
      //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern
      console.log('First req');
      

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
    if (secondHamster) {

      let newSecondHamster: UpdatedHamster = {
          name: secondHamster.name,
          games: secondHamster.games + 1,
          wins: secondHamster.wins,
          defeats: secondHamster.defeats + 1,
          age: secondHamster.age,
          loves: secondHamster.loves,
          imgName: secondHamster.imgName,
          favFood: secondHamster.favFood
      }

    setSecondWinner(newSecondHamster)
    //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

    console.log('Second req');
    fetch(fixUrl(`/hamsters/${secondHamster?.id}`), {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSecondHamster)
    })
   }
  }





  // onClick get second hamster info and firestore update
  const secondHamsterInfo = (e: any) => {
    

    // Add stats to winner
    if (secondHamster) {

      let newSecondHamster: UpdatedHamster = {
        name: secondHamster.name,
        games: secondHamster.games + 1,
        wins: secondHamster.wins + 1,
        defeats: secondHamster.defeats,
        age: secondHamster.age,
        loves: secondHamster.loves,
        imgName: secondHamster.imgName,
        favFood: secondHamster.favFood
      }
    setSecondWinner(newSecondHamster)
    //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

    console.log('Third req');

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
  if (firstHamster) {

    let newFirstHamster: UpdatedHamster = {
        name: firstHamster.name,
        games: firstHamster.games + 1,
        wins: firstHamster.wins,
        defeats: firstHamster.defeats + 1,
        age: firstHamster.age,
        loves: firstHamster.loves,
        imgName: firstHamster.imgName,
        favFood: firstHamster.favFood
    }
  setFirstWinner(newFirstHamster)
  //uppdaterar den första hamstern innan jag uppdaterar firstore hamstern

  console.log('fourth req');

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

    setEnableCompeteArea(true)
    setEnableFirstInfo(false)
    setEnableSecondInfo(false)

    fetch(fixUrl(`/hamsters/random`))
    .then((res) =>  res.json())
    .then(
      (result) => {
          setFirstHamster(result)
          console.log(result);   
          }
        )

        fetch(fixUrl(`/hamsters/random`))
        .then((res) => res.json())
        .then(
          (result) => {
            setSecondHamster(result)
            console.log(result);
          }
        )
  }

  function fixImgSrcPath(image: string) {
    return fixUrl(`/img/${image}`)
  }
    
    return (
      <div>
            <div className={enableFirstWinner || enableSecondWinner ? 'not-clickable' : 'clickable'}>
              <h1>Vote for cutest hamster</h1>
              <button disabled={enableFirstWinner || enableSecondWinner} onClick={getBothHamsters} className='fight-button'>Fight!!</button>
              { firstHamster  && secondHamster && (
              <div className={enableCompeteArea ? 'compete-area' : 'closed-compete-area'}>
                <div onClick={firstHamsterInfo}  className="hamsters">
                  <p >{firstHamster.name}</p>
                  <img style={{width: '200px', height: '200px'}} src={fixImgSrcPath(firstHamster.imgName)} alt="" />
                </div>
                <div onClick={secondHamsterInfo} className="hamsters">
                  <p>{secondHamster.name}</p>
                  <img style={{width: '200px', height: '200px'}} src={fixImgSrcPath(secondHamster.imgName)} alt="" />
                </div>
              </div>
              )}
            </div>

          <div>
              { firstWinner && (
            <div className={enableFirstWinner ? 'first-winner' : 'closed-info-container'}>
              <button
                className='close-info'
                onClick={closeFirstWinner}
                >
                x
              </button>
              <h3 className="header">Vinnare!!!</h3>
              <h4 className="header">Du röstade på {firstWinner.name}!</h4>
              <p className="info-text">Jag är {firstWinner.age} år gammal</p>
              <p className="info-text">och jag gillar att {firstWinner.loves}</p>
              <h4 className="header">Mina stats:</h4>
              <p className='info-text'>{firstWinner.games} matcher spelade</p>
              <p className='info-text'>{firstWinner.wins} matcher vunna </p>
              <p className='info-text'>{firstWinner.defeats} matcher förlorade</p>
            </div>
              )}
          </div>
          <div>
            { secondWinner && (
            <div className={enableSecondWinner ? 'second-winner' : 'closed-info-container'}>
              <button
                className='close-info'
                onClick={closeSecondWinner}
              >
                x
              </button>
              <h3 className="header">Vinnare!!!</h3>
              <h4 className="header">Du röstade på {secondWinner.name}!</h4>
              <p className="info-text">Jag är {secondWinner.age} år gammal</p>
              <p className="info-text">och jag gillar att {secondWinner.loves}</p>
              <h4 className="header">Mina stats:</h4>
              <p className='info-text'>{secondWinner.games} matcher spelade</p>
              <p className='info-text'>{secondWinner.wins} matcher vunna </p>
              <p className='info-text'>{secondWinner.defeats} matcher förlorade</p>
            </div>
            )}
          </div>
        </div>
    )
 }
 
 export default Compete