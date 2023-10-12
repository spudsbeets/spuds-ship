import { useContext } from 'react'
import ShipContext from '../objects/catsandships'
import { UseShipContextType } from '../objects/catsandships'

const UseShips = (): UseShipContextType => {
   return useContext(ShipContext)
}

export default UseShips