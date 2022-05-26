import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import AtomHamster from '../Atoms/AtomHamster'

interface TemporaryObject {
  name: string;
  age: string;
  loves: string;
  imgName: string;
  favFood: string;
  games: string;
  wins: string;
  defeats: string;
}

const Start = () => {
  const [hamsters, setHamsters] = useRecoilState(AtomHamster)
  const [bestHamster, setBestHamster] = useState<TemporaryObject | null>(null)
  const [haveStarted, setHaveStarted] = useState<boolean>(false)
  
  const getLeadingHamster = () => {
    let score: any[] = []
    
        hamsters.forEach((item) => {
          const sum = Number(item.wins) - Number(item.defeats)
          return score.push({ ...item, sum: sum })
      })

      let heighestValue = Math.max.apply(
        Math,
        score.map((o) => o.sum)
        )
      //Get best hamster
      let bestHamsters = score.filter((i) => i.sum === heighestValue)

      const best = bestHamsters.filter((i) => delete i.sum)

      const randomHamster = best[Math.floor((Math.random()*best.length))]
      
      if(typeof randomHamster !== 'undefined') {
        console.log(randomHamster);
        
        setBestHamster(randomHamster)
        setHaveStarted(true)
      }
    }

    const closeLeadingHamster = () => {
      setHaveStarted(false)
    }
    
    
      function fixImgSrcPath(image: string) {
        if(image !== undefined) {
          if (image.startsWith('https')) {
            return image
          } else {
            return fixUrl(`/img/${image}`)
          }
        }
      }

  
    return (
      <div>
        <div className='start-container'>
          <h2>Tjena och välkommen till hamsterwars!</h2>
          <p className='website-explanation'>Detta är en hemsida där du kan rösta på den sötaste hamstern.
            För att göra det klickar du dig in på "Compete" uppe i menyn.
            När du gjort det klickar du på "fight" knappen för att få upp
            en match mellan två slumpmässiga hamstrar. Klicka sedan på den hamstern du vill rösta på.
            Där kan du då se en info/stats ruta om just den hamstern du röstat på.
            Klicka sedan på "Next fight!"
            för att få upp två nya slumpmässiga hamstrar. 
          </p>
          <p className='website-explanation'>
            Du kan även gå till vårat Galleri där du kan se alla hamstrar. Där kan du även klicka
            på en av hamstrarna för att få upp den specifika hamsterns info/stats.
            Du kan också ta bort den hamstern (permanent) genom att klicka på "delete me".
            Till sist kan du även längst ner på galleri sidan lägga till din helt egna hamster.
          </p>
          <p className='website-explanation'>
            Under här ser du den hamster som just nu vunnit flest matcher men som också förlorat minst.
            MEN är det så att fler än en hamster ligger på första plats så slumpmässas dessa hamstrar.
          </p>
        </div>
        { haveStarted 
           ? <button onClick={closeLeadingHamster} className='front-page-btn'>Close leading hamster</button>
           : <button onClick={getLeadingHamster} className='front-page-btn'>Load leading hamster</button>
        }
        <div className='hamster-container'>
          {bestHamster && haveStarted &&
          <div className='hamster-front-page'>
            <h3>GRATTIS till {bestHamster.name} som just nu <br /> ligger på första plats! 🏆</h3>
            <p>Jag är {bestHamster.age} år gammal <br />
              gillar att äta {bestHamster.favFood} och <br /> 
              min favoritaktivitet <br /> är att {bestHamster.loves}. <br />
              Jag har varit med i {bestHamster.games} match/matcher <br />
              och vunnit {bestHamster.wins} och förlorat {bestHamster.defeats} av dom.
            </p>
            <img style={{width: '200px', height: '200px', borderRadius: '20px'}} src={fixImgSrcPath(bestHamster.imgName)} alt="Hamster image" />
          </div>
          }
        </div>
      </div>
    )
}

export default Start