import { atom, RecoilState } from 'recoil'

import { Hamster } from '../models/Hamster'

const AtomHamster: RecoilState<Hamster[]> = atom({
  key: 'HamsterState', 
  default: [] as Hamster[] 
})

export default AtomHamster