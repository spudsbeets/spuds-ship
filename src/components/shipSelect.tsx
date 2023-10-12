import { useState, useEffect } from 'react'
import '../App.css'
import UseShips from '../hooks/UseShips'
import ShipName from './shipName'
import type { CatOrShip } from '../objects/catsandships'

type PropsType = {
    playerShip: CatOrShip,
    setPlayerShip: React.Dispatch<React.SetStateAction<CatOrShip>>
}

const ShipSelect = ({ playerShip, setPlayerShip }: PropsType) => {

   const { options } = UseShips()

   const [playerShipName, setPlayerShipName] = useState<string>('')

   useEffect(() => {
    if (playerShip.id !== '') {
      let secondShip = document.getElementById("second-ship-button")
      let thirdShip = document.getElementById("third-ship-button")
      let firstShip = document.getElementById("first-ship-button")
      if (secondShip === null || thirdShip === null || firstShip === null) {
        throw new Error("no ship!")
      } else {
        secondShip.remove()
        thirdShip.remove()
        firstShip.remove()
      }
    }
  },[playerShip])

   function generateImgButton(obj: CatOrShip) {
      return(
        <button className="ship-button" key={obj.id} id={obj.id + "-button"} onClick={() => {
            setPlayerShip(obj)
            }}>
            <img id={obj.id} src={obj.img} alt={obj.id} className="ship-images"></img>
        </button>
      )
   }
  
   return(
     <div id="ship-select">
        <div id="ship-options">
        {options.map(element => element.value === 0 || element.value === 1 || element.value === 2 ? generateImgButton(element) : null)}
        {playerShip.img === '' ? null : <ShipName playerShipName={playerShipName} setPlayerShipName={setPlayerShipName} playerShip={playerShip} />}
        </div>
     </div>
   )
}

export default ShipSelect