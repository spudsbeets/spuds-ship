import '../App.css'
import { CatOrShip } from '../objects/catsandships'
import { useEffect } from 'react'
import UseShips from '../hooks/UseShips'
import { MarginsType, NumericalMarginsType } from '../objects/catsandships'

type PropsType = {
    playerShipName: string,
    playerShip: CatOrShip
}

const Grid = ({ playerShipName, playerShip }: PropsType) => {

  const { options, shipRightBorder, shipLeftBorder } = UseShips()

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

  function getScreenWidth(): number {
    return window.innerWidth
  }

  function getCatAmount(): number {
    if (getScreenWidth() < 1000) {
      return 275
    } else {
      return 320
    }
  }

  function getMarginsArr(): MarginsType {
    if (getScreenWidth() >= 1000) {
        return ["-115px", "10px", "140px", "265px", "390px"]
    } else if (getScreenWidth() < 1000 && getScreenWidth() >= 850) {
        return ["-85px", "15px", "110px", "210px", "300px"]
    } else {
        return ["-40px", "5px", "50px", "92px", "137px"]
    }
}

function getCatMarginsArrVert(): MarginsType {
    if (getScreenWidth() >= 1000) {
        return ["-240px", "-115px", "15px", "140px", "265px"]
    } else if (getScreenWidth() < 1000 && getScreenWidth() >= 850) {
        return ["-180px", "-80px", "15px", "115px", "205px"]
    } else {
        return ["-82px", "-37px", "8px", "50px", "95px"]
    }
}

function getCatMarginsHorArr(): number[] {
    if (getScreenWidth() >= 1000) {
        return [500, 300, 35000]
    } else if (getScreenWidth() < 1000 && getScreenWidth() >= 850) {
        return [400, 210, 20000]
    } else {
        return [220, 145, 20000]
    }
}

function collisionCheckDigits(): number[] {
  if (getScreenWidth() >= 1000) {
      return [5, 20]
  } else if (getScreenWidth() < 1000 && getScreenWidth() >= 850) {
      return [8, 26]
  } else {
      return [50, 10]
  }
}

function generateCatMarginsArrHor(): NumericalMarginsType {
    const arr = []
    let currentNum = getCatMarginsHorArr()[0]
    do {
      arr.push(currentNum)
      currentNum += getCatMarginsHorArr()[1]
    } while(currentNum < getCatMarginsHorArr()[2])
    return arr
}

const catMarginsArrHor: NumericalMarginsType = generateCatMarginsArrHor()

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
    } while(margArr.length < getCatAmount())
    const sortedMargArr: number[] = margArr.sort((a, b) => {return a - b})
    const toStringArr: MarginsType = sortedMargArr.toString().split(",").map(element => element + "px")
    return toStringArr
}

  function generateCatVertMargArr(arr: MarginsType) {
    const margArr: MarginsType = []
    do {
      const randomIndex = Math.floor(Math.random() * arr.length)
      margArr.push(arr[randomIndex])
    } while(margArr.length < getCatAmount())
    return margArr
  }

  const horArr = generateSortedCatHorMargArr(catMarginsArrHor)

  const vertArr = generateCatVertMargArr(getCatMarginsArrVert())

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
    } while(catArr.length < getCatAmount())
    const row2 = document.getElementById("row-2") as HTMLDivElement
    row2.innerHTML = `<div>` + catArr.map(function(cat) {
      return `<img src="` + cat.img + `" alt="` + cat.id + `" key={setOriginalKey()} class="cat-images"></img>`}
    ).join('') + `</div>`
    let index = 0
    do {
     (catArrElements[index] as HTMLImageElement).style.marginTop = vArr[index];
     (catArrElements[index] as HTMLImageElement).style.marginLeft = hArr[index];
     index += 1
    } while(index < getCatAmount())
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
      return winArr[Math.floor(Math.random()*winArr.length)]
    }
  }

  function checkForCollision(arr: HTMLImageElement[], shipArr: HTMLCollectionOf<Element>, shipRightBorder: number, shipLeftBorder: number) {
    const shipPositionTop = getShipLocation(shipArr, "top") as number
    const moonLeftBorder = document.getElementById("moon")?.getBoundingClientRect().left as number
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].getBoundingClientRect().top === shipPositionTop) {
        if (arr[i].getBoundingClientRect().left < (shipRightBorder - collisionCheckDigits()[0]) && arr[i].getBoundingClientRect().right > (shipLeftBorder + collisionCheckDigits()[1])) {
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
              case getMarginsArr()[1]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[0]
                break;
              case getMarginsArr()[2]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[1] 
                break;
              case getMarginsArr()[3]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[2]
                break;  
              case getMarginsArr()[4]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[3]
                break;                                   
            }
          }
        }
        if (event.key === "ArrowDown") {
          for (let i = 0; i < playerShipImageArr.length; i++) {
            switch ((playerShipImageArr[i] as HTMLImageElement).style.marginTop) {
              case getMarginsArr()[0]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[1]
                break;
              case getMarginsArr()[1]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[2]
                break;
              case getMarginsArr()[2]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[3]
                break;  
              case getMarginsArr()[3]:
                (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[4] 
                break;                                   
            }
          }
        }
      })
    },[])

    document.body.style.overflow = "hidden"

    return(
        <div id="gameplay">
        <header>
          <div id="left-side">
            <h1 id="game-title">Spud's Ship</h1>
            <h1 id="ship-title">{playerShipName}</h1>
            <button id="to-the-moon-button" className="button" onClick={() => {
              createShipImage(playerShip)
              setShip(playerShipImageArr, getMarginsArr())
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
                    case getMarginsArr()[1]:
                      (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[0]
                      break;
                    case getMarginsArr()[2]:
                      (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[1] 
                      break;
                    case getMarginsArr()[3]:
                      (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[2]
                      break;  
                    case getMarginsArr()[4]:
                      (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[3]
                      break;                                   
                  }
                }
              }}>&#9650;</button>
              <button id="down-button" className="direction-buttons" onClick={() => {
                for (let i = 0; i < playerShipImageArr.length; i++) {
                  switch ((playerShipImageArr[i] as HTMLImageElement).style.marginTop) {
                  case getMarginsArr()[0]:
                    (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[1]
                    break;
                  case getMarginsArr()[1]:
                    (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[2]
                    break;
                  case getMarginsArr()[2]:
                    (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[3]
                    break;  
                  case getMarginsArr()[3]:
                    (playerShipImageArr[i] as HTMLImageElement).style.marginTop = getMarginsArr()[4] 
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