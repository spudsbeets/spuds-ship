import './App.css'
import { useState } from 'react'
import { CatOrShip } from './objects/catsandships'
import Opener from './components/opener'
import ShipSelect from './components/shipSelect'

function App() {

  const [isStart, setIsStart] = useState<boolean>(false)
  const [playerShip, setPlayerShip] = useState<CatOrShip>({ img: '', id: '' })

  const pageContent = !isStart ? <Opener setIsStart={setIsStart}/> : <ShipSelect playerShip={playerShip} setPlayerShip={setPlayerShip} />

  return (
   <>
   {pageContent}
   </>
  )
}

export default App
