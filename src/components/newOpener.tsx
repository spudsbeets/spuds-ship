import '../App.css'
import { useState, useEffect } from 'react'
import { CatOrShip } from '../objects/catsandships'
import Grid from './grid'
import UseShips from '../hooks/UseShips'

const NewOpener = () => {

    const { options } = UseShips()

    const [playerShip, setPlayerShip] = useState<CatOrShip>({ img: '', id: '' })
    const [playerShipName, setPlayerShipName] = useState<string>("Spud's Ship")
    const [startPage, setStartPage] = useState<boolean>(false)

    function generateImgButton(obj: CatOrShip) {
        return(
          <button className="ship-button" key={obj.id} id={obj.id + "-button"} onClick={() => {
              setPlayerShip(obj)
              }}>
              <img id={obj.id} src={obj.img} alt={obj.id} className="ship-images"></img>
          </button>
        )
     }

     function getWindowWidth(): number {
       return window.innerWidth
     }

     function getWindowHeight(): number {
        return window.innerHeight
     }

     function checkForLandscape(): boolean {
        if (getWindowWidth() < 500 || (getWindowWidth() < 800 && getWindowHeight() > 650)) {
            return true
        } else {
            return false
        }
     }

     function initialCheckForLandscape(): void {
        if (getWindowWidth() < 500) {
            alert('turn your device horizontal!')
        }
     }

    useEffect(() => {
        if (playerShip.id !== '') {
          let secondShip = document.getElementById("second-ship-button")
          let thirdShip = document.getElementById("third-ship-button")
          let firstShip = document.getElementById("first-ship-button")
          let shipSelectTitle = document.getElementById("ship-select-title")
          if (secondShip === null || thirdShip === null || firstShip === null || shipSelectTitle === null) {
            throw new Error("no ship!")
          } else {
            secondShip.remove()
            thirdShip.remove()
            firstShip.remove()
            shipSelectTitle?.remove()
          }
          const playerShipImg = document.createElement("img")
          playerShipImg.id = playerShip.id;
          playerShipImg.src = playerShip.img;
          playerShipImg.alt = playerShip.id;
          playerShipImg.className = "chosen-ship-images";
          (document.getElementById("sub-title") as HTMLHeadingElement).appendChild(playerShipImg);
          (document.getElementById(playerShipImg.id) as HTMLImageElement).style.animation = "none"
        }
    },[playerShip])

    const landscapeInterval = setInterval(() => initialCheckForLandscape())
    setInterval(() => landscapeInterval)
    setTimeout(() => { clearInterval(landscapeInterval) }, 5)

    const pageContent =
    !startPage
    ? 
    <div id="start-page">
    <div id="opener">
        <div id="title-elements">
        <h1 id="title"><i><b>Spud's Ship</b></i></h1>
        <h2 id="sub-title">a game by spud</h2>
        </div>
        <div id="ship-select">
        <h1 id="ship-select-title">Choose your ship</h1>
        <div id="ship-options">
        {options.map(element => element.value === 0 || element.value === 1 || element.value === 2 ? generateImgButton(element) : null)}
        </div>
        </div>
        <div id="ship-name-select">
        <h3 id="ship-name-header">Name your ship</h3>
        <input id="ship-name-textbox" placeholder="Spud's Ship" type="text" maxLength={30}></input>
        </div>
    </div>
    <button id="start-button" className="button" onClick={() => {
                if ((document.getElementById("ship-name-textbox") as HTMLInputElement).value === "") {
                    setPlayerShipName("Spud's Ship")
                } else {
                    setPlayerShipName((document.getElementById("ship-name-textbox") as HTMLInputElement).value);
                }
                if (playerShip.id === "") {
                    alert('choose yo ship!')
                } else if (checkForLandscape()) {
                    alert('turn your device horizontal!')
                } 
                else {
                    setStartPage(true)
                }
            }}>Start?</button>
    </div>
    : <Grid playerShip={playerShip} playerShipName={playerShipName} />

    return(
        pageContent
    )
}

export default NewOpener