import '../App.css'
import { CatOrShip } from '../objects/catsandships'
import Grid from './grid'

type PropsType = {
   playerShipName: string,
   setPlayerShipName: React.Dispatch<React.SetStateAction<string>>
   playerShip: CatOrShip,
}

const ShipName = ({ playerShipName, setPlayerShipName, playerShip }: PropsType) => {

    function generateImg(obj: CatOrShip) {
     return(
        <img id={obj.id} src={obj.img} alt={obj.id} className="ship-images"></img>
     )
    }

    const pageContent = 
    playerShipName === ''
    ?
        <div id="ship-name-select">
        <div id="player-ship">{generateImg(playerShip)}</div>
        <input id="ship-name-textbox" placeholder="Spud's Ship" type="text" maxLength={30}></input>
        <button id="enter-grid-button" onClick={() => {
            let shipName: string = (document.getElementById("ship-name-textbox") as HTMLInputElement).value
            if (shipName === '') {
                alert("name yo ship!")
            } else {
                setPlayerShipName(shipName)
            }
        }}>ready to rumble?</button>
        </div>    
    : <Grid playerShip={playerShip} playerShipName={playerShipName} />

    return(
        pageContent
    )

}

export default ShipName