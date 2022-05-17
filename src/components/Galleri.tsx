import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import AtomHamster from '../Atoms/AtomHamster'


const Galleri = () => {

    const hamsters = useRecoilValue<Hamster[]>(AtomHamster)
    
  
    function fixImgSrcPath(image: string) {
      if (image.startsWith('https')) {
        return image
      } else {
        return fixUrl(`/img/${image}`)
      }
    }
    return (
      <div >
            {hamsters.map((hamster) => (
              <img src={fixImgSrcPath(hamster.imgName)}  />
            ))}
        {/* <li key={hamsters.id} >
          <img
            src={fixImgSrcPath(hamsters.imgName)}
          />
          <section>
            <h3>{hamsters.name}</h3>
          </section>
            <div>
              <header>
                <h5>{hamsters.name}</h5>
              </header>
              <section>
                <p>
                  Jag är {hamsters.age} år gammal och min favorit mat är{' '}
                  {hamsters.favFood}.
                </p>
                <p>
                  I mitt liv har jag gått {hamsters.games} matcher, av dessa har
                  jag vunnit {hamsters.wins} och förlorat {hamsters.defeats} antal
                  matcher.
                </p>
              </section>
            </div>
        </li> */}
      </div>
    )
 }
 
 export default Galleri