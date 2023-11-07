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
    } while(margArr.length < 320)
    const sortedMargArr: number[] = margArr.sort((a, b) => {return a - b})
    const toStringArr: MarginsType = sortedMargArr.toString().split(",").map(element => element + "px")
    return toStringArr
}

  function generateCatVertMargArr(arr: MarginsType) {
    const margArr: MarginsType = []
    do {
      const randomIndex = Math.floor(Math.random() * arr.length)
      margArr.push(arr[randomIndex])
    } while(margArr.length < 320)
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
    } while(catArr.length < 320)
    const row2 = document.getElementById("row-2") as HTMLDivElement
    row2.innerHTML = `<div>` + catArr.map(function(cat) {
      return `<img src="` + cat.img + `" alt="` + cat.id + `" key={setOriginalKey()} class="cat-images"></img>`}
    ).join('') + `</div>`
    let index = 0
    do {
     (catArrElements[index] as HTMLImageElement).style.marginTop = vArr[index];
     (catArrElements[index] as HTMLImageElement).style.marginLeft = hArr[index];
     index += 1
    } while(index < 320)
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
    (document.getElementById("grid") as HTMLDivElement).style.animationDelay = "1s";
    for (let i = 0; i < playerShipImageArr.length; i++) {
      (playerShipImageArr[i] as HTMLImageElement).style.animationName = "horizontalShipMove";
      (playerShipImageArr[i] as HTMLImageElement).style.animationDuration = "100s";     
      (playerShipImageArr[i] as HTMLImageElement).style.animationTimingFunction = "linear"; 
      (playerShipImageArr[i] as HTMLImageElement).style.animationDelay = "1s"; 
    }
  }

  function getShipLocation(arr: HTMLCollectionOf<Element>, value: string) {
    for (let i = 0; i < arr.length; i++) {
        if (value === "top") {
          return arr[i].getBoundingClientRect().top
        }
        if (value === "right") {
          return arr[i].getBoundingClientRect().right
        }
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

  function generateRandomizedMargin(): string {
    let randomMarg = Math.random() * (150 - 110) + 110
    return randomMarg.toString() + "px"
  }

  function generateRandomizedSaying(val: string): string {
    const loseArr = ['that was a lot of cats', 'the moon sure is far away', 'the stars devour us all in time', 'meowch', "well would you look at that, spud's spinning through space again", 'gravity shmavity', 'where do we go from here capn spud?']
    const winArr = ['it is made of cheese!', 'lets hope my 300 cat clones are okay!', 'MOOOOOOOON', 'how did all those cat clones get out here in the first place', 'martians are real and they are funny lil guys', 'mars next?']
    if (val === "loss") {
      return loseArr[Math.floor(Math.random()*loseArr.length)]
    } else {
      return winArr[Math.floor(Math.random()*loseArr.length)]
    }
  }

  function checkForCollision(arr: HTMLImageElement[], shipArr: HTMLCollectionOf<Element>, shipRightBorder: number, shipLeftBorder: number) {
    const shipPositionTop = getShipLocation(shipArr, "top") as number
    const moonLeftBorder = document.getElementById("moon")?.getBoundingClientRect().left as number
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].getBoundingClientRect().top === shipPositionTop) {
        if (arr[i].getBoundingClientRect().left < (shipRightBorder - 5) && arr[i].getBoundingClientRect().right > (shipLeftBorder + 20)) {
          clearInterval(collisionCheck)
          clearInterval(populateInterval)
          const explosion1 = document.createElement('img')
          explosion1.setAttribute('alt', "explosion-1")
          explosion1.setAttribute('src', './src/images/explosion.png')
          explosion1.setAttribute('key', setOriginalKey())
          explosion1.setAttribute('class', 'explosion-images')
          explosion1.style.marginBottom = shipPositionTop.toString() + "px"
          explosion1.style.marginLeft = generateRandomizedMargin();
          (document.getElementById("row-1") as HTMLDivElement).appendChild(explosion1);
          const loserDiv = document.createElement('div')
          loserDiv.setAttribute('class', 'endgame-divs');
          (document.getElementById("center-side") as HTMLDivElement).appendChild(loserDiv); 
          const playAgainButton = document.createElement('button')
          playAgainButton.setAttribute('class', 'button')
          playAgainButton.setAttribute('id', 'play-again-button');
          playAgainButton.textContent = 'Play again?';
          playAgainButton.onclick = function() {window.location.reload()};
          const loserHeader = document.createElement('h2')
          loserHeader.setAttribute('class', 'endgame-headers');
          loserHeader.innerHTML = "You lose..." 
          const loserPhrase = document.createElement('p')
          loserPhrase.setAttribute('class', 'endgame-phrases')
          loserPhrase.innerHTML = generateRandomizedSaying("loss")      
          loserDiv.appendChild(playAgainButton)
          loserDiv.appendChild(loserPhrase)
          loserDiv.appendChild(loserHeader); 
          (document.getElementById("grid") as HTMLDivElement).style.animationName = "null";
          (document.getElementById("ship-title"))?.remove()
          for (let j = 0; j < shipArr.length; j++) {
            (playerShipImageArr[j] as HTMLImageElement).remove()         
          }
          for (let j = 0; j < arr.length; j++) {
            (arr[j] as HTMLImageElement).remove()
          }
        }
      }
    }
    if (moonLeftBorder < shipRightBorder) {
      clearInterval(collisionCheck)
      clearInterval(populateInterval)
          const winnerDiv = document.createElement('div')
          winnerDiv.setAttribute('class', 'endgame-divs');
          (document.getElementById("center-side") as HTMLDivElement).appendChild(winnerDiv); 
          const playAgainButton = document.createElement('button')
          playAgainButton.setAttribute('class', 'button')
          playAgainButton.setAttribute('id', 'play-again-button');
          playAgainButton.textContent = 'Play again?';
          playAgainButton.onclick = function() {window.location.reload()};
          const winnerHeader = document.createElement('h2')
          winnerHeader.setAttribute('class', 'endgame-headers');
          winnerHeader.innerHTML = "You win!" 
          const winnerPhrase = document.createElement('p')
          winnerPhrase.setAttribute('class', 'endgame-phrases')
          winnerPhrase.innerHTML = generateRandomizedSaying("win")      
          winnerDiv.appendChild(playAgainButton)
          winnerDiv.appendChild(winnerPhrase)
          winnerDiv.appendChild(winnerHeader); 
          (document.getElementById("grid") as HTMLDivElement).style.animationName = "null";
          (document.getElementById("ship-title"))?.remove()
          for (let j = 0; j < shipArr.length; j++) {
            (playerShipImageArr[j] as HTMLImageElement).remove()         
          }
          for (let j = 0; j < arr.length; j++) {
            (arr[j] as HTMLImageElement).remove()
          }
    }
  }

  const populateInterval = window.setInterval(() => populateCollisionZone(catArrElements, collisionZone), 150)

  const collisionCheck = window.setInterval(() => checkForCollision(collisionZone, playerShipImageArr, shipRightBorder, shipLeftBorder), 1)

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
          <div id="left-side">
            <h1 id="game-title">Spud's Ship</h1>
            <h1 id="ship-title">{playerShipName}</h1>
            <button id="to-the-moon-button" className="button" onClick={() => {
              createShipImage(playerShip)
              setShip(playerShipImageArr, shipMarginsArr)
              moveShipHorizontally()
              generateCatImgs(options, vertArr, horArr)
              populateInterval
              collisionCheck
              document.getElementById("to-the-moon-button")?.remove()
              document.getElementById("instruction-div")?.remove()
              }}>To the moon?</button>
            </div>  
            <div id="center-side">
              <div id="instruction-div">
              <p id="instructions">use these OR your up & down arrow keys to move your ship</p>
              <p id="instruction-arrow">&#9654;</p>
              </div>
            </div>
            <div id="right-side">
              <button id="up-button" className="direction-buttons" onClick={() => {
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
              }}>&#9650;</button>
              <button id="down-button" className="direction-buttons" onClick={() => {
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
              }}>&#9660;</button>
            </div>
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