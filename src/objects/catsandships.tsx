import { createContext, ReactElement } from "react"

export type CatOrShip = {
    img: string,
    id: string,
    value?: number,
}

export type CatsAndShips = CatOrShip[]

const playerOptions: CatsAndShips = [
    {
        img: './src/images/zero.png',
        id: 'first-ship',
        value: 0,
    },
    
    {
        img: './src/images/one.png',
        id: 'second-ship',
        value: 1,
    },
    
    {
        img: './src/images/two.png',
        id: 'third-ship',
        value: 2,
    },
    
    {
        img: './src/images/three.png',
        id: 'gunther-head',
        value: 3
    },
    
    {
        img: './src/images/four.png',
        id: 'pharoah-head',
        value: 4
    },
    
    {
        img: './src/images/five.png',
        id: 'gunther-body',
        value: 5
    },
    
    {
        img: './src/images/six.png',
        id: 'pharoah-body',
        value: 6
    },
    
    {
        img: './src/images/seven.png',
        id: 'moon',
    }
]

export type MarginsType = string[]

type NumericalMarginsType = number[]

const shipRightBorder: number = 108

const shipLeftBorder: number = 8

const marginsArr: MarginsType = ["-115px", "10px", "140px", "265px", "390px"]

const catMarginsArrVert: MarginsType = ["-240px", "-115px", "15px", "140px", "265px"]

function generateCatMarginsArrHor(): NumericalMarginsType {
    const arr = []
    let currentNum = 500
    do {
      arr.push(currentNum)
      currentNum += 300
    } while(currentNum < 35000)
    return arr
}

const catMarginsArrHor: NumericalMarginsType = generateCatMarginsArrHor()

export type UseShipContextType = { options: CatsAndShips, shipMarginsArr: MarginsType, catVertMargArr: MarginsType, catHorMargArr: NumericalMarginsType, shipRightBorder: number, shipLeftBorder: number }

const initContext: UseShipContextType = { options: [], shipMarginsArr: [], catVertMargArr: [], catHorMargArr: [], shipRightBorder: 0, shipLeftBorder: 0 }

const ShipContext = createContext<UseShipContextType>(initContext)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ShipProvider = ({ children }: ChildrenType): ReactElement => {

    return(
     <ShipContext.Provider value={{ options: playerOptions, shipMarginsArr: marginsArr, catVertMargArr: catMarginsArrVert, catHorMargArr: catMarginsArrHor, shipRightBorder: shipRightBorder, shipLeftBorder: shipLeftBorder }}>
       {children}
     </ShipContext.Provider>
    )
}

export default ShipContext