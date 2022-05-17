import { useState } from "react"
import hamster from "../hamsters/hamster-1.jpg"

const Compete = () => {
  

    return (
        <div>
          <img style={{width: '100px', height: '100px'}} src={hamster} alt="" />
            <h1>Compete</h1>
            {/* <button onClick={fetchData}>
              Show hamsters
            </button>
            {
              showHamster.map((showHamster: hamster) => ( 
                <ol key = { showHamster.name } >
                    Name: { showHamster.name },
                    Loves: { showHamster.loves }
                </ol>
              ))
            }
            <div>Mitt namn är: {showHamster.name}</div>
            <div>Jag gillar att: {showHamster.loves}</div> */}
      </div>
    )
 }
 
 export default Compete