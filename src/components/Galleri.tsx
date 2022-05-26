import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import AtomHamster from '../Atoms/AtomHamster'

interface InfoObject {
  hamsterName: string;
  hamsterAge: string;
  hamsterLoves: string;
  hamsterWins: string;
  hamsterDefeats: string;
  hamsterId: string;
}


const Galleri = () => {
  const [name, setName] = useState<string>('')
  const [food, setFood] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [games, setGames] = useState<string>('')
  const [wins, setWins] = useState<string>('')
  const [defeats, setDefeats] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [enableInfo, setEnableInfo] = useState<boolean>(false)
  const [info, setInfo] = useState<InfoObject | null>(null)
  const [hamsters, setHamsters] = useRecoilState(AtomHamster)
  

    const openInfo = () => {
      setEnableInfo(true)
    }

    const closeInfo = () => {
      setEnableInfo(false)
    }


    let addedHamster = {
      name: name,
      favFood: food,
      loves: loves,
      age: Number(age),
      games: Number(games),
      wins: Number(wins),
      defeats: Number(defeats),
      imgName: imgName,
    }

    function urlIsImg(url: string) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
    }
    
    const isNameValid = addedHamster.name.length > 1
    const isFoodValid = addedHamster.favFood !== ''
    const isLovesValid = addedHamster.loves !== ''
    const isAgeValid = addedHamster.age >= 0 && age !== ''
    const isGamesValid = addedHamster.games >= 0 && games !== ''
    const isWinsValid = addedHamster.wins >= 0 && wins !== ''
    const isDefeatsValid = addedHamster.defeats >= 0 && defeats !== ''
    const isImgNameValid = urlIsImg(addedHamster.imgName) && imgName.startsWith('http')
    const formIsValid =
    isNameValid &&
    isFoodValid &&
    isLovesValid &&
    isAgeValid &&
    isGamesValid &&
    isWinsValid &&
    isDefeatsValid &&
    isImgNameValid
    
    
  
    function fixImgSrcPath(image: string) {
      if (image.startsWith('https')) {
        return image
      } else {
        return fixUrl(`/img/${image}`)
      }
    }

    function submitHandler() {
      console.log('startar')
      fetch(fixUrl('/hamsters'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addedHamster)
      })
    }
    
    const handleClick = (name: any, age: any, loves: any, wins: any, defeats: any, id: any) => {
      
      let hamsterInfo: InfoObject = {
        hamsterName: name,
        hamsterAge: age,
        hamsterLoves: loves,
        hamsterWins: wins,
        hamsterDefeats: defeats,
        hamsterId: id,
      }
      setInfo(hamsterInfo)
      
      console.log(hamsterInfo);
      
      console.log(name, age, loves, wins, defeats);
    }
    
    const deleteHamster = (id: any) => {
      fetch(fixUrl(`/hamsters/${id}`), {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      setEnableInfo(false)
    }
    
    return (
      <div >
        { info && (
        <div className={enableInfo ? 'info-container' : 'closed-info-container'}>
          <button
           className='close-info'
           onClick={closeInfo}
           >
             x
          </button>
          <p className='info-text'>Hej! Jag heter {info.hamsterName}.</p>
          <p className='info-text'>Jag är {info.hamsterAge} år gammal</p>
          <p className='info-text'>Jag gillar att {info.hamsterLoves}</p>
          <p className='info-text'>Jag har vunnit {info.hamsterWins} gånger</p>
          <p className='info-text'>Jag har förlorat {info.hamsterDefeats} gånger</p>
          <button
            className='close-info'
            onClick={() => deleteHamster(info.hamsterId)}
            >
               Delete me
          </button>
        </div>
        )}
        <div className='hamster-container' onClick={openInfo}>
          {hamsters ? (
            hamsters.map((hamster) => (
              <li
                className='hamster-list-items'
                id={hamster.id}
                onClick={() => 
                  handleClick(hamster.name, hamster.age, hamster.loves, hamster.wins, hamster.defeats, hamster.id)} 
                  key={hamster.name}>
                <h3 className='hamster-name'>{hamster.name}</h3>
                <img className='hamsters-img' src={fixImgSrcPath(hamster.imgName)}  />
              </li>
            ))
            ) : (
              <div>Vänligen vänta tills hamstrarna har hämtats</div>
            )}
        </div>
        <h2 className='add-hamster-header'>Add new hamster</h2>
        <div className='form-container'>
          <form className='form-input-grid'>  
            <label>   
              <h5>Namn</h5>
                {!isNameValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i ett namn
                  </p>
                ) : null}
              <input
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex Kurt"
                required
              />
            </label> 
            <label>
              <h5>Favoritmat</h5>
                {!isFoodValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i favoritmat
                  </p>
                ) : null}
              <input
                name="food"
                type="text"
                value={food}
                onChange={(event) => setFood(event.target.value)}
                placeholder="Ex pizza"
                required
              />
            </label>  
            <label>
              <h5>Favoritaktivitet</h5>
                {!isLovesValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i aktivitet
                  </p>
                ) : null}
              <input
                name="loves"
                type="text"
                value={loves}
                onChange={(event) => setLoves(event.target.value)}
                placeholder="Hoppa etc.."
                required
              />
            </label>  
            <label>
              <h5>Ålder</h5>
                {!isAgeValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i ålder
                  </p>
                ) : null} 
              <input
                name="age"
                type="text"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Ex 4"
                required
              />
            </label> 
            <label> 
              <h5>Antal matcher</h5>
                {!isGamesValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i matcher
                  </p>
                ) : null} 
              <input
                name="games"
                type="text"
                value={games}
                onChange={(event) => setGames(event.target.value)}
                placeholder="Ex 5"
                required
              />
            </label>  
            <label>
              <h5>Antal vinster</h5>
                {!isWinsValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i vinster
                  </p>
                ) : null} 
              <input
                name="wins"
                type="text"
                value={wins}
                onChange={(event) => setWins(event.target.value)}
                placeholder="Ex 7"
                required
              />
            </label>
            <label>
              <h5>Antal förluster</h5>
                {!isDefeatsValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i förluster
                  </p>
                ) : null} 
              <input
                name="defeats"
                type="text"
                value={defeats}
                onChange={(event) => setDefeats(event.target.value)}
                placeholder="Ex 4"
                required
              />
            </label>
            <label>
              <h5>Fyll i en bildlänk</h5>
                {!isImgNameValid ? (
                  <p className="form-validation-err">
                    Vänligen fyll i bildlänk
                  </p>
                ) : null} 
              <input
                name="imgName"
                type="text"
                value={imgName}
                onChange={(event) => setImgName(event.target.value)}
                placeholder="https://www.abcdef.com/hamster-27.png..."
                required
              />
            </label>  
          </form>
        </div>
          <button
            className='add-button'
            disabled={!formIsValid}
            onClick={submitHandler}
            type='submit'
          >
            Lägg till hamster
          </button>
      </div>
    )
 }
 
 export default Galleri