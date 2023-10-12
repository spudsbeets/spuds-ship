import '../App.css'
import { CatOrShip } from '../objects/catsandships'
import { useEffect } from 'react'
import UseShips from '../hooks/UseShips'
import { MarginsType } from '../objects/catsandships'

type PropsType = {
    playerShipName: string,
    playerShip: CatOrShip
}

const Grid = ({ playerShipName, playerShip }: PropsType) => {

  const { options, shipMarginsArr, catVertMargArr, catHorMargArr, shipRightBorder, shipLeftBorder } = UseShips()

  const playerShipImageArr = document.getElementsByClassName("ship-images") as HTMLCollectionOf<Element>

  const catArrElements = document.getElementsByClassName("cat-images") as HTMLCollectionOf<Element>

  let collisionZone: HTMLImageElement[] = []

  function createShipImage(obj: CatOrShip): void {
    const ship = document.createElement('img')
    ship.setAttribute('id', obj.id)
    ship.setAttribute('src', obj.img)
    ship.setAttribute('alt', obj.id)
    ship.setAttribute('key', obj.id)
    ship.setAttribute('class', 'ship-images');
    (document.getElementById("row-1") as HTMLDivElement).appendChild(ship)
  }

  function generateSortedCatHorMargArr(arr: number[]): MarginsType {
    const margArr: number[] = []
    do {
      const randomIndex = Math.floor(Math.random() * arr.length)
      let candidate = arr[randomIndex]
      if (margArr.filter(x => x === candidate).length < 4) {
        margArr.push(candidate)
      } else {
        null
      }
    } while(margArr.length < 80)
    const sortedMargArr: number[] = margArr.sort((a, b) => {return a - b})
    const toStringArr: MarginsType = sortedMargArr.toString().split(",").map(element => element + "px")
    return toStringArr
}

  function generateCatVertMargArr(arr: MarginsType) {
    const margArr: MarginsType = []
    do {
      const randomIndex = Math.floor(Math.random() * arr.length)
      margArr.push(arr[randomIndex])
    } while(margArr.length < 80)
    return margArr
  }

  const horArr = generateSortedCatHorMargArr(catHorMargArr)

  const vertArr = generateCatVertMargArr(catVertMargArr)

  function setOriginalKey(): string {
    const date = new Date()
     return date.toISOString()
  }

  function generateCatImgs(obj: CatOrShip[], vArr: MarginsType, hArr: MarginsType): void {
    const possibleCats: CatOrShip[] = [obj[3], obj[4], obj[5], obj[6]]
    const catArr = []
    do {
      const randomIndex = Math.floor(Math.random() * 4)
      catArr.push(possibleCats[randomIndex])
    } while(catArr.length < 80)
    const row2 = document.getElementById("row-2") as HTMLDivElement
    row2.innerHTML = `<div>` + catArr.map(function(cat) {
      return `<img src="` + cat.img + `" alt="` + cat.id + `" key={setOriginalKey()} class="cat-images"></img>`}
    ).join('') + `</div>`
    let index = 0
    do {
     (catArrElements[index] as HTMLImageElement).style.marginTop = vArr[index];
     (catArrElements[index] as HTMLImageElement).style.marginLeft = hArr[index];
     index += 1
    } while(index < 80)
  }

  function setShip(arr: HTMLCollectionOf<Element>, arr2: string[]): void {
    for (let i = 0; i < arr.length; i++) {
      (arr[i] as HTMLImageElement).style.position = "absolute";
      (arr[i] as HTMLImageElement).style.marginTop = arr2[2];
    }
  }

  function moveShipHorizontally(): void {
    (document.getElementById("grid") as HTMLDivElement).style.animationName = "horizontalGridMove";
    (document.getElementById("grid") as HTMLDivElement).style.animationDuration = "100s";
    (document.getElementById("grid") as HTMLDivElement).style.animationTimingFunction = "linear";
    for (let i = 0; i < playerShipImageArr.length; i++) {
      (playerShipImageArr[i] as HTMLImageElement).style.animationName = "horizontalShipMove";
      (playerShipImageArr[i] as HTMLImageElement).style.animationDuration = "100s";     
      (playerShipImageArr[i] as HTMLImageElement).style.animationTimingFunction = "linear";  
    }
  }

  function getShipLocation(arr: HTMLCollectionOf<Element>) {
    for (let i = 0; i < arr.length; i++) {
        return arr[i].getBoundingClientRect().top
    }
  }

  function populateCollisionZone(arr: HTMLCollectionOf<Element>, arr2: HTMLImageElement[]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].getBoundingClientRect().left < 150 && arr[i].getBoundingClientRect().right > 0) {
        arr2.push(catArrElements[i] as HTMLImageElement)
      }
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j].getBoundingClientRect().right < 0) {
          arr2.splice(arr2.indexOf(arr2[j]), 1)
        }
      }     
    }
  }

  function checkForCollision(arr: HTMLImageElement[], shipArr: HTMLCollectionOf<Element>, shipRightBorder: number, shipLeftBorder: number) {
    const shipPositionTop = getShipLocation(shipArr)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].getBoundingClientRect().top === shipPositionTop) {
        if (arr[i].getBoundingClientRect().left < (shipRightBorder - 5) && arr[i].getBoundingClientRect().right > (shipLeftBorder + 20)) {
          clearInterval(collisionCheck)
          clearInterval(populateInterval)
          console.log('you lose bish')
          alert('you lose bish')
        }
      }
    }
  }

  const populateInterval = window.setInterval(() => populateCollisionZone(catArrElements, collisionZone), 600)

  const collisionCheck = window.setInterval(() => checkForCollision(collisionZone, playerShipImageArr, shipRightBorder, shipLeftBorder), 2)

    useEffect(() => {
      document.addEventListener('keydown', (event) => {
        if (event.key === "ArrowUp") { 
          for (let i = 0; i < playerShipImageArr.length; i++) {
            switch ((playerShipImageArr[i] as HTMLImageElement).style.marginTop) {
              case shipMarginsArr[1]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[0]
                break;
              case shipMarginsArr[2]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[1] 
                break;
              case shipMarginsArr[3]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[2]
                break;  
              case shipMarginsArr[4]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[3]
                break;                                   
            }
          }
        }
        if (event.key === "ArrowDown") {
          for (let i = 0; i < playerShipImageArr.length; i++) {
            switch ((playerShipImageArr[i] as HTMLImageElement).style.marginTop) {
              case shipMarginsArr[0]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[1]
                break;
              case shipMarginsArr[1]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[2]
                break;
              case shipMarginsArr[2]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[3]
                break;  
              case shipMarginsArr[3]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = shipMarginsArr[4] 
                break;                                   
            }
          }
        }
      })
    },[])

    return(
        <div id="gameplay">
        <header>
            <h1 id="game-title">Spud's Ship</h1>
            <h1 id="ship-title">{playerShipName}</h1>
            <button id="to-the-moon-button" onClick={() => {
              createShipImage(playerShip)
              setShip(playerShipImageArr, shipMarginsArr)
              moveShipHorizontally()
              generateCatImgs(options, vertArr, horArr)
              populateInterval
              collisionCheck
              document.getElementById("to-the-moon-button")?.remove()
              }}>To the moon?</button>
        </header>
        <div id="grid">
         <div id="row-1" className="row"></div>
         <div id="row-2" className="row"></div>
         <div id="row-3" className="row"></div>
         <div id="row-4" className="row"></div>
         <div id="row-5" className="row"></div>
         <div id="moon-div"><img id="moon" src='./src/images/seven.png' alt="moon" key="moon"></img></div>
        </div>
        </div>
    )
}

export default Grid