import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Hamster } from '../models/Hamster'
import AtomHamster from '../Atoms/AtomHamster'


const Start = () => {

    const hamsters = useRecoilValue<Hamster[]>(AtomHamster)
  
    return (
      <div>
          <ul>
            {hamsters.map((hamster) => (
              <li key={hamster.id}>{hamster.name}</li>
            ))}
          </ul>
      </div>
    )
}

export default Start